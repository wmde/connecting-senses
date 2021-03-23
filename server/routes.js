const express = require("express");
const passport = require("passport");
const router = express.Router();

// Serve Vue,js Application
router.get( "/", function ( req, res ) {
	res.render( "index", {
		user: req && req.session && req.session.user,
		url: req.baseUrl
	} );
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

router.get( "/currentUser", function ( req, res ) {
	const user  = req && req.session && req.session.user;
	if (!user) {
		return res.status(401).send(false);
	}

	return res.status(200).send( JSON.stringify( req.session.user ) );
});

module.exports = router;