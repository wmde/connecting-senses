import ClaimWritingRepository from '@/data-access/ClaimWritingRepository';

export default class FetchClaimWritingRepository implements ClaimWritingRepository {
	private readonly endpoint: string;

	public constructor( endpoint: string ) {
		this.endpoint = endpoint;
	}

	public async setClaim( itemId: string, senseId: string ): Promise<void> {
		try {
			await fetch( '/connection-record', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify( {
					senseId, itemId,
				} ),
			} );
		} catch ( e ) {
			console.error( e );
		}

	}
}
