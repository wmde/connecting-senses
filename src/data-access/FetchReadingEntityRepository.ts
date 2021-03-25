import ReadingEntityRepository from '@/data-access/ReadingEntityRepository';
import TechnicalProblem from '@/data-access/TechnicalProblem';
import { Item } from '@/store/items';

export default class FetchReadingEntityRepository implements ReadingEntityRepository {
	private readonly endpoint: string;

	public constructor( endpoint: string ) {
		this.endpoint = endpoint;
	}

	public async getFingerPrintableEntities( ids: string[], langCode: string ): Promise<Record<string, Item>> {
		const params: { [ key: string ]: string } = {
			action: 'wbgetentities',
			ids: ids.join( '|' ),
			props: 'labels|descriptions|aliases',
			languages: langCode,
			uselang: langCode,
			format: 'json',
			formatversion: '2',
			errorformat: 'plaintext',
			origin: '*',
		};
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
		return data.entities;
	}
}
