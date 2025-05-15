<script lang="ts">
    import settings from '$lib/settings.json';
    import PageHeader from '$lib/components/PageHeader.svelte';
    import LocationList from '$lib/components/LocationList.svelte';
</script>

<svelte:head>
    <title>天気予報アプリ</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <PageHeader title="天気予報アプリ" />

    <main>
        <LocationList locations={settings.locations} />
    </main>
</div>
