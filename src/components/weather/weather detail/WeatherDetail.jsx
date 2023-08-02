import TopPanel from "./TopPanel";
import MidPanel from "./MidPanel";
import WeatherForeCast from "./WeatherForecast";
import { forwardRef } from "react";

const WeatherDetail = forwardRef(({ weatherData }, ref) => {
    //Need to place the full weather object from backend in here
    const [currentWeather, forecast] = weatherData;

    return (
        <div ref={ref} className="weather-detail">
            <TopPanel
                timeStamp={currentWeather.dt}
                location={currentWeather.name}
            />
            <MidPanel
                temp={Math.round(currentWeather.main.temp)}
                id={currentWeather.weather[0].id}
                description={currentWeather.weather[0].description}
                highTemp={Math.round(currentWeather.main.temp_max)}
                lowTemp={Math.round(currentWeather.main.temp_min)}
                perceivedTemp={Math.round(currentWeather.main.feels_like)}
            />
            <WeatherForeCast forecastData={forecast} />
        </div>
    );
});

WeatherDetail.displayName = "WeatherDetail";
export default WeatherDetail;
//This makes up the entire weather detail component
