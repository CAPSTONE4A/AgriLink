import { useState, useEffect } from 'react'
import { SectionHeading } from '../../components/SectionHeading'
import { FarmerNav } from '../../components/FarmerNav'
import { Cloud, Droplets, Wind, Thermometer, MapPin, RefreshCw } from 'lucide-react'

interface WeatherData {
  temperature: number
  humidity: number
  windSpeed: number
  weatherCode: number
  location: string
  forecast: {
    day: string
    temp: number
    weatherCode: number
  }[]
}

const weatherDescriptions: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  71: 'Slight snow',
  73: 'Moderate snow',
  75: 'Heavy snow',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
}

function getWeatherIcon(code: number): string {
  if (code === 0) return '☀️'
  if (code <= 3) return '⛅'
  if (code <= 48) return '🌫️'
  if (code <= 55) return '🌧️'
  if (code <= 65) return '🌧️'
  if (code <= 77) return '❄️'
  if (code <= 82) return '🌦️'
  if (code <= 86) return '🌨️'
  return '⛈️'
}

export default function FarmerWeatherPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null)
  const locationName = 'Laguna, Philippines'

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
        },
        () => {
          setLocation({ lat: 14.2167, lon: 121.25 })
        }
      )
    } else {
      setLocation({ lat: 14.2167, lon: 121.25 })
    }
  }, [])

  useEffect(() => {
    if (!location) return

    const fetchWeather = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia/Manila&forecast_days=7`
        )

        if (!response.ok) throw new Error('Weather data unavailable')

        const data = await response.json()

        const forecast = data.daily.time.map((date: string, index: number) => ({
          day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
          temp: Math.round((data.daily.temperature_2m_max[index] + data.daily.temperature_2m_min[index]) / 2),
          weatherCode: data.daily.weather_code[index],
        }))

        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          humidity: data.current.relative_humidity_2m,
          windSpeed: Math.round(data.current.wind_speed_10m),
          weatherCode: data.current.weather_code,
          location: locationName,
          forecast: forecast.slice(1, 6),
        })
      } catch (err) {
        setError('Failed to load weather data. Please try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [location, locationName])

  const refreshWeather = () => {
    if (location) {
      setLoading(true)
      setError(null)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <FarmerNav />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200/80 dark:border-slate-700 dark:bg-slate-800">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">Weather</p>
              <h1 className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">Hyper-local weather & rainfall alerts.</h1>
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <MapPin className="h-4 w-4" />
                <span>{weather?.location || locationName}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={refreshWeather}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </section>

        {error && (
          <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center dark:border-rose-700 dark:bg-rose-900/20">
            <p className="text-sm text-rose-600 dark:text-rose-300">{error}</p>
            <button
              type="button"
              onClick={refreshWeather}
              className="mt-3 rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
            >
              Retry
            </button>
          </div>
        )}

        {loading && !weather && (
          <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60 dark:border-slate-700 dark:bg-slate-800">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:border-slate-700 dark:bg-slate-700">
                  <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-600" />
                  <div className="mt-4 h-8 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-600" />
                </div>
              ))}
            </div>
          </section>
        )}

        {weather && !loading && (
          <>
            <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60 dark:border-slate-700 dark:bg-slate-800">
              <SectionHeading title="Current conditions" subtitle="Real-time weather data for your location." />
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:border-slate-700 dark:bg-slate-700">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Temperature</p>
                  </div>
                  <p className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">{weather.temperature}°C</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{weatherDescriptions[weather.weatherCode] || 'Unknown'}</p>
                </div>
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:border-slate-700 dark:bg-slate-700">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Humidity</p>
                  </div>
                  <p className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">{weather.humidity}%</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Relative humidity</p>
                </div>
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:border-slate-700 dark:bg-slate-700">
                  <div className="flex items-center gap-2">
                    <Wind className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Wind Speed</p>
                  </div>
                  <p className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">{weather.windSpeed} km/h</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">At 10m height</p>
                </div>
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:border-slate-700 dark:bg-slate-700">
                  <div className="flex items-center gap-2">
                    <Cloud className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Condition</p>
                  </div>
                  <p className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">{getWeatherIcon(weather.weatherCode)}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{weatherDescriptions[weather.weatherCode] || 'Unknown'}</p>
                </div>
              </div>
            </section>

            <section className="mt-10 rounded-[2.5rem] bg-white p-8 shadow-xl shadow-slate-200/60 dark:border-slate-700 dark:bg-slate-800">
              <SectionHeading title="5-day forecast" subtitle="Plan your farming activities ahead." />
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {weather.forecast.map((day) => (
                  <div key={day.day} className="rounded-2xl border border-slate-200 p-4 text-center dark:border-slate-700 dark:bg-slate-700">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{day.day}</p>
                    <p className="mt-2 text-2xl">{getWeatherIcon(day.weatherCode)}</p>
                    <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{day.temp}°C</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{weatherDescriptions[day.weatherCode]}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  )
}
