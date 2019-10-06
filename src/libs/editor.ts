import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
require("monaco-editor/esm/vs/basic-languages/monaco.contribution");

type InitFunction = (monaco: monaco.editor.IStandaloneCodeEditor) => void;
type ChangeFunction = (content: string) => void;

export class Editor
{
    public monaco!: monaco.editor.IStandaloneCodeEditor;
    private changeFunc: ChangeFunction = content => {};

    constructor(public el: HTMLElement, private overrides: monaco.editor.IEditorOverrideServices = {}, private initFunc: InitFunction = m => {})
    {
        this.init();
    }

    init()
    {
        this.monaco = monaco.editor.create(this.el, this.overrides);
        
        this.monaco.onDidChangeModelContent(() => {
            this.overrides.value = this.value;
            this.changeFunc(this.value);
        })

        this.initFunc(this.monaco);
    }

    refresh()
    {
        this.monaco.dispose();
        this.init();
    }

    onInit(initFunc: InitFunction)
    {
        this.initFunc = initFunc
    }

    onChange(changeFunc: ChangeFunction)
    {
        this.changeFunc = changeFunc;
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

    get language()
    {
        return this.overrides.language;
    }

    set language(language: string)
    {
        this.overrides.language = language;
        this.refresh();
    }

    set theme(theme: string)
    {
        this.overrides.theme = theme;
        this.refresh();
    }

    get theme()
    {
        return this.overrides.theme;
    }
}

