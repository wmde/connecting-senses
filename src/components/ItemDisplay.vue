<template>
	<div class="cs-item-display">
		<table class="cs-item-display__table">
			<tr>
				<th>Label</th>
				<td :lang="languageCode" dir="auto"><a :href="itemUrl">{{ itemCandidate.label }}</a></td>
			</tr>
			<tr>
				<th>Description</th>
				<td :lang="languageCode" dir="auto">{{ itemCandidate.description }}</td>
			</tr>
			<tr
				v-if="itemCandidate.classId"
			>
				<th>instance of / subclass of</th>
				<td :lang="languageCode" dir="auto"><a :href="classItemUrl">{{ classItemLabel }}</a></td>
			</tr>
		</table>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ItemCandidate } from '@/store';

export default defineComponent( {
	props: {
		itemCandidate: {
			type: Object as PropType<ItemCandidate>,
			required: true,
		},
		languageCode: {
			type: String,
			required: true,
		},
	},
	computed: {
		itemUrl(): string {
			return 'https://www.wikidata.org/wiki/' + this.itemCandidate.id;
		},
		classItemLabel(): string | undefined {
			const classLabel = this.$store.getters.getItemLabel( this.itemCandidate.classId, this.languageCode );
			if ( classLabel ) {
				return classLabel;
			}
			return this.itemCandidate.classId;
		},
		classItemUrl(): string | null {
			if ( !this.itemCandidate.classId ) {
				return null;
			}
			return 'https://www.wikidata.org/wiki/' + this.itemCandidate.classId;
		},
	},
} );
</script>

<style lang="scss">
.cs-item-display__table {
	width: 100%;
	background-color: #eee;

	td, th {
		text-align: start;
	}
}
</style>
