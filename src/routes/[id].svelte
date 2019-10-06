<script context="module">
	export async function preload({params}, session) {
		return {
			id: params.id
		}
	}
</script>

<script>
	import {read} from "../libs/secbin";
	import {isBrowser, sleep} from "../libs/utils";
	import {trigger} from "../libs/events";
	import Paste from "../components/Paste.svelte";
	let value = "Loading...";
	export let id;

	$: if (isBrowser()) read(id, location.hash.slice(1)).then(async data => {
		value = data.content;
		await sleep(1000);
		trigger("changeLanguage", data.language);
	});
</script>

<svelte:head>
	<title>Codebin - {id}</title>
</svelte:head>

<Paste bind:value/>