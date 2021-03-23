import ReadingClaimsRepository, { Claim } from '@/data-access/ReadingClaimsRepository';
import TechnicalProblem from '@/data-access/TechnicalProblem';

export default class FetchReadingClaimsRepository implements ReadingClaimsRepository{
	private readonly forLanguageCode: string;
	private readonly endpoint: string;

	public constructor( languageCode: string, endpoint: string ) {
		this.forLanguageCode = languageCode;
		this.endpoint = endpoint;
	}

	async getClaims( entityID: string, propertyId: string ): Promise<Record<string, Claim[]>> {
		const params: Record<string, string> = {
			action: 'wbgetclaims',
			entity: entityID,
			uselang: this.forLanguageCode,
			format: 'json',
			formatversion: '2',
			errorformat: 'plaintext',
			origin: '*',
		};
		if (propertyId) {
			params.property = propertyId;
		}

		const url = new URL( this.endpoint );
		for ( const key in params ) {
			url.searchParams.set( key, params[ key ] );
		}
		let response: Response;
		try {
			response = await fetch( url.toString() );
		} catch ( e ) {
			throw new TechnicalProblem( 'Network error' );
		}

		if ( !response.ok ) {
			throw new TechnicalProblem( `${response.status}: ${response.statusText}` );
		}

		const data = await response.json();

		return data.claims;
	}

}
