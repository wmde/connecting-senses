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
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { SenseInfo } from '@/data-access/SensesRepository';

export default defineComponent( {
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
		senseUrl(): string {
			return 'https://www.wikidata.org/entity/' + this.senseInfo.senseId;
		},
	},
} );
</script>

<style lang="scss">
.cs-sense__sense-table {
	width: 100%;
	background-color: #eee;

	td, th {
		text-align: start;
	}
}
</style>
