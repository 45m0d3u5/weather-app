import { createClient } from 'pexels';

const client = createClient('563492ad6f91700001000001f567bf7313f644c2abc32ce42c26b800');


export const fetchImage = (city) => {
    return new Promise((resolve, reject) => {
        client.photos.search({ query: city, page: 1, per_page: 1, orientation: 'landscape', locale: 'ru-RU' })
            .then((result) => {
                if (result.total_results < 1) reject('No results') 
                resolve(result.photos[0].src.landscape)
            })
            .catch(reject)
    })
}

export async function fetchWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=178466717560582ba04a996b6ce2c92a`);
    return response.json();
}
