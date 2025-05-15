<script>
    import settings from '$lib/settings.json'
    import AriaList from './AriaList.svelte'
</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<AriaList locations={settings.locations} />
