<script lang="ts">
	import {trigger} from "../libs/events";
	export let segment: any;
	let expandNav = false;
	let isPasting = false;

	async function paste()
	{
		isPasting = true;
		await Promise.all(trigger("paste"));
		isPasting = false;
	}
</script>

<!---
<style>
</style>

-->
<nav class="navbar" role="navigation" aria-label="main navigation">
	<div class="navbar-brand">
		<a class="navbar-item" href=".">
			<img src="/codebin-logo.png" width="140" height="40" alt="logo"/>
		</a>

		<span role="button" class="navbar-burger burger" aria-label="menu" aria-expanded={expandNav} on:click={() => expandNav = !expandNav}>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span> 
			<span aria-hidden="true"></span>
		</span>
	</div>

	<div class="navbar-menu" class:is-active={expandNav}>
		<div class="navbar-start">
			<a class="navbar-item" href=".">
				Create new paste
			</a>

			<a class="navbar-item" href="about">
				About
			</a>
		</div>

		<div class="navbar-end is-hidden-touch">
			<div class="navbar-item">
				<div class="buttons">
					<button class="button is-primary" class:is-loading={isPasting} on:click={paste}>
						Paste
					</button>
				</div>
			</div>
		</div>
	</div>
</nav>

<div class="mobile-buttons is-hidden-desktop">
	<button class="button is-primary" class:is-loading={isPasting} on:click={paste}>
		Paste
	</button>
</div>

<style lang="scss">
.mobile-buttons
{
	position: fixed;
	z-index: 10;
	bottom: 20px;
	right: 20px;
}
</style>