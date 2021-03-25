// TODO: eslint bug?
// eslint-disable-next-line no-shadow
export enum DECISION {
	ACCEPTED = 'ACCEPTED',
	REJECTED = 'REJECTED',
	SKIPPED = 'SKIPPED',
}

export default interface DecisionRepository {
	recordDecision( senseId: string, decision: DECISION ): Promise<void>;
}
