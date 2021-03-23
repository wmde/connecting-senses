import { Store } from 'vuex'
import { RootState } from '@/store';

/**
 * see https://next.vuex.vuejs.org/guide/typescript-support.html
 */
declare module '@vue/runtime-core' {
	// provide typings for `this.$store`
	interface ComponentCustomProperties {
		$store: Store<RootState>
	}
}
