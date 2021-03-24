import { LanguageInfo, RootState } from '@/store/index';
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
	setSenses( state: RootState, senses: SenseInfo[] ): void {
		state.senses = senses;
	},
};
