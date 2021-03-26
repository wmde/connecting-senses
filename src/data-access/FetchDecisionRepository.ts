import DecisionRepository, { DECISION } from '@/data-access/DecisionRepository';

export default class FetchDecisionRepository implements DecisionRepository {
	public async recordDecision( senseId: string, decision: DECISION ): Promise<void> {
		try {
			await fetch( '/decision', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify( {
					senseId, decision,
				} ),
			} );
		} catch ( e ) {
			console.error( e );
		}
	}

}
