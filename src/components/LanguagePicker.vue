<template>
	<div class="cs-language-selector">
		<form v-if="!language">
			<label><span>Select a language for the lexemes that you want to see</span>
				<AutoComplete
					v-model="inputValue"
					:suggestions="autoCompleteSuggestions"
					@complete="searchItems"
					@item-select="languageSelected"
					field="label"
					placeholder="English"
				>
					<template #item="slotProps">
						<div>
							<b>{{ slotProps.item.label }}</b> ({{ slotProps.item.id }})
							<div>{{ slotProps.item.description }}</div>
						</div>
					</template>
				</AutoComplete>
			</label>
			<span class="cs-language-selector__error" v-if="error">{{ error }}</span>
		</form>
		<div v-else>Lexeme language: {{ language }}</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AutoComplete from 'primevue/autocomplete';
import { SearchResult } from '@/data-access/SearchEntityRepository';
import { LanguageInfo } from '@/store';

export default defineComponent( {
	components: { AutoComplete },
	data() {
		return {
			error: null as string | null,
			inputValue: '',
			autoCompleteSuggestions: [] as SearchResult[],
		};
	},
	computed: {
		language(): boolean {
			return this.$store.getters.languageLabel;
		},
	},
	methods: {
		async languageSelected( event: { value: { id: string, label: string } } ): Promise<void> {
			const selectedItemId = event.value.id;
			// TODO: show some loading thingy here
			const langCode = await this.$store.dispatch( 'getItemLanguageCode', selectedItemId );
			if ( !langCode ) {
				this.error =
					'The item you chose does not seem to have a ISO 639-1 language code associated with it (P218).';
				return;
			}
			this.error = null;
			const payload: LanguageInfo = {
				id: selectedItemId,
				label: event.value.label,
				code: langCode,
			};
			this.$store.dispatch( 'setLanguageInfo', payload );
		},
		async searchItems( event: { query: string; } ) {
			this.autoCompleteSuggestions = await this.$store.dispatch(
				'searchItemValues',
				{
					search: event.query,
					limit: 48,
				},
			);
		},
	},
} );
</script>

<style lang="scss">
.cs-language-selector__error {
	color: red;
	font-weight: bold;
}

</style>
