import { RootState } from '@/store';
import { ActionContext, ActionTree } from 'vuex';
import { ItemsState } from '@/store/items/index';
import ReadingEntityRepository from '@/data-access/ReadingEntityRepository';

export default ( readingEntityRepository: ReadingEntityRepository ): ActionTree<ItemsState, RootState> => ( {
	async ensureItemLabel(
		context: ActionContext<ItemsState, RootState>, payload: { itemId: string; languageCode: string; },
	): Promise<void> {
		const { itemId, languageCode } = payload;
		if ( context.getters.getItemLabel( itemId, languageCode ) ) {
			return;
		}
		const items = await readingEntityRepository.getFingerPrintableEntities( [ itemId ], languageCode );
		context.commit( 'setItemTerms', {
			languageCode,
			id: itemId,
			label: items[ itemId ].labels[ languageCode ].value,
			description: items[ itemId ].descriptions[ languageCode ].value,
		} );
	},
} );
