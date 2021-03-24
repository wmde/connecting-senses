import { RootState } from '@/store/index';

export default {
	userDisplayName( rootState: RootState ): null | string {
		if ( rootState.user === null ) {
			return null;
		}

		return rootState.user;
	},
	languageLabel( rootState: RootState ): string | null {
		return rootState.language?.label ?? null;
	},
};
