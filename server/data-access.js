const { v4 } = require('uuid');
const queries = require('./sparql-queries');

class SensesRepository {
    constructor( queryService ) {
        if ( !queryService ) {
            throw new Error('Cannot create a sesnses repository: missing queryService paramater');
        }
        this.queryService = queryService;
    }

    async get( languageCode, languageQID ) {
        // Error handling is delegated to the caller. 
        // This function will raise all excpetions that axios may raise. 
        // See: https://www.npmjs.com/package/axios#handling-errors
        const results = await this.queryService.submit(
            queries.itemlessSenses( languageCode, languageQID )
        )

        return results.map( ( result ) => {
            const senseUri = result.senseId.value;
            const senseId = senseUri.match( /L\d+-S\d+/ );
            
            if ( !senseId ) {
                throw new Error( 'Unknown format for sense URI: ' + senseUri );
            }

            return {
                gloss: result.gloss.value,
                lemma: result.lemma.value,
                senseId: senseId[ 0 ],
            };
        } );
    }
}

class StatementsRepository {
    constructor( mwApi ) {
        if ( !mwApi ) {
            throw new Error('Cannot create a claims repository: missing mwApi paramater');
        }
        this.mwApi = mwApi;
    }

    async create( entityId, snak ) {
        const claim = {
            id: entityId + '$' + v4(),
            type: "statement",
            mainsnak: snak
        }

        const tokens = await this.mwApi.tokens();

        // Error handling is delegated to the caller. 
        // This function will raise all excpetions that axios may raise. 
        // See: https://www.npmjs.com/package/axios#handling-errors
        return await this.mwApi.post('wbsetclaim', {
            claim: JSON.stringify(claim),
            ignoreduplicatemainsnak: '1',
            tags: 'Connecting-Senses',
            token: tokens.csrftoken
        }, { withCredentials: true } );
    }
}

module.exports = {
    SensesRepository,
    StatementsRepository
}
