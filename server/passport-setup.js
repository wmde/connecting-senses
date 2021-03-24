const passport = require( "passport" );
const MediaWikiStrategy = require( "passport-mediawiki-oauth" ).OAuthStrategy;

passport.use(
	new MediaWikiStrategy({
		consumerKey: process.env.OAUTH_KEY,
		consumerSecret: process.env.OAUTH_SECRET,
		baseURL: 'https://www.wikidata.org/'
	},
	function ( token, tokenSecret, profile, done ) {
		profile.oauth = {
			consumer_key: process.env.OAUTH_KEY,
			consumer_secret: process.env.OAUTH_SECRET,
			token: token,
			token_secret: tokenSecret
		};
		return done( null, profile );
	}
	) );

passport.serializeUser(	function ( user, done ) {
	done( null, user );
});

passport.deserializeUser( function ( obj, done ) {
	done( null, obj );
});

module.exports = passport;