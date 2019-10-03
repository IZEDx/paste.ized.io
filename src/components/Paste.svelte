<script lang="ts">
    import {paste} from "../libs/secbin";
    import {listen} from "../libs/events";
    import Editor from "./Editor.svelte"
    
    export let value!: string;

    let showResult = false;
    let result: Promise<string>;
    

    listen("paste", () =>
	{   
        result = paste(value);
        showResult = true;
		//location.href = await result;
	})
</script>

<Editor bind:value id="main"></Editor>
<div class="modal" class:is-active={showResult}>
    <div class="modal-background" on:click={() => showResult = false}></div>
    <div class="modal-content">
        <div class="box">
            {#await result}
                Pasting...
            {:then url}
                {#if url != undefined}
                    <a href={url}>{url}</a>
                {/if}
            {/await}
        </div>
    </div>
    <button class="modal-close is-large" aria-label="close" on:click={() => showResult = false}></button>
</div>
