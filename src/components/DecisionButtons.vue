<template>
	<div class="cs-decision-buttons">
		<Button
			label="Connect sense to Item"
			class="p-button-raised"
			v-if="itemId !== null"
			@click="connectSense"
		/>
		<Button
			label="Skip this sense"
			class="p-button-raised"
			@click="skipSense"
		/>
		<Button
			label="This sense should not connect to any item (sense will be removed from suggestions)"
			class="p-button-danger p-button-raised p-button-text"
			@click="rejectSense"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from 'primevue/button';

export default defineComponent( {
	components: { Button },
	methods: {
		skipSense(): void {
			this.$store.dispatch( 'skipSense', this.senseId );
		},
		rejectSense(): void {
			this.$store.dispatch( 'rejectSense', this.senseId );
		},
		connectSense(): void {
			this.$store.dispatch( 'connectSense', { senseId: this.senseId, itemId: this.itemId } );
		},
	},
	props: {
		senseId: {
			type: String,
			required: true,
		},
		itemId: {
			type: String,
			default: null,
		},
	},
} );
</script>

<style lang="scss">
.cs-decision-buttons {
	button {
		width: 100%;
		margin-top: 10px;
	}
}
</style>
