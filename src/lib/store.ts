import { writable } from 'svelte/store';

export const weatherStore = writable({
    weather: null,
});



