import SearchEntityRepository, { SearchResult } from '@/data-access/SearchEntityRepository';
import TechnicalProblem from '@/data-access/TechnicalProblem';

export default class FetchSearchEntityRepository implements SearchEntityRepository {
	private readonly forLanguageCode: string;
	private readonly endpoint: string;

	public constructor( languageCode: string, endpoint: string ) {
		this.forLanguageCode = languageCode;
		this.endpoint = endpoint;
	}

	private async searchEntities(
		searchString: string,
		entityType: string,
		limit?: number,
		offset?: number,
		langCode?: string,
	): Promise<SearchResult[]> {
		if ( !searchString ) {
			throw new Error( 'The parameter searchString must not be empty!' );
		}
		const params: { [ key: string ]: string } = {
			action: 'wbsearchentities',
			search: searchString,
			language: this.forLanguageCode,
			uselang: this.forLanguageCode,
			type: entityType,
			format: 'json',
			formatversion: '2',
			errorformat: 'plaintext',
			origin: '*',
		};
		if ( limit ) {
			params.limit = `${limit}`;
		}
		if ( offset ) {
			params.continue = `${offset}`;
		}
		if ( langCode ) {
			params.language = langCode;
			params.uselang = langCode;
			params.strictlanguage = '1';
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

		return data.search;
	}

	public searchItemValues(
		searchString: string, limit?: number, offset?: number, langCode?: string,
	): Promise<SearchResult[]> {
		return this.searchEntities( searchString, 'item', limit, offset, langCode );
	}
}
