import { ItemsState } from '@/store/items/index';

export default {
	getItemLabel( state: ItemsState ) {
		return ( itemId: string, langCode: string ): null | string => {
			if ( !state.items[ itemId ] ) {
				return null;
			}
			if ( !state.items[ itemId ].labels[ langCode ] ) {
				return null;
			}
			return state.items[ itemId ].labels[ langCode ].value;
		};
	},

};
