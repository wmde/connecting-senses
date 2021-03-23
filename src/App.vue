<template>
	<div>
		<CreatingSensesApp v-if="initializingDone" />
		<span v-else>Loading...</span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CreatingSensesApp from '@/components/CreatingSensesApp.vue';

export default defineComponent( {
	name: 'App',
	components: {
		CreatingSensesApp,
	},
	computed: {
		initializingDone(): boolean {
			return !this.$store.state.isInitializing;
		},
	},
} );
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
