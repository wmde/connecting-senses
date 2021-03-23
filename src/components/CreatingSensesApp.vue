<template>
	<div>
		<nav v-if="userDisplayName !== null"><mark>TODO NEXT</mark> {{userDisplayName}}</nav>
		<main>
		<h1>Connecting Senses Tool</h1>
		<p>
			Quickly connect senses to items.
			This will help to connect senses amongst each other.
			For more information visit <a href="https://example.com/FIXME">this help page</a>.
		</p>
		<Login v-if="userDisplayName === null" />
		<mark v-else>TODO</mark>
		</main>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Login from '@/components/Login.vue';

export default defineComponent( {
	components: { Login },
	computed: {
		userDisplayName(): null | string {
			return this.$store.getters.userDisplayName;
		}
	},
} );
</script>

<style lang="scss">

</style>
