<template>
	<div class="cs-undo-connection">
		<p>
			Thank you for your edit.
			You've just connected the sense:
			<em>{{ senseInfo.gloss }}</em> with Item: <em>{{ connectedItem.label }}</em>!
		</p>
		<a class="cs-undo-connection__undo-link" :href="undoHref">Undo</a>
		<Button
			label="Show me the next Lexeme"
			class="cs-undo-connection__next-button p-button-raised"
			@click="nextSense"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Button from 'primevue/button';
import { SenseInfo } from '@/data-access/SensesRepository';
import { ItemCandidate } from '@/store';

export default defineComponent( {
	components: { Button },
	props: {
		senseInfo: {
			type: Object as PropType<SenseInfo>,
			required: true,
		},
		connectedItem: {
			type: Object as PropType<ItemCandidate>,
			required: true,
		},
	},
	methods: {
		nextSense(): void {
			this.$store.dispatch( 'goToNextSense' );
		},
	},
	computed: {
		undoHref(): string {
			const lexemeId = ( this.senseInfo.senseId.match( /L\d+/ ) as string[] )[ 0 ];
			return `https://www.wikidata.org/w/index.php?title=Lexeme:${lexemeId}&action=history`;
		},
	},
} );
</script>

<style lang="scss">
.cs-undo-connection {
	&__undo-link {
		display: inline-block;
		width: 100%;
		box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
		padding: 0.5rem 1rem;
		font-size: 1rem;
		transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
		border-radius: 3px;
		border-color: transparent;
		color: #6c757d;
	}

	&__next-button {
		margin-top: 15px;
		width: 100%;
	}
}
</style>
