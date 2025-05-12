export async function getWeather(code: string) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${code}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`)
    const data = await response.json()
    return data
}
