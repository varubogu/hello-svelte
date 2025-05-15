import { error } from '@sveltejs/kit';
import { locations } from '$lib/settings.json';
import type { WeatherApiResponse } from '$lib/types';

/**
 * 天気情報のロード処理
 */
export async function load({ params, fetch }) {
    const code = params.code;
    const location = locations.find(location => location.code === code);

    // 指定された地域が存在しない場合は404エラー
    if (!location) {
        throw error(404, { message: '指定された地域が見つかりません' });
    }

    try {
        // APIから天気データを取得
        const response = await fetch(`/api/weather?q=${code}`);

        if (!response.ok) {
            throw error(response.status, { message: 'APIエラーが発生しました' });
        }

        const data: WeatherApiResponse = await response.json();

        return {
            props: {
                weather: data,
                name: location.name
            }
        };
    } catch (err) {
        console.error('Error fetching weather data:', err);
        throw error(500, { message: '天気データの取得中にエラーが発生しました' });
    }
}

