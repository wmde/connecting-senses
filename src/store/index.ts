import { createStore as vuexCreateStore, Store } from 'vuex';
import ServiceContainer from '@/services/ServiceContainer';
import createActions from '@/store/actions';
import { User } from '@/data-access/UserRepository';
import mutations from '@/store/mutations';
import getters from '@/store/getters';

export interface RootState {
  user: User | null,
  isInitializing: boolean,
}

function getInitialState(): RootState {
  return {
    user: null,
    isInitializing: true,
  };
}

export default function createStore( services: ServiceContainer ): Store<RootState> {
  return vuexCreateStore( {
    state: getInitialState(),
    mutations,
    actions: createActions( services.get( 'userRepository' ) ),
    modules: {},
    getters,
  } );
}

