// Load Environment Variables
require('dotenv').config();

const express = require( "express" );
const session = require( "express-session" );
const bodyParser = require('body-parser')

const passport = require( "./server/passport-setup" );
const router = require( "./server/routes" );

const app = express();

app.set( "views", __dirname + "/dist" );
app.use( express.static(__dirname + "/dist") );

app.use( bodyParser.json() );

app.use( passport.initialize() );
app.use( passport.session() );

app.use( session({ secret: "OAuth Session",
	saveUninitialized: true,
	resave: true
}) );

app.use( "/", router );

app.listen( process.env.PORT || 5000, function () {
	console.log( "Node.js app listening on port 5000!" );
} );
