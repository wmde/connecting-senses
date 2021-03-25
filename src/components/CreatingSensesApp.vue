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
			<ItemSearch v-if="sense" :language-code="languageCode" :sense="sense" />
			<ItemDisplay
				v-if="searchedItemCandidate"
				:item-candidate="searchedItemCandidate"
				:language-code="languageCode"
			/>
			<DecisionButtons
				v-if="sense"
				:senseId="sense.senseId"
				:item-id="searchedItemCandidate?.id ?? null"
			/>
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
import ItemSearch from '@/components/ItemSearch.vue';
import ItemDisplay from '@/components/ItemDisplay.vue';
import { ItemCandidate } from '@/store';
import DecisionButtons from '@/components/DecisionButtons.vue';

export default defineComponent( {
	components: { DecisionButtons, ItemDisplay, ItemSearch, Sense, Intro, LanguagePicker, UserTools, Login },
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
		searchedItemCandidate(): ItemCandidate | null {
			return this.$store.getters.searchedItemCandidate;
		},
	},
} );
</script>

<style lang="scss">

</style>
