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

    <Editor bind:value id="main"></Editor>
    <!--
    <button class="paste" on:click="{onPaste}">Paste!</button>
    {#await result}
        Pasting...
    {:then url}
        {#if url != undefined}
            URL: {url} <br>
        {/if}
    {/await}
    -->

<style lang="scss">
.container {
    height: 100%;
}
</style>