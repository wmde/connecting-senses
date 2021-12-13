const axios = require("axios");

module.exports = class WDQSClient {

    constructor( endpoint, format = "json" ){
        if ( !endpoint ) {
            throw new Error('Cannot create a Wikidata Query Service client: missing endpoint paramater');
        }
        this.endpoint = endpoint;
        this.format = format;
        this.httpClient = axios.create({
            baseURL: this.endpoint,
            params: { format }
        })
    }

    async submit( sparql ){
        // TODO: maybe check that query is less than 4kb and use POST otherwise

        // Error handling is delegated to the caller.
        // This function will raise all excpetions that axios may raise.
        // See: https://www.npmjs.com/package/axios#handling-errors
        const response = await this.httpClient.get('/', {
            params: {
                query: sparql
            }
        });

        return response.data.results.bindings;
    }
}
