const axios = require("axios");
const { response } = require("express");
const url = require("url");
const createError = require( "http-errors" );


function validatePayload( payload ){
    if( payload.warnings || payload.errors ){
        throw createError( 424, 'Mediawiki request failed', payload );
    }

    return payload;
}

module.exports = class MWApiClient {

    constructor( endpoint, params){
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
        
        this.httpClient = axios.create({
            baseURL: this.endpoint,
            params: this.defaultParams
        });
    }

    async get( action, params, config ){
        // Error handling is delegated to the caller. 
        // This function will raise all exceptions that axios may raise. 
        // See: https://www.npmjs.com/package/axios#handling-errors
        const response = await this.httpClient.get('', {
            params: {
                action,
                ...params
            },
            ...config
        });

        return validatePayload( response.data );
    }

    async post( action, params, config ){
        const body = new url.URLSearchParams({
            action,
            ...params
        });
        
        // Error handling is delegated to the caller. 
        // This function will raise all exceptions that axios may raise. 
        // See: https://www.npmjs.com/package/axios#handling-errors
        const response = await this.httpClient.post('', body.toString(), config);

        return validatePayload( response.data );
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