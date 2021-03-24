import UserRepository from '@/data-access/UserRepository';
import { LanguageInfo, RootState } from '@/store/index';
import { ActionContext, ActionTree } from 'vuex';
import SearchEntityRepository, { SearchOptions, SearchResult } from '@/data-access/SearchEntityRepository';
import ReadingClaimsRepository from '@/data-access/ReadingClaimsRepository';

export default (
	userRepository: UserRepository,
	searchEntityRepository: SearchEntityRepository,
	getClaimsRepository: ReadingClaimsRepository,
): ActionTree<RootState, RootState> => ( {
	async initApp( context: ActionContext<RootState, RootState> ): Promise<void> {
		const user = await userRepository.getCurrentUser();
		context.commit( 'setUser', user );
		context.commit( 'setInitializingDone' );
	},
	setLanguageInfo( context: ActionContext<RootState, RootState>, langInfo: LanguageInfo ): void {
		context.commit( 'setLanguageInfo', langInfo );
	},
	async searchItemValues(
		_context: ActionContext<RootState, RootState>,
		options: SearchOptions,
	): Promise<SearchResult[]> {
		return await searchEntityRepository.searchItemValues(
			options.search,
			options.limit,
			options.offset,
		);
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
} );
