// Load Environment Variables
require('dotenv').config();

const express = require( "express" );
const session = require( "express-session" );
const bodyParser = require( "body-parser" );
const createError = require( "http-errors" );
const logger = require('morgan');

const passport = require( "./server/passport-setup" );
const router = require( "./server/routes" );

const app = express();

app.set( "views", __dirname + "/dist" );
app.use( express.static(__dirname + "/dist") );

app.use( bodyParser.json() );
app.use( logger( "dev", {
	skip: function (req, res) { return res.statusCode < 400 }
} ) );
app.use( express.json() );

app.use( passport.initialize() );
app.use( passport.session() );

app.use( session({ secret: "OAuth Session",
	saveUninitialized: true,
	resave: true
}) );

app.use( "/", router );

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});
  
// error handler
app.use(function(err, req, res, next) {
	res.status(err.status || 500);

	if( !err.expose ) {
		console.error(`[${new Date().toISOString()}]` + err.message);
		return res.json({ 
			message: 'Internal server error.'  
		});
	}

	res.json(err)
});

app.listen( process.env.PORT || 5000, function () {
	console.log( "Node.js app listening on port 5000!" );
} );
