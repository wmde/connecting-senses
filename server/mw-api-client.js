const URL = require("url");
const createError = require( "http-errors" );
const OAuth = require("oauth");

function validatePayload( payload ){
    if( payload.warnings || payload.errors ){
        throw createError( 424, 'Mediawiki request failed', payload );
    }

    return payload;
}

function signedRequest( url, session, params, options ) {
    var oauth = new OAuth.OAuth(
        // URL to request a token
        'https://www.wikidata.org/index.php?title=Special:OAuth/initiate',
        // URL to get access token
        'https://www.wikidata.org/index.php??title=Special:OAuth/token',
        session.consumer_key,
        session.consumer_secret,
        '1.0',
        null,
        'HMAC-SHA1'
    );

    return new Promise( function ( resolve, reject ) {
        var handler = function ( err, data ) {
            if ( err ) {
                reject( JSON.stringify( err ) );
            } else {
                resolve( JSON.parse( data ) );
            }
        };

        if ( options && options.method === 'POST' ) {
            oauth.post(
                url,
                session.token,
                session.token_secret,
                params,
                'application/json',
                handler
            );
        } else {
            url += '?' + new URL.URLSearchParams( params );
            oauth.get(
                url,
                session.token,
                session.token_secret,
                handler );
        }
    } );
}

module.exports = class MWApiClient {

    constructor( endpoint, params = {}, oauth = null ){
        if ( !endpoint ) {
            throw new Error('Cannot create a MediaWiki API client: missing endpoint paramater');
        }
        this.endpoint = endpoint;
        this.defaultParams = {
            format: "json",
            errorformat: "plaintext",
            uselang: "en",
            formatversion: 2,
            ...params
        };

        this.token = oauth ? {
            key: oauth.token,
            secret: oauth.token_secret
        } : null;
    }

    async get( action, params, config ){
        const payload = {
            action,
            ...this.defaultParams,
            ...params
        };

        const data = await signedRequest(
            this.endpoint,
            {
                consumer_key: process.env.OAUTH_KEY,
                consumer_secret: process.env.OAUTH_SECRET,
                token: this.token.key,
                token_secret: this.token.secret,
            },
            payload,
        );

        return validatePayload( data );
    }

    async post( action, params, config ){
        const payload = {
            action,
            ...this.defaultParams,
            ...params
        };

        const data = await signedRequest(
            this.endpoint,
            {
                consumer_key: process.env.OAUTH_KEY,
                consumer_secret: process.env.OAUTH_SECRET,
                token: this.token.key,
                token_secret: this.token.secret,
            },
            payload,
            { method: 'POST' },
        );

        return validatePayload( data );
    }

    async tokens( type = "csrf" ){
        // Error handling is delegated to the caller.
        // This function will raise all exceptions that axios may raise.
        // See: https://www.npmjs.com/package/axios#handling-errors
        const data = await this.get("query", {
            meta: "tokens",
            type
        }, { withCredentials: true });

        return data.query.tokens;
    }
}
