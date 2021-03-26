import ClaimWritingRepository from '@/data-access/ClaimWritingRepository';
import TechnicalProblem from './TechnicalProblem';

export default class FetchClaimWritingRepository implements ClaimWritingRepository {
	private readonly endpoint: string;

	public constructor( endpoint: string ) {
		this.endpoint = endpoint;
	}

	public async setClaim( itemId: string, senseId: string ): Promise<void> {
		let response: Response;

		try {
			response = await fetch( '/entity-connection', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify( {
					senseId, itemId,
				} ),
			} );
		} catch ( e ) {
			throw new TechnicalProblem( 'Network error' );
		}

		if ( !response.ok ) {
			throw new TechnicalProblem( `${response.status}: ${response.statusText}` );
		}
	}
}
