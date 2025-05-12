import { locations } from '$lib/settings.json';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const code = params.code;
    const location = locations.find(location => location.code === code);
    if (!location) {
        throw error(404, { message: 'Not found' });
    }
    // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${params.code}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`)
    // const data = await response.json()
    // return { data }
    return {
        props: {
            ariaCode: code
        }
    }
}