<script lang="ts">
    import {onMount} from "svelte";
    import {isBrowser} from "../libs/utils";

    export let value = "";
    export let id!: string;
    let el!: HTMLElement;
    let showLoading = true;

    onMount(async () => 
    {
        if (isBrowser())
        {
            const {Editor} = await import("../libs/editor");
            let editor = new Editor(el, value);

            const timer = setInterval(() => {
                console.log(el, el.querySelector(".monaco-editor"));
                if (el && el.querySelector(".monaco-editor"))
                {
                    showLoading = false;
                    clearInterval(timer);
                }
            }, 200);

            editor.monaco.onDidChangeModelContent(() => {
                value = editor.value;
            })

            window.addEventListener("resize", e => {
                if (el)
                {
                    value = editor.value;
                    editor.monaco.dispose();
                    editor = new Editor(el, value);
                }
            });
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