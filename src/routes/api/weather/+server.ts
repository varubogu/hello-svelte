import { json } from '@sveltejs/kit';
import { OPENWEATHER_API_KEY, CACHE_TTL_MILISEC } from '$env/static/private';
import type { RequestHandler } from './$types';
import type { WeatherApiResponse, WeatherCache } from '$lib/types';
import { kv } from '$lib/KeyValueStore';

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

    const weatherData = await _getWeatherCache(location);
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

async function _getWeatherCache(locationCode: string): Promise<WeatherApiResponse> {
  const now = new Date();
  const cachedData = await kv.get(locationCode);
  if (cachedData) {
    const cachedDataJson: WeatherCache = JSON.parse(cachedData);
    if (cachedDataJson.expires > Date.now()) {
      return cachedDataJson.response;
    }
  }

  // キャッシュがないか期限切れの場合は新しく取得
  const apiKey = OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error('APIキーが設定されていません');
  }

  const weatherResponse = await _getWeatherAPI(locationCode, apiKey);
  const expires = await _calcExpireDate(now, parseInt(CACHE_TTL_MILISEC));

  const weatherData: WeatherCache = {
    response: weatherResponse,
    expires,
  }

  // キャッシュに保存
  kv.put(locationCode, JSON.stringify(weatherData));

  return weatherResponse;
}

/**
 * OpenWeatherMapから天気データを取得する
 * @param locationCode 場所のコード（Tokyoなど）
 * @param apiKey APIキー
 * @returns 天気データのJSON
 */
async function _getWeatherAPI(locationCode: string, apiKey: string): Promise<WeatherApiResponse> {
    // 5日間予報APIのURL
    const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    const url = new URL(baseUrl);

    // クエリパラメータの設定
    url.searchParams.set('q', locationCode);
    url.searchParams.set('appid', apiKey);
    url.searchParams.set('units', 'metric');
    url.searchParams.set('lang', 'ja');

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
}

/**
 * キャッシュの有効期限を計算する
 * @param now 現在の日時
 * @param ttl キャッシュの有効期間（ミリ秒）
 * @returns 有効期限
 */
async function _calcExpireDate(now: Date, ttl: number): Promise<number> {
  const nowTime = now.getTime();
  const nextExpireDiff = ttl - (nowTime % ttl);
  const expireDate = new Date(nowTime + nextExpireDiff);
  return expireDate.getTime();
}

