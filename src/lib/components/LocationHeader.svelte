<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { locations } from '$lib/settings.json';

    export let locationName: string;

    let selectedLocation = locationName;

    function handleLocationChange() {
        const location = locations.find(loc => loc.name === selectedLocation);
        if (location) {
            goto(`/weather/${location.code}`);
        }
    }
</script>

<div class="mb-6">
    <div class="flex items-center mb-2">
        <a href="/" class="text-blue-600 hover:text-blue-800 mr-2">
            ← ホームに戻る
        </a>
    </div>
    <div class="flex items-center">
        <h2 class="text-2xl font-bold text-gray-800 mr-2">
            <select
                bind:value={selectedLocation}
                on:change={handleLocationChange}
                class="bg-white border border-gray-300 rounded px-2 py-1 text-gray-800 font-bold text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {#each locations as location}
                    <option value={location.name}>{location.name}</option>
                {/each}
            </select>
            の天気予報
        </h2>
    </div>
</div>