import SensesRepository, { SenseInfo } from '@/data-access/SensesRepository';
import TechnicalProblem from '@/data-access/TechnicalProblem';

export default class FetchSensesRepository implements SensesRepository {
	public async getSensesWithoutItems( languageCode: string, languageQid: string ): Promise<SenseInfo[]> {
		const params: { [ key: string ]: string } = {
			lang: languageCode,
			qid: languageQid,
		};
		const url = new URL( '/senses', window.location.origin );

		for ( const key in params ) {
			url.searchParams.set( key, params[ key ] );
		}

		let response: Response;
		let data: SenseInfo[];

		try {
			response = await fetch( url.toString() );
		} catch ( e ) {
			throw new TechnicalProblem( 'Network error' );
		}

		try {
			data = await response.json();
			return data;
		} catch ( e ) {
			throw new TechnicalProblem( 'Error Decoding JSON' );
		}

	}
}
