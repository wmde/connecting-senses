import { Fingerprintable } from '@wmde/wikibase-datamodel-types';
import mutations from '@/store/items/mutations';
import getters from '@/store/items/getters';
import createItemActions from '@/store/items/actions';
import ServiceContainer from '@/services/ServiceContainer';
import { Module } from 'vuex';
import { RootState } from '@/store';

export interface Item extends Fingerprintable {
	id: string;
}

export interface ItemsState {
	items: { [ itemId: string ]: Item },
}

export default function createItemModule( services: ServiceContainer ): Module<ItemsState, RootState> {
	return {
		state: { items: {} } as ItemsState,
		mutations,
		getters,
		actions: createItemActions( services.get( 'readingEntityRepository' ) ),
	};
}
