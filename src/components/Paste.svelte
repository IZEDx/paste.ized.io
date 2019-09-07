<script lang="ts">
	import {paste} from "../libs/secbin";
	export let value = "";
    let result: Promise<string>;
	
	async function onPaste()
	{
		result = paste(value);
		//location.href = await result;
	}
</script>

<textarea bind:value></textarea>
<button on:click="{onPaste}">Paste!</button>

{#await result}
	Pasting...
{:then url}
	{#if url != undefined}
		URL: {url} <br>
	{/if}
{/await}

<style lang="scss">
	textarea { 
		width: 100%; 
		height: 200px; 
	}
</style>