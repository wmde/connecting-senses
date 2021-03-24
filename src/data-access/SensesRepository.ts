export interface SenseInfo {
	senseId: string,
	gloss: string,
	lemma: string,
	// TODO: more info about lemma? e.g. Genus?, More senses?
}

export default interface SensesRepository {
	getSensesWithoutItems( languageCode: string, languageQid: string ): Promise<SenseInfo[]>
}
