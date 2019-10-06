import * as monaco from "monaco-editor/esm/vs/editor/editor.api";


monaco.languages.register({ id: 'http-error' });

monaco.languages.setMonarchTokensProvider('http-error', {
	tokenizer: {
		root: [
            [/[0-9][0-9][0-9]\n*/, "http-error-code"],
            [/.*/, "http-error-message"]
		]
	}
});

monaco.editor.defineTheme('vs-dark-with-errors', {
	base: 'vs-dark',
    inherit: true,
    colors: {},
	rules: [
		{ token: 'http-error-code', foreground: 'ff0000', fontStyle: 'bold underline',  },
		{ token: 'http-error-message', foreground: 'D3D3D3' }
	]
});