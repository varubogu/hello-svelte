import { error } from '@sveltejs/kit';
import { locations } from '$lib/settings.json';
import type { WeatherApiResponse } from '$lib/types';
import { GET } from '../../api/weather/+server';

export async function load({ params, fetch }) {
    const code = params.code;
    const location = locations.find(location => location.code === code);
    if (!location) {
        throw error(404, { message: 'Not found' });
    }
    const response = await fetch(`/api/weather?q=${code}`);
    const data: WeatherApiResponse = await response.json();

    return {
        props: {
            weather: data,
            name: location.name
        }
    }
}

