export interface extraSenseInfo {
	senseId: string,
	gloss: string,
	connectedItemId?: string
}
export interface SenseInfo {
	senseId: string,
	gloss: string,
	lemma: string,
	additionalSenses?: extraSenseInfo[]
}

export default interface SensesRepository {
	getSensesWithoutItems( languageCode: string, languageQid: string ): Promise<SenseInfo[]>
}
