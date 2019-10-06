<script lang="ts">
    import {onMount} from "svelte";
    import {isBrowser} from "../libs/utils";

    export let value = "";
    export let theme = "vs-dark-with-errors";
    export let language = "javascript";
    let el!: HTMLElement;
    let showLoading = true;
    let editor: any;

    $: if (editor && editor.value !== value) editor.value = value;
    $: if (editor) editor.theme = theme;
    $: if (editor) editor.language = language;

    onMount(async () => 
    {
        if (isBrowser())
        {
            showLoading = true;
            const {Editor} = await import("../libs/editor");
            editor = new Editor(el, {
                value, theme, language
            });

            editor.onChange((v: string) => {
                value = v;
            });

            window.addEventListener("resize", e => editor.refresh());
            showLoading = false;
        }
    });
</script>

<div class="editor" bind:this={el}>
    <div class="modal" class:is-active={showLoading}>
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="container">
                <progress class="progress is-primary" max="100"></progress>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .editor {
        width: 100%;
        height: 100%;
    }
</style>