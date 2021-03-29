import UserRepository from '@/data-access/UserRepository';
import { ItemCandidate, LanguageInfo, RootState } from '@/store/index';
import { ActionContext, ActionTree } from 'vuex';
import SearchEntityRepository, { SearchOptions, SearchResult } from '@/data-access/SearchEntityRepository';
import ReadingClaimsRepository, { ItemDataValue } from '@/data-access/ReadingClaimsRepository';
import SensesRepository from '@/data-access/SensesRepository';
import DecisionRepository, { DECISION } from '@/data-access/DecisionRepository';
import ClaimWritingRepository from '@/data-access/ClaimWritingRepository';
import ReadingEntityRepository, { Lexeme } from '@/data-access/ReadingEntityRepository';

export default (
	userRepository: UserRepository,
	searchEntityRepository: SearchEntityRepository,
	getClaimsRepository: ReadingClaimsRepository,
	sensesRepository: SensesRepository,
	claimWritingRepository: ClaimWritingRepository,
	decisionRepository: DecisionRepository,
	readingEntityRepository: ReadingEntityRepository,
): ActionTree<RootState, RootState> => ( {
	async initApp( context: ActionContext<RootState, RootState> ): Promise<void> {
		const user = await userRepository.getCurrentUser();
		context.commit( 'setUser', user );
		context.commit( 'setInitializingDone' );
	},
	setLanguageInfo( context: ActionContext<RootState, RootState>, langInfo: LanguageInfo ): void {
		context.commit( 'setLanguageInfo', langInfo );
		context.dispatch( 'queryForSenses', langInfo );
	},
	async queryForSenses( context: ActionContext<RootState, RootState>, langInfo: LanguageInfo ): Promise<void> {
		const senses = await sensesRepository.getSensesWithoutItems(
			langInfo.code,
			langInfo.id,
		);
		const existingSenseIds = context.state.senses.map( ( sense ) => sense.senseId );
		const filteredSenses = senses.filter(
			( { senseId } ) => !context.state.skippedSenses.includes( senseId ),
		).filter(
			( { senseId } ) => !existingSenseIds.includes( senseId ),
		);
		context.commit( 'addSenses', filteredSenses );
		context.dispatch( 'hydrateCurrentSense' );
	},
	async hydrateCurrentSense( context: ActionContext<RootState, RootState> ): Promise<void> {
		const currentSense = context.state.senses[ 0 ];
		if ( currentSense.additionalSenses ) {
			// already hydrated
			return;
		}
		const langCode = ( context.state.language as LanguageInfo ).code;
		const lexemeIdFromSense = currentSense.senseId.split( '-' )[ 0 ];
		const entityData = await readingEntityRepository.getFingerPrintableEntities(
			[ lexemeIdFromSense ],
			langCode,
		);
		const lexemeSenses = ( entityData[ lexemeIdFromSense ] as Lexeme ).senses;
		if ( lexemeSenses.length === 1 ) {
			return;
		}
		currentSense.additionalSenses = lexemeSenses
			.filter( ( sense ) => sense.id !== currentSense.senseId )
			.map( ( sense ) => {
				const additionalSenseData: { senseId: string, gloss: string, connectedItemId?: string } = {
					senseId: sense.id,
					gloss: sense.glosses[ langCode ]?.value,
				};
				if ( sense.claims.P5137 ) {
					const itemForSenseStatement = sense.claims.P5137;
					additionalSenseData.connectedItemId = (
						// TODO: bad type definition in @wmde/wikibase-datamodel-types
						itemForSenseStatement[ 0 ].mainsnak.datavalue as unknown as ItemDataValue
					)?.value.id;
					context.dispatch( 'ensureItemLabel', {
						itemId: additionalSenseData.connectedItemId,
						languageCode: langCode,
					} );
				}
				return additionalSenseData;
			} );
		if ( context.state.senses[ 0 ].senseId === currentSense.senseId ) {
			context.state.senses[ 0 ] = currentSense;
		}

	},
	async setSearchedItemCandidate(
		context: ActionContext<RootState, RootState>, itemCandidate: ItemCandidate,
	): Promise<void> {
		context.commit( 'setSearchedItemCandidate', itemCandidate );

		const claims = await getClaimsRepository.getClaims( itemCandidate.id );
		if ( claims.P31 && claims.P31[ 0 ].mainsnak.snaktype === 'value' ) {
			itemCandidate.classId = ( claims.P31[ 0 ].mainsnak.datavalue as ItemDataValue ).value.id;
		} else if ( claims.P279 && claims.P279[ 0 ].mainsnak.snaktype === 'value' ) {
			itemCandidate.classId = ( claims.P279[ 0 ].mainsnak.datavalue as ItemDataValue ).value.id;
		}
		context.commit( 'setSearchedItemCandidate', itemCandidate );
		context.dispatch( 'ensureItemLabel', {
			itemId: itemCandidate.classId,
			languageCode: context.getters.languageCode,
		} );
	},
	async searchItemValues(
		context: ActionContext<RootState, RootState>,
		options: SearchOptions,
	): Promise<SearchResult[]> {
		const itemResults = await searchEntityRepository.searchItemValues(
			options.search,
			options.limit,
			options.offset,
			options.languageCode,
		);

		if ( options.languageCode ) {
			// otherwise we would not know which language the search result is in (in principle)
			itemResults.forEach( ( value: SearchResult ) => {
				context.commit( 'setItemTerms', {
					...value,
					languageCode: options.languageCode,
				} );
			} );
		}

		return itemResults;
	},
	async getItemLanguageCode(
		_context: ActionContext<RootState, RootState>,
		itemId: string,
	): Promise<string | null> {
		const languageCodePid = 'P218';
		const claims = await getClaimsRepository.getClaims( itemId, languageCodePid );
		if ( !claims[ languageCodePid ] ) {
			return null;
		}
		return claims[ languageCodePid ][ 0 ].mainsnak.datavalue.value as string;
	},
	goToNextSense( context: ActionContext<RootState, RootState> ): void {
		context.commit( 'goToNextSense' );
		context.dispatch( 'hydrateCurrentSense' );
		if ( context.state.senses.length < 5 ) {
			context.dispatch( 'queryForSenses', context.state.language );
		}
	},
	skipSense(
		context: ActionContext<RootState, RootState>,
		currentSenseId: string,
	): void {
		context.commit( 'addToListOfSkippedSenses', currentSenseId );
		context.dispatch( 'goToNextSense' );
		decisionRepository.recordDecision( currentSenseId, DECISION.SKIPPED );
	},
	rejectSense(
		context: ActionContext<RootState, RootState>,
		currentSenseId: string,
	): void {
		decisionRepository.recordDecision( currentSenseId, DECISION.REJECTED );
		context.commit( 'setUndoState', 'rejection' );
	},
	undoRejection(
		context: ActionContext<RootState, RootState>,
		currentSenseId: string,
	): void {
		decisionRepository.undoDecision( currentSenseId, DECISION.REJECTED );
		context.commit( 'setUndoState', 'rejectionUndone' );
	},
	async connectSense(
		context: ActionContext<RootState, RootState>,
		payload: { senseId: string, itemId: string },
	): Promise<void> {
		const { senseId, itemId } = payload;
		try {
			await claimWritingRepository.setClaim( itemId, senseId );
			await decisionRepository.recordDecision( senseId, DECISION.ACCEPTED );
			context.commit( 'setUndoState', 'connection' );
		} catch ( e ) {
			console.log( e );
		}
	},
} );
