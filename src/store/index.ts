import { createStore as vuexCreateStore, Store } from 'vuex';
import ServiceContainer from '@/services/ServiceContainer';
import createActions from '@/store/actions';
import { User } from '@/data-access/UserRepository';
import mutations from '@/store/mutations';
import getters from '@/store/getters';
import { SenseInfo } from '@/data-access/SensesRepository';
import createItemModule from '@/store/items';

export interface LanguageInfo {
	id: string;
	label: string;
	code: string;
}

export interface ItemCandidate {
	id: string;
	label: string;
	description: string;
	classId?: string;
	imageUrl?: string; // TODO: ignored for now, needs rendering via API?
}

export type UndoState = null | 'connection' | 'rejection' | 'rejectionUndone';

export interface RootState {
	user: User | null,
	isInitializing: boolean,
	language: null | LanguageInfo,
	senses: SenseInfo[],
	searchedItemCandidate: ItemCandidate | null,
	skippedSenses: string[],
	undo: UndoState,
}

function getInitialState(): RootState {
	return {
		user: null,
		isInitializing: true,
		language: null,
		senses: [],
		searchedItemCandidate: null,
		skippedSenses: [],
		undo: null,
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
			services.get( 'sensesRepository' ),
			services.get( 'claimWritingRepository' ),
			services.get( 'decisionRepository' ),
			services.get( 'readingEntityRepository' ),
		),
		modules: {
			items: createItemModule( services ),
		},
		getters,
	} );
}
