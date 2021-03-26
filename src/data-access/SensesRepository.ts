export interface SenseInfo {
	senseId: string,
	gloss: string,
	lemma: string,
	additionalSenses?: { senseId: string, gloss: string, connectedItemId?: string }[]
}

export default interface SensesRepository {
	getSensesWithoutItems( languageCode: string, languageQid: string ): Promise<SenseInfo[]>
}
