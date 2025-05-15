import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import process from 'process';
import type { WeatherApiResponse } from '$lib/types';

/**
 * 天気データを取得するAPI
 * @param url
 * @returns
 */
export const GET: RequestHandler = async ({ url }) => {
  try {
    const location = url.searchParams.get('q');
    if (!location) {
      return new Response('場所が指定されていません', { status: 400 });
    }

    const weatherData = await getWeatherCache(location);
    if (!weatherData) {
      return new Response('天気データの取得に失敗しました', { status: 500 });
    }

    // 結果をキャッシュするためのヘッダーを設定
    return json(weatherData, {
      headers: {
        'Cache-Control': 'max-age=3600' // 1時間キャッシュ
      }
    });
  } catch (error) {
    console.error('Weather API error:', error);
    return new Response('サーバーエラーが発生しました', { status: 500 });
  }
};

async function getWeatherCache(locationCode: string): Promise<WeatherApiResponse> {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;

  if (!apiKey) {
    throw new Error('APIキーが設定されていません');
  }

  let weatherData: WeatherApiResponse;

  // キャッシュがある場合はキャッシュから取得


  // キャッシュがない場合は取得
  if (!weatherData) {
    weatherData = await _getWeather(locationCode);
  }

  return weatherData;
}

/**
 * OpenWeatherMapから天気データを取得する
 * @param code 場所のコード（Tokyoなど）
 * @returns 天気データのJSON
 */
async function _getWeather(locationCode: string): Promise<WeatherApiResponse> {
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const url = new URL(baseUrl);

    // クエリパラメータの設定
    url.searchParams.set('q', locationCode);
    url.searchParams.set('appid', import.meta.env.VITE_OPENWEATHER_API_KEY);
    url.searchParams.set('units', 'metric');
    url.searchParams.set('lang', 'ja');

    const response = await fetch(url);
    const data = await response.json();
    return data;
}



