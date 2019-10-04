<script context="module">
	export async function preload({params}, session) {
		return {
			id: params.id
		}
	}
</script>

<script>
	import {read} from "../libs/secbin";
	import {isBrowser} from "../libs/utils";
	import Paste from "../components/Paste.svelte";
	let value = "Loading...";
	export let id;

	$: if (isBrowser()) read(id, location.hash.slice(1)).then(v => {
		console.log(v);
		value = v;
	});
</script>

<svelte:head>
	<title>Codebin - {id}</title>
</svelte:head>

<Paste bind:value/>