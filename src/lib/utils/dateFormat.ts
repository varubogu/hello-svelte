/**
 * UNIXタイムスタンプを日本時間のフォーマットに変換する
 * @param timestamp UNIXタイムスタンプ（秒）
 * @returns フォーマットされた日付と時刻
 */
export function formatDate(timestamp: number): string {
    // UNIXタイムスタンプを日時に変換（ミリ秒単位）
    const date = new Date(timestamp * 1000);

    // 日本時間に調整（UTCからの時差 +9時間）
    const jpDate = new Date(date.getTime() + (9 * 60 * 60 * 1000));

    // フォーマット
    const year = jpDate.getUTCFullYear();
    const month = String(jpDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(jpDate.getUTCDate()).padStart(2, '0');
    const hours = String(jpDate.getUTCHours()).padStart(2, '0');
    const minutes = String(jpDate.getUTCMinutes()).padStart(2, '0');

    return `${year}/${month}/${day} ${hours}:${minutes}`;
}