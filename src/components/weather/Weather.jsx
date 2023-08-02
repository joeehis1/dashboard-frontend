import { useEffect, useRef, useState } from "react";
import { fetchWeather, getCurrentLocation } from "../../util";

import WeatherSummary from "./weather summary/WeatherSummary";
import WeatherDetail from "./weather detail/WeatherDetail";

export default function Weather() {
    const [weatherData, setWeatherData] = useState(null);
    const [isShown, setIsShown] = useState(false);
    const weatherDetailRef = useRef(null);

    function showDetail() {
        setIsShown((bool) => !bool);
    }

    async function getWeatherData() {
        try {
            const location = await getCurrentLocation();

            try {
                const weather = await fetchWeather(
                    location.coords.latitude,
                    location.coords.longitude
                );
                setWeatherData(weather);
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    //Get weather and update every hour

    useEffect(() => {
        getWeatherData();
        const weatherInterval = setInterval(() => {
            console.log("Weather changed");
            getWeatherData();
        }, 3.6e6);
        return () => clearInterval(weatherInterval);
    }, []);

    //Use effect to hide weather when you press escape and on click outside
    //WeatherDetailRef is forwarded

    useEffect(() => {
        function handleClickOutside(e) {
            if (
                weatherDetailRef.current &&
                isShown &&
                !weatherDetailRef.current.contains(e.target)
            ) {
                setIsShown(false);
            }
        }

        function handleKeyPressEsc(e) {
            if (e.key === "Escape") {
                setIsShown(false);
            }
        }
        document.addEventListener("click", handleClickOutside);
        window.addEventListener("keydown", handleKeyPressEsc);

        return () => {
            document.removeEventListener("click", handleClickOutside);
            window.removeEventListener("keydown", handleKeyPressEsc);
        };
    }, [isShown]);

    return (
        <div className="weather">
            {weatherData && (
                <WeatherSummary
                    displayDetail={showDetail}
                    weather={weatherData}
                    reloadWeather={getWeatherData}
                />
            )}
            {isShown && weatherData && (
                <WeatherDetail
                    ref={weatherDetailRef}
                    weatherData={weatherData}
                />
            )}
        </div>
    );
}
