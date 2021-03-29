<template>
	<div class="cs-item-display">
		<div v-if="itemAlreadyInUseForOtherSense" class="cs-item-display__duplicate-notice">
			<i class="pi pi-info-circle"></i>
			<p>
				This Item is already connected to another sense for this Lexeme.
				It is unusual for more than one sense of a Lexeme to be connected to the same Item.
				Please verify that this Item should be connected to the presented sense.
			</p>
		</div>
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
import { SenseInfo } from '@/data-access/SensesRepository';

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
		sense: {
			type: Object as PropType<SenseInfo>,
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
		itemAlreadyInUseForOtherSense(): boolean {
			if ( !this.sense.additionalSenses ) {
				return false;
			}
			const itemIdsInUse = this.sense.additionalSenses.map( ( { connectedItemId } ) => connectedItemId );
			return itemIdsInUse.includes( this.itemCandidate.id );
		},
	},
} );
</script>

<style lang="scss">
.cs-item-display {
	&__duplicate-notice {
		display: flex;
		width: 100%;
		border: 2px solid #999;
		background-color: #ddd;
		padding: 0 0.5em;
		gap: 0.5em;
		align-items: baseline;
	}

	&__table {
		width: 100%;
		background-color: #eee;

		td, th {
			text-align: start;
		}
	}
}
</style>
