<script lang="ts">
    import PageHeader from '$lib/components/PageHeader.svelte';
    import LocationHeader from '$lib/components/LocationHeader.svelte';
    import WeatherData from '$lib/components/WeatherData.svelte';
    import ErrorDisplay from '$lib/components/ErrorDisplay.svelte';

    export let data;
</script>

<svelte:head>
    <title>{data.props.name}の天気予報 | 天気予報アプリ</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <PageHeader title="天気予報アプリ" />

    <main>
        {#if data.props.weather.cod === "200"}
            <LocationHeader locationName={data.props.name} />
            <WeatherData weatherItems={data.props.weather.list} />
        {:else}
            <ErrorDisplay
                statusCode={parseInt(data.props.weather.cod)}
                message={data.props.weather.message || 'データの取得に失敗しました'}
            />
        {/if}
    </main>
</div>