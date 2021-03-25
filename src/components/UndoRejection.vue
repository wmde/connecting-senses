<template>
	<div class="cs-undo-rejection">
		<p>
			Thank you for your action. You've just removed the following sense from rotation:
			<em>{{ senseInfo.gloss }}</em>.
			It will no longer be suggested in this tool.
		</p>
		<Button
			label="Undo"
			class="p-button-raised p-button-text p-button-plain"
			@click="undoRejection"
		/>
		<Button
			label="Show me the next Lexeme"
			class="p-button-raised"
			@click="nextSense"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Button from 'primevue/button';
import { SenseInfo } from '@/data-access/SensesRepository';

export default defineComponent( {
	components: { Button },
	props: {
		senseInfo: {
			type: Object as PropType<SenseInfo>,
			required: true,
		},
	},
	methods: {
		nextSense(): void {
			this.$store.dispatch( 'goToNextSense' );
		},
		undoRejection(): void {
			this.$store.dispatch( 'undoRejection' ); // FIXME: implement
		},
	},
} );
</script>

<style lang="scss">
.cs-undo-rejection {
	button {
		width: 100%;
		margin-top: 15px;
	}
}
</style>
