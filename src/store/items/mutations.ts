import { ItemsState } from '@/store/items/index';

export default {
	setItemTerms(
		state: ItemsState,
		payload: { id: string, languageCode: string, label: string, description: string, },
	): void {
		const { id, languageCode, label, description } = payload;

		if ( !state.items[ id ] ) {
			state.items[ id ] = {
				id,
				labels: {},
				descriptions: {},
				aliases: {},
			};
		}

		state.items[ id ] = {
			id,
			labels: {
				...state.items[ id ].labels,
				[ languageCode ]: { language: languageCode, value: label },
			},
			descriptions: {
				...state.items[ id ].descriptions,
				[ languageCode ]: { language: languageCode, value: description },
			},
			aliases: state.items[ id ].aliases,
		};
	},
};
