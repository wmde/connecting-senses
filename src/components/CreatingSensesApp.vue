<template>
	<div>
		<UserTools
			v-if="userDisplayName !== null"
			:user-display-name="userDisplayName"
		/>
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
import UserTools from '@/components/UserTools.vue';

export default defineComponent( {
	components: { UserTools, Login },
	computed: {
		userDisplayName(): null | string {
			return this.$store.getters.userDisplayName;
		}
	},
} );
</script>

<style lang="scss">

</style>
