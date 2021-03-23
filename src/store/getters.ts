import { RootState } from '@/store/index';

export default {
	userDisplayName( rootState: RootState ): null | string {
		console.log( { rootStateUser: rootState.user } );
		if ( rootState.user === null ) {
			return null;
		}

		return rootState.user.displayName;
	},
};
