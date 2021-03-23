<template>
	<nav class="cs-user-tools">
		You're logged in as <b>{{ userDisplayName }}</b>
		<form class="cs-user-tools__logout-form" method="post" action="/logout">
			<button type="submit">log out</button>
		</form>
	</nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent( {
	props: {
		userDisplayName: {
			type: String,
			required: true,
		},
	},
} );
</script>

<style lang="scss">
.cs-user-tools__logout-form {
	display: inline;
}
</style>
