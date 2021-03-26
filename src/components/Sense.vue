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
					:icon="['pi', additionalSensesOpen ? 'pi-chevron-up': 'pi-chevron-down']" iconPos="right"
				/>
			</div>
			<table v-if="additionalSensesOpen" class="cs-sense__sense-table">
				<tr v-for="sense in extraSenses" :key="sense.senseId">
					<th><a :href="sense.senseUrl">Sense</a></th>
					<td :lang="languageCode" dir="auto">{{ sense.gloss }}</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Button from 'primevue/button';
import { SenseInfo } from '@/data-access/SensesRepository';

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
		extraSenses(): unknown {
			if ( !this.senseInfo.additionalSenses || this.senseInfo.additionalSenses.length === 0 ) {
				return false;
			}
			return this.senseInfo.additionalSenses.map( ( senseData ) => {
				return {
					...senseData,
					senseUrl: 'https://www.wikidata.org/entity/' + senseData.senseId,
				};
			} );
		},
		senseUrl(): string {
			return 'https://www.wikidata.org/entity/' + this.senseInfo.senseId;
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
