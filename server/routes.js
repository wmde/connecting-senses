const express = require( "express" );
const passport = require( "passport" );
const createError = require( "http-errors" );
const { PrismaClient } = require( "@prisma/client" );
const { SensesRepository, StatementsRepository, EntityConnectionRepository } = require( "./data-access" );
const WDQSClient = require( "./wdqs-client" );
const MWApiClient = require("./mw-api-client");

// TODO: Clean this up by moving to service container and a decisions repository
const prisma = new PrismaClient();
const router = express.Router();
const senses = new SensesRepository( new WDQSClient( process.env.WDQS_ENDPOINT ) );


// Serve Vue.js Application
router.get( "/", function ( req, res ) {
	res.render( "index" );
} );


// User Authentication
router.get( "/auth/mediawiki/callback", function( req, res, next ) {
	passport.authenticate( "mediawiki", function( err, user ) {
		if ( err ) {
			return next( err );
		}

		if ( !user ) {
			return res.redirect( req.baseUrl + "/login" );
		}

		req.logIn( user, function( err ) {
			if ( err ) {
				return next( err );
			}
			req.session.user = user;
			res.redirect( req.baseUrl + "/" );
		} );
	} )( req, res, next );
} );

router.get( "/login", function ( req, res ) {
	res.redirect( req.baseUrl + "/auth/mediawiki/callback" );
} );

router.post( "/logout" , function ( req, res ) {
	delete req.session.user;
	res.redirect( req.baseUrl + "/" );
} );

router.get( "/currentUser", function ( req, res, next ) {
	const user  = req && req.session && req.session.user;
	if (!user) {
		return next( createError( 401 ) );
	}

	return res.status(200).send( JSON.stringify( req.session.user ) );
});

// Decision tracking
router.post( "/decision", async ( req, res, next ) => {
	// TODO: Validation!!!
	const { senseId, decision } = req.body;
	try {
		const result = await prisma.decisionRecord.create( {
			data: { senseId, decision }
		} );

		res.json( result );
	} catch (e) {
		return next( createError( 500, e ) )
	}

} );

// Senses
router.get( "/senses", async ( req, res, next ) => {
	// TODO: Validation!!!
	const {
		lang: langCode,
		qid: langQid
	} = req.query;

	try {
		const result = await senses.get( langCode, langQid );

		res.json( result );
	} catch (e) {
		if ( e.response ) {
			return next( createError( 424, e ) )
		}

		if ( e.request ) {
			return next( createError( 503, e ) )
		}

		return next( createError( 500, e ) )
	}
} );

router.post( '/entity-connection', async ( req, res, next ) => {
	// TODO: Validation!!!
	const { senseId, itemId } = req.body;
	const user = req && req.session && req.session.user;

	// TODO: Clean this up by moving to service container and middleware
	const statements = new StatementsRepository( new MWApiClient(
		process.env.MW_API_URL,
		{ assertuser: user }
	) );
	const entityConnections = new EntityConnectionRepository( statements );
	const connectingPID = process.env.ITEM_CONNECTION_PID;

	try {
		const result = await entityConnections.create( senseId, itemId, connectingPID );

		res.send( result );
	} catch ( e ) {
		if ( e.response ) {
			return next( createError( 424, e ) )
		}

		if ( e.request ) {
			return next( createError( 503, e ) )
		}

		return next( createError( 500, e ) )
	}
} );

module.exports = router;
