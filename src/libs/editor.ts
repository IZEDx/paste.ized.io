import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
//import * as monaco from "monaco-editor";

// @ts-ignore
self.MonacoEnvironment = {
    getWorkerUrl: (moduleId: any, label: string) => {
        if (label === "json") {
            return "./json.worker.bundle.js";
        }
        if (label === "css") {
            return "./css.worker.bundle.js";
        }
        if (label === "html") {
            return "./html.worker.bundle.js";
        }
        if (label === "typescript" || label === "javascript") {
            return "./ts.worker.bundle.js";
        }
        return "./editor.worker.bundle.js";
    }
};

export class Editor
{
    public monaco: monaco.editor.IStandaloneCodeEditor;

    constructor(public el: HTMLElement, value = "")
    {
        this.monaco = monaco.editor.create(this.el, {
			value: value,
            language: 'javascript',
            theme: "vs-dark"
        });
    }

    set value(v: string)
    {
        this.monaco.setValue(v);
    }

    get value()
    {
        return this.monaco.getValue();
    }
}

