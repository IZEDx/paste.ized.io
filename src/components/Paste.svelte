<script lang="ts">
    import {paste} from "../libs/secbin";
    import {listen} from "../libs/events";
    import {sleep} from "../libs/utils";
    import Editor from "./Editor.svelte"
    
    export let value!: string;

    let result: Promise<string>;
    let urlInput: HTMLInputElement;

    let showResult = false;
    let isCopying = false;
    let isCopied = false;

    listen("paste", async () =>
	{   
        result = paste(value);
        await result;
        showResult = true;
		//location.href = await result;
    });

    function selectURL()
    {
        urlInput.select();
    }


    async function copyToClipboard()
    {
        if (isCopied) return;

        isCopied = true;
        isCopying = true;
        const url = await result;
        
        await navigator.clipboard.writeText(url);
        isCopying = false;

        await sleep(2000);
        isCopied = false;
    }
</script>

<Editor bind:value></Editor>
<div class="modal" class:is-active={showResult}>
    <div class="modal-background" on:click={() => showResult = false}></div>
    <div class="modal-content">
        <div class="box">
            {#await result}
                <progress class="progress is-primary" max="100"></progress>
            {:then url}
                {#if url != undefined}
                    <div class="field has-addons">
                        <div class="control is-expanded has-icons-left">
                            <input class="input" type="text" placeholder="URL" readonly value={url} on:click={selectURL} bind:this={urlInput}/>
                            <span class="icon is-small is-left">
                                <i class="fas fa-link"></i>
                            </span>
                        </div>
                        <div class="control">
                            <button class="button is-primary" class:is-loading={isCopying} on:click={copyToClipboard}>
                                <i class="fas fa-clipboard"></i> &nbsp; 
                                {#if isCopied}
                                    Copied!
                                {:else}
                                    Copy to clipboard
                                {/if}
                            </button>
                        </div>
                    </div>
                {/if}
            {/await}
        </div>
    </div>
    <button class="modal-close is-large" aria-label="close" on:click={() => showResult = false}></button>
</div>