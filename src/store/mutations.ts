import { ItemCandidate, LanguageInfo, RootState } from '@/store/index';
import { User } from '@/data-access/UserRepository';
import { SenseInfo } from '@/data-access/SensesRepository';

export default {
	setUser( state: RootState, payload: User | null ): void {
		state.user = payload;
	},
	setInitializingDone( state: RootState ): void {
		state.isInitializing = false;
	},
	setLanguageInfo( state: RootState, languageInfo: LanguageInfo ): void {
		state.language = languageInfo;
	},
	addSenses( state: RootState, senses: SenseInfo[] ): void {
		state.senses = [ ...state.senses, ...senses ];
	},
	setSearchedItemCandidate( state: RootState, itemCandidate: ItemCandidate ): void {
		state.searchedItemCandidate = itemCandidate;
	},
	addToListOfSkippedSenses( state: RootState, senseId: string ): void {
		state.skippedSenses.push( senseId );
	},
	goToNextSense( state: RootState ): void {
		state.searchedItemCandidate = null;
		state.senses = state.senses.slice( 1 );
	},
};
