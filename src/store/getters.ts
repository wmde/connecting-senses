import { RootState } from '@/store/index';
import { SenseInfo } from '@/data-access/SensesRepository';

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
	languageCode( rootState: RootState ): string | null {
		return rootState.language?.code ?? null;
	},
	sense( rootState: RootState ): SenseInfo | null {
		if ( rootState.senses.length === 0 ) {
			return null;
		}
		return rootState.senses[ 0 ];
	},
};
