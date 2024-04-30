import React, { useState } from "react";

const Weather = ({ weather, temp, time }) => {
  const [celcius, setCelcius] = useState(true);

  const changeValue = () => {
    setCelcius(!celcius);
  };

  return (
    <div className="bg-blue-900 bg-opacity-50 flex justify-center items-center mt-4 flex-col w-auto h-auto ml-6 mr-6 mb-auto" >
      <section className="flex flex-row gap-2 items-center justify-center m-2 p-2 sm:flex-row">
        <div className="flex flex-col sm:flex-row">
          <h1 className="text-gray-100 m-2 text-3xl">Hora actual:</h1>
          <p className="text-gray-100 m-2 text-2xl">
            {time.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="justify-center text-wrap text-gray-100 m-2 text-2xl  ">
            {weather?.name}, {weather?.sys.country}
          </p>

          <h2 className="justify-center text-wrap text-gray-100 m-2 text-4xl">
            {celcius ? `${temp?.celcius}ºC` : `${temp?.fahrenheit}ºF`}
          </h2>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center m-2 p-2">
        <img
          className="w-[6.25rem] h-[6.25rem] justify-center items-center "
          src={
            weather &&
            `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`
          }
          alt="weather icon"
        />

        <h3 className="font-Lato mt-2 p-2 uppercase text-gray-100 m-2 text-2xl">
          {weather?.weather[0].description}
        </h3>
      </section>

      <section className="">
        <ul className="">
          <li className="text-2xl font-sans text-gray-100 m-2 p-2 ">
            {" "}
            <span className=""> Wind Speed: </span> {weather?.wind.speed} m/s{" "}
          </li>
          <li className="text-2xl font-sans text-gray-100 m-2 p-2 ">
            {" "}
            <span className=""> Clouds: </span> {weather?.clouds.all} %{" "}
          </li>
          <li className="text-2xl font-sans text-gray-100 m-2 p-2 ">
            {" "}
            <span className=""> Pressure: </span> {weather?.main.pressure} hPa{" "}
          </li>
        </ul>
      </section>

      <button
        className="m-5 bg-gradient-to-r from-purple-400 to-blue-500 hover:from-purple-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce"
        onClick={changeValue}
      >
        Change to °{celcius ? "F" : "C"}
      </button>
    </div>
  );
};

export default Weather;
