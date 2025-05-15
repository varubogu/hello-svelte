<script lang="ts">
    interface Location {
        code: string;
        name: string;
    }

    export let locations: Location[] = [];
</script>

<section>
    <h2 class="text-xl font-semibold mb-4">地域を選択</h2>
    <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {#each locations as location}
            <li>
                <a
                    href="/weather/{location.code}"
                    class="block p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200 text-center"
                >
                    {location.name}
                </a>
            </li>
        {/each}
    </ul>
</section>