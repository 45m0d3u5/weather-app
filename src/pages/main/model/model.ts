import {createStore, createEvent, createEffect, sample, guard, restore } from 'effector-root';
import { fetchWeather } from '../../../api';
import { fetchImage } from '../../../api';
import {WeatherContract} from "./model.types";

export const getWeatherFx = createEffect({
    handler: fetchWeather
})

export const getImageFx = createEffect({
    handler: fetchImage
})

export const $weather = createStore<WeatherContract | null>(null)
export const cityChanged = createEvent<string>();
export const weatherSearched = createEvent<string>();
export const pageOpened = createEvent<any>();
export const $city = restore(cityChanged, 'New York')
export const $image = restore(getImageFx, 'url')

$weather
  .on(getWeatherFx.doneData, (_, payload) => {
    return { 
      ...payload,
      timezone: payload.timezone / 3600,
      main: {
        ...payload.main,
        temp: payload.main.temp - 273.15,
      }
    }
  })

sample({
  clock: guard({
    source: $city,
    clock: [weatherSearched, pageOpened],
    filter: (city) => city.length > 3
  }),
  source: $city,
  fn: (city) => city,
  target: [getWeatherFx, getImageFx]
})
