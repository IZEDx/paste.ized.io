<script lang="ts">
    import {paste} from "../libs/secbin";
    import Editor from "./Editor.svelte"
	export let value = "";
    let result: Promise<string>;
	
	async function onPaste()
	{
		result = paste(value);
		//location.href = await result;
	}
</script>

<div class="paste">
    <Editor bind:value id="main"></Editor>
    <button class="paste" on:click="{onPaste}">Paste!</button>
    {#await result}
        Pasting...
    {:then url}
        {#if url != undefined}
            URL: {url} <br>
        {/if}
    {/await}
</div>

<style lang="scss">
    .paste {
        width: 100%;
        height: 100%;
    }
</style>