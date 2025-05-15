<script lang="ts">
    import type { ListItem } from '$lib/types';
    import { formatDate } from '$lib/utils/dateFormat';

    export let weatherItems: ListItem[] = [];
</script>

<div class="overflow-x-auto">
    <table class="min-w-full bg-white border border-gray-200">
        <thead class="bg-gray-100">
            <tr>
                <th class="py-3 px-4 text-left border-b">日付</th>
                <th class="py-3 px-4 text-left border-b">天気</th>
                <th class="py-3 px-4 text-left border-b">気温</th>
            </tr>
        </thead>
        <tbody>
            {#each weatherItems as item}
                <tr class="hover:bg-gray-50">
                    <td class="py-2 px-4 border-b">{formatDate(item.dt)}</td>
                    <td class="py-2 px-4 border-b flex items-center">
                        <img
                            src="https://openweathermap.org/img/wn/{item.weather[0].icon}.png"
                            alt={item.weather[0].description}
                            class="w-10 h-10 mr-2"
                        />
                        {item.weather[0].description}
                    </td>
                    <td class="py-2 px-4 border-b">{Math.round(item.main.temp)}°C</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>