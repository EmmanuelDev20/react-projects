import { useState, useEffect } from 'react'
import WeatherForm from './weatherForm'
import WeatherMainInfo from './weatherMainInfo'
import Loader from './loader'

import styles from './app.module.css'

export default function WeatherApp() {
  const [ weather, setWeather ] = useState(null)

  useEffect(() => {
    loadInfo()
  }, [])

  useEffect(() => {
    document.title = `Weather | ${ weather?.location.name ?? "" }`
  }, [weather])

  async function loadInfo( city = 'london') {
    try {
      const request = await fetch(`
      ${ process.env.REACT_APP_URL }&key=${ process.env.REACT_APP_KEY }&q=${ city }
      `)
      const json = await request.json()

      setTimeout(() => {
        setWeather(json)
      }, 2000)
    } catch (error) {}
  }

  function handleChangeCity( city ) {
    setWeather( null )
    loadInfo( city )
  }

  function LoadingInfo() {
    return (
      <WeatherMainInfo weather={ weather } />
    )
  }

  return (
  <div className={styles.weatherContainer}>
    <WeatherForm onChangeCity={ handleChangeCity } />
    { weather ? <LoadingInfo /> : <Loader />}
  </div>
  )
}