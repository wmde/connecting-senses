import UserRepository from '@/data-access/UserRepository';
import { RootState } from '@/store/index';
import { ActionContext, ActionTree } from 'vuex';

export default ( userRepository: UserRepository ): ActionTree<RootState, RootState> => ( {
	async initApp( context: ActionContext<RootState, RootState> ): Promise<void> {
		const user = await userRepository.getCurrentUser();
		context.commit( 'setUser', user );
		context.commit( 'setInitializingDone' );
	},
} );
