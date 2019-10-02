<script lang="ts">
    import {onMount} from "svelte";
    import {isBrowser} from "../libs/utils";

    export let value = "";
    export let id!: string;
    let el!: HTMLElement;

    onMount(async () => 
    {
        if (isBrowser())
        {
            const {Editor} = await import("../libs/editor");
            let editor = new Editor(el, value);

            window.addEventListener("resize", e => {
                value = editor.value;
                editor.monaco.dispose();
                editor = new Editor(el, value);
            });
        }
    });
</script>

<div class="editor" bind:this={el}>
</div>

<style lang="scss">
    .editor {
        width: 100%;
        height: 100%;
    }
</style>