<template>
	<div>
		<UserTools
			v-if="userDisplayName !== null"
			:user-display-name="userDisplayName"
		/>
		<main>
			<Intro />
			<Login v-if="userDisplayName === null" />
			<LanguagePicker v-else />
		</main>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Login from '@/components/Login.vue';
import UserTools from '@/components/UserTools.vue';
import Intro from '@/components/Intro.vue';
import LanguagePicker from '@/components/LanguagePicker.vue';

export default defineComponent( {
	components: { Intro, LanguagePicker, UserTools, Login },
	computed: {
		userDisplayName(): null | string {
			return this.$store.getters.userDisplayName;
		},
	},
} );
</script>

<style lang="scss">

</style>
