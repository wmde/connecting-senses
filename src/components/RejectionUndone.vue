<template>
	<div>
		<p>Your rejection of the sense <em>{{ senseInfo.gloss }}</em> was successfully undone.</p>
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
	},
} );
</script>

<style lang="scss">

</style>
