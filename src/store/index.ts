import { createStore as vuexCreateStore, Store } from 'vuex';
import ServiceContainer from '@/services/ServiceContainer';
import createActions from '@/store/actions';
import { User } from '@/data-access/UserRepository';
import mutations from '@/store/mutations';
import getters from '@/store/getters';

export interface LanguageInfo {
	id: string;
	label: string;
	code: string;
}

export interface RootState {
	user: User | null,
	isInitializing: boolean,
	language: null | LanguageInfo,
}

function getInitialState(): RootState {
	return {
		user: null,
		isInitializing: true,
		language: null,
	};
}

export default function createStore( services: ServiceContainer ): Store<RootState> {
	return vuexCreateStore( {
		state: getInitialState(),
		mutations,
		actions: createActions(
			services.get( 'userRepository' ),
			services.get( 'searchEntityRepository' ),
			services.get( 'getClaimsRepository' ),
		),
		modules: {},
		getters,
	} );
}
