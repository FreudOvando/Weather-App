import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Weather from "../src/component/Weather.jsx";

function App() {
  //we obtain the coords first

  const [coords, setCoords] = useState();
  const [temp, setTemp] = useState();
  const [isLoading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowMessage(true);
    }, 3000);

    const error = () => {
      setHasError(true);
      setLoading(false);
    };

    const success = (pos) => {
      setCoords({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      });
    };

    navigator.geolocation.getCurrentPosition(success);
  }, []);

  //second we use the value of coords and concat the lat and lon also add the url then set the weather in state

  const [weather, setWeather] = useState();

  useEffect(() => {
    if (coords) {
      const apiKey = "cd5bb39bbdd1d3487fc39fe983c7a423";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`;

      axios
        .get(url)
        .then((result) => {
          console.log(result.data);
          setWeather(result.data);
          const celcius = (result.data.main.temp - 273).toFixed(1);
          const fahrenheit = ((celcius * 9) / 5 + 32).toFixed(1);
          setTemp({ celcius, fahrenheit });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [coords]);

  return (
    <div className="flex justify-center items-center ">
      
      {
      isLoading 
      ? 
      (
        <article className="flex justify-center flex-col items-center mt-[200px]">
          <div className="flex flex-row gap-2">
            <div className="w-10 h-10 rounded-full bg-blue-700 animate-bounce"></div>
            <div className="w-10 h-10 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-10 h-10 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
          </div>
          {
          showMessage 
          && 
          (
            <p className="text-wrap text-justify text-slate-300 text-3xl mt-6 ">
              ❌Please active or allow access to location❌
            </p>
          )}
        </article>
      ) 
      :
       hasError ? (
        <article className="mt-10 flex justify-center items-center">
          <div className="error w-320 p-12 flex flex-row items-center justify-start bg-red-600 rounded-lg shadow-md">
            <svg
              className="error__icon w-20 h-20 -translate-y-2 mr-8"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#fff"
                d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm1.25 15.75a.75.75 0 01-1.06 0L10 14.06l-1.19 1.19a.75.75 0 01-1.06-1.06L8.94 13l-1.19-1.19a.75.75 0 111.06-1.06L10 11.94l1.19-1.19a.75.75 0 011.06 1.06L11.06 13l1.19 1.19a.75.75 0 010 1.06z"
              />
            </svg>

            <p className="error__title font-semibold text-white text-base">
              Please, allow access to your location
            </p>

            <svg
              className="error__close w-20 h-20 cursor-pointer ml-auto"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#fff"
                d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm1.25 15.75a.75.75 0 01-1.06 0L10 14.06l-1.19 1.19a.75.75 0 01-1.06-1.06L8.94 13l-1.19-1.19a.75.75 0 111.06-1.06L10 11.94l1.19-1.19a.75.75 0 011.06 1.06L11.06 13l1.19 1.19a.75.75 0 010 1.06z"
              />
            </svg>
          </div>
        </article>
      ) : (
        <div>
          <Weather weather={weather} temp={temp} time={time} />
        </div>
      )
      
      }
    </div>
  );
}

export default App;
