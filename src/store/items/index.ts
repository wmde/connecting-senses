import { Fingerprintable } from '@wmde/wikibase-datamodel-types';
import mutations from '@/store/items/mutations';
import { Module } from 'vuex';
import { RootState } from '@/store';

export interface Item extends Fingerprintable {
	id: string;
}

export interface ItemsState {
	items: { [ itemId: string ]: Item },
}

export default function createItemModule(): Module<ItemsState, RootState> {
	return {
		state: { items: {} } as ItemsState,
		mutations,
	};
}
