import { RootState } from '@/store/index';

export default {
	userDisplayName( rootState: RootState ): null | string {
		if ( rootState.user === null ) {
			return null;
		}

		return rootState.user;
	},
};
