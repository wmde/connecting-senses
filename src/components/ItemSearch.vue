<template>
	<div>
		<label><span>Item</span>
			<AutoComplete
				v-model="inputValue"
				:suggestions="autoCompleteSuggestions"
				@complete="searchItems"
				@item-select="itemSelected"
				field="label"
				placeholder="Gloss"
			>
				<template #item="slotProps">
					<div>
						<b>{{ slotProps.item.label }}</b> ({{ slotProps.item.id }})
						<div>{{ slotProps.item.description }}</div>
					</div>
				</template>
			</AutoComplete>
		</label>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AutoComplete from 'primevue/autocomplete';
import { SearchResult } from '@/data-access/SearchEntityRepository';

export default defineComponent( {
	components: { AutoComplete },
	data() {
		return {
			inputValue: '',
			autoCompleteSuggestions: [] as SearchResult[],
		};
	},
	methods: {
		async itemSelected( event: { value: { id: string, label: string, description: string } } ): Promise<void> {
			this.$store.dispatch( 'setSearchedItemCandidate', event.value );
		},
		async searchItems( event: { query: string; } ) {
			this.autoCompleteSuggestions = await this.$store.dispatch(
				'searchItemValues',
				{
					search: event.query,
					limit: 48,
					languageCode: this.languageCode,
				},
			);
		},
	},
	props: {
		languageCode: {
			type: String,
			required: true,
		},
	},

} );
</script>

<style lang="scss">

</style>
