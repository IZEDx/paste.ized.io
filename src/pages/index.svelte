<script lang="ts">
  import {paste, read} from "../libs/paster";

  const loading = (async () => {
    const url = await paste("LOL");
    const decrypted = await read(location.hash);
    return {url, decrypted};
  })();
</script>

{#await loading}
  Loading...
{:then data}
  URL: {data.url} <br>
  Decrypted: {data.decrypted} <br>
  

{/await}

<style lang="scss">
  h1 {
    color: red;

    .name 
    {
      color: black;
    }
  }
</style>