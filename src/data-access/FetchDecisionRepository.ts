import DecisionRepository, { DECISION } from '@/data-access/DecisionRepository';

export default class FetchDecisionRepository implements DecisionRepository {
	public async recordDecision( senseId: string, languageCode: string, decision: DECISION ): Promise<void> {
		try {
			await fetch( '/decision', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify( {
					senseId, decision, langCode: languageCode,
				} ),
			} );
		} catch ( e ) {
			console.error( e );
		}
	}

	public async undoDecision( senseId: string, decision: DECISION ): Promise<void> {
		try {
			await fetch( '/decision', {
				method: 'DELETE',
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
