import styles from './styles.module.scss';
import {Loader, Button, Weather, Input} from '../../../ui'
import {useEvent, useStore} from "effector-react";
import {$city, cityChanged, weatherSearched, getWeatherFx, $image, $weather, pageOpened} from "../model/model";
import {FC, useEffect, useRef} from "react";


export const Main: FC = () => {
  const city = useStore($city);
  const isWeatherLoading = useStore(getWeatherFx.pending);
  const url = useStore($image);
  const weather = useStore($weather);
  const date = new Date().toLocaleDateString();
  const mainRef = useRef<HTMLDivElement>(null);
  const handleWeatherSearch = useEvent(weatherSearched)

  useEffect(() => {
    pageOpened();
  }, [])

  useEffect(() => {
    if (!mainRef.current) return;

    mainRef.current.style?.setProperty('--image', `url(${url})`);

  },[city, url]);

  return (
    <div
      className={styles.MainPage} 
      ref={mainRef}
    >
      <div className={styles.Main}>
        <div className={styles.LeftContainer}>
          <div className={styles.LeftInner}>
            <div className={styles.Temp}> {weather && weather.main.temp ? (<span>{Math.round(weather.main.temp)}°</span>): null}
            </div>
            <div className={styles.CityDate}>
              <div>
                <span className={styles.City}>
                  {weather && weather.name}
                </span>
              </div>
              <span className={styles.Date}>{date}</span>
            </div>
          </div>
        </div>

        <div className={styles.RightContainer}>
          <div className={styles.InputContainer}>
            <div className={styles.InputCont}>
              <Input onChange={(e) => cityChanged(e.target.value)} value={city} />
            </div>
            <div className={styles.ButtonContainer}>
              {isWeatherLoading ? (
                <Loader />
              ) : (
                <Button
                    //@ts-ignore
                    onClick={handleWeatherSearch}
                />
              )}
            </div>
          </div>
          <div className={styles.WeatherInfo}>
          {weather && weather.main ? (<Weather clouds={weather.clouds.all} wind={weather.wind.speed} humidity={weather.main.humidity}/>) : (<span></span>)}
          </div>
        </div>
      </div>
    </div>
  );
};