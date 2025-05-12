<script>
    import settings from '$lib/settings.json'
</script>

<ul>
    {#each settings.locations as locations}
        <li><a href="/weather/{locations.code}">{locations.name}</a></li>
    {/each}
</ul>