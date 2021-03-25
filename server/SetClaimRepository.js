const { v4 } = require( 'uuid' );
const axios = require( "axios" );

class SetClaimRepository {

	constructor( endpoint ) {
		this.endpoint = endpoint;
	}

	async getToken() {
		const params = {
			action: 'query',
			meta: 'tokens',
			format: 'json',
			formatversion: '2',
			errorformat: 'plaintext',
		};
		const url = new URL( this.endpoint );
		for ( const key in params ) {
			url.searchParams.set( key, params[ key ] );
		}
		let response;
		try {
			response = await axios.get( this.endpoint, {
				params,
				withCredentials: true,
			} );
		} catch ( e ) {
			console.log(e);
			throw e;
		}

		const data = response.data;
		return data.query.tokens.csrftoken;
	}

	async setClaim( user, itemId, senseId ) {
		const token = await this.getToken();

		const itemForThisSensePid = 'P5137';
		const claim = {
			type: 'statement',
			mainsnak: {
				snaktype: 'value',
				property: itemForThisSensePid,
				datavalue: {
					type: 'wikibase-entityid',
					value: {
						id: itemId,
					},
				},
				id: senseId + '$' + v4(),
				rank: 'normal',
			},
		};
		const params = {
			action: 'wbsetclaim',
			claim,
			ignoreduplicatemainsnak: '1',
			assertuser: user,
			format: 'json',
			formatversion: '2',
			errorformat: 'plaintext',
			uselang: 'en',
			tags: 'Connecting-Senses',
			token,
		};

		let response;
		try {
			response = await axios.post( this.endpoint, params, { withCredentials: true } );
		} catch ( e ) {
			console.error(e);
			throw e;
		}

		console.log( 'Class: FetchClaimWritingRepository, Function: setClaim, Line 83 response(): '
			, response );
	}
}

module.exports = SetClaimRepository;
