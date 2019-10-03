<svelte:head>
	<title>Create new paste</title>
</svelte:head>


<script lang="ts">
	import {paste} from "../libs/secbin";
	import Paste from "../components/Paste.svelte"
</script>

<Paste value="Hello World"></Paste>