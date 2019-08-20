<script lang="ts">
	import {paste, read} from "../libs/paster";

	let value = "";
	let result: Promise<string>;
	
	async function onPaste()
	{
		result = paste(value);

		location.href = await result;
	}

	if (location.hash)
	{
		read(location.hash.slice(1)).then(v => value = v);
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