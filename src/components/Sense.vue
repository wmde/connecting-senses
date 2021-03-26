<template>
	<div class="cs-sense">
		<a :href="senseUrl">Lexeme</a>
		<table class="cs-sense__sense-table">
			<tr>
				<th>Lemma</th>
				<td :lang="languageCode" dir="auto">{{ senseInfo.lemma }}</td>
			</tr>
			<tr>
				<th>Sense</th>
				<td :lang="languageCode" dir="auto">{{ senseInfo.gloss }}</td>
			</tr>
		</table>
		<div v-if="extraSenses" class="cs-sense__extraData">
			<hr />
			<div class="cs-sense__extra-senses-intro">
				<p>Other senses for this Lexeme (these will not be connected to the Item):</p>
				<Button
					class="p-button-outlined p-button-rounded p-button-secondary"
					@click="additionalSensesOpen = !additionalSensesOpen"
					:icon="buttonIcon" iconPos="right"
				/>
			</div>
			<table v-if="additionalSensesOpen" class="cs-sense__sense-table">
				<tr v-for="sense in extraSenses" :key="sense.senseId">
					<th><a :href="sense.senseUrl">Sense</a></th>
					<td :lang="languageCode" dir="auto">
						{{ sense.gloss }}
						<div v-if="sense.connectedItemId">
							Item for this sense: <a :href="sense.connectedItemUrl">{{ sense.connectedItemLabel }}</a>
						</div>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Button from 'primevue/button';
import { extraSenseInfo, SenseInfo } from '@/data-access/SensesRepository';

interface hydratedExtraSenseInfo extends extraSenseInfo {
	senseUrl: string;
	connectedItemLabel?: string;
	connectedItemUrl?: string;
}

export default defineComponent( {
	components: { Button },
	data() {
		return {
			additionalSensesOpen: false,
		};
	},
	props: {
		senseInfo: {
			type: Object as PropType<SenseInfo>,
			required: true,
		},
		languageCode: {
			type: String,
			required: true,
		},
	},
	computed: {
		extraSenses(): hydratedExtraSenseInfo[] | boolean {
			if ( !this.senseInfo.additionalSenses || this.senseInfo.additionalSenses.length === 0 ) {
				return false;
			}
			return this.senseInfo.additionalSenses.map( ( senseData ) => {
				const hydratedSenseData: hydratedExtraSenseInfo = {
					...senseData,
					senseUrl: 'https://www.wikidata.org/entity/' + senseData.senseId,
				};

				if ( senseData.connectedItemId ) {
					const connectedItemLabel = this.$store.getters.getItemLabel(
						senseData.connectedItemId,
						this.languageCode,
					);
					hydratedSenseData.connectedItemLabel = connectedItemLabel ?? senseData.connectedItemId;
					hydratedSenseData.connectedItemUrl = 'https://www.wikidata.org/wiki/' + senseData.connectedItemId;
				}

				return hydratedSenseData;
			} );
		},
		senseUrl(): string {
			return 'https://www.wikidata.org/entity/' + this.senseInfo.senseId;
		},
		buttonIcon(): string {
			return [ 'pi', this.additionalSensesOpen ? 'pi-chevron-up' : 'pi-chevron-down' ].join( ' ' );
		},
	},
} );
</script>

<style lang="scss">
.cs-sense {
	&__sense-table {
		width: 100%;
		background-color: #eee;

		td, th {
			text-align: start;
		}

		th {
			width: 60px;
		}
	}

	&__extraData {
		font-size: 0.9rem;
		background-color: #eee;
	}

	&__extra-senses-intro {
		display: flex;

		button {
			flex-shrink: 0;
		}
	}
}
</style>
