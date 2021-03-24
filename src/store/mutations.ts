import { LanguageInfo, RootState } from '@/store/index';
import { User } from '@/data-access/UserRepository';

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
};
