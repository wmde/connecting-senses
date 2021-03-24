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
			<Sense v-if="sense" :sense-info="sense" :language-code="languageCode" />
		</main>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Login from '@/components/Login.vue';
import UserTools from '@/components/UserTools.vue';
import Intro from '@/components/Intro.vue';
import LanguagePicker from '@/components/LanguagePicker.vue';
import { SenseInfo } from '@/data-access/SensesRepository';
import Sense from '@/components/Sense.vue';

export default defineComponent( {
	components: { Sense, Intro, LanguagePicker, UserTools, Login },
	computed: {
		userDisplayName(): null | string {
			return this.$store.getters.userDisplayName;
		},
		sense(): SenseInfo | null {
			return this.$store.getters.sense;
		},
		languageCode(): string | null {
			return this.$store.getters.languageCode;
		},
	},
} );
</script>

<style lang="scss">

</style>
