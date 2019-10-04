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

    constructor(public el: HTMLElement, private overrides: monaco.editor.IEditorOverrideServices = {})
    {
        this.monaco = monaco.editor.create(this.el, overrides);
    }
    
    static getLanguages()
    {
        return monaco.languages.getLanguages();
    }

    set value(v: string)
    {
        this.monaco.setValue(v);
    }

    get value()
    {
        return this.monaco.getValue();
    }


    set language(lang: string)
    {
        this.overrides.language = lang;
        this.monaco.updateOptions(this.overrides);
    }

    get language()
    {
        return this.overrides.language;
    }

    set theme(theme: string)
    {
        this.overrides.theme = theme;
        this.monaco.updateOptions(this.overrides);
    }

    get theme()
    {
        return this.overrides.theme;
    }
}

