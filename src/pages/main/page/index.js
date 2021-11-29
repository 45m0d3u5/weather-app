import styles from "./styles.module.scss";
import { Input } from "../../../components/input";
import { Button } from "../../../components/button";
import { Weather } from "../../../components/weather";
import { useStore } from "effector-react";
import { $city, cityChanged, weatherSearched, getWeatherFx, $image, $weather } from "../model/model";
import { Loader } from "../../../components/loader";
import { useEffect, useRef } from "react";


export const Main = () => {
  const city = useStore($city);
  const isWeatherLoading = useStore(getWeatherFx.pending);
  const url = useStore($image);
  const weather = useStore($weather);
  const date = new Date().toLocaleDateString();
  const mainRef = useRef();

  useEffect(() => {
    if (!mainRef.current) return;
    mainRef.current.style.setProperty('--image', `url(${url})`);
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
              <span className={styles.Date}>{date} </span>
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
                <Button onClick={weatherSearched} title="Get Weather" />
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