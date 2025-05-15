<script lang="ts">
    interface Location {
        code: string;
        name: string;
    }

    export let locations: Location[] = [];
</script>

<ul>
    {#each locations as location}
        <li><a href="/weather/{location.code}">{location.name}</a></li>
    {/each}
</ul>