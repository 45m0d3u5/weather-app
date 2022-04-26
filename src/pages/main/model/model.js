import {createStore, createEvent, createEffect, sample, guard, restore } from 'effector-root';
import { fetchWeather } from '../../../api';
import { fetchImage } from '../../../api';

export const getWeatherFx = createEffect({
    handler: fetchWeather
})

export const getImageFx = createEffect({
    handler: fetchImage
})

export const $weather = createStore(null)
export const cityChanged = createEvent();
export const weatherSearched = createEvent();
export const imageSearched = createEvent();
export const pageOpened = createEvent();
export const $city = restore(cityChanged, 'Hawaii')
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
  .watch(console.log)

sample({
  clock: guard({
    source: $city,
    clock: weatherSearched,
    filter: (city) => city.length > 3
  }),
  source: $city,
  fn: (city) => city,
  target: [getWeatherFx, getImageFx]
})

