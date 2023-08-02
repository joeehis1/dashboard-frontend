import Temperature from "../Temperature";
import Location from "../Location";
import ResetWeather from "./ResetWeather";

export default function WeatherSummary({
    weather,
    reloadWeather,
    displayDetail,
}) {
    const [currentWeather] = weather;
    return (
        <div
            className="weather-summary"
            onClick={(e) => {
                e.stopPropagation();
                displayDetail();
            }}
        >
            <Temperature
                temp={currentWeather.main.temp}
                id={currentWeather.weather[0].id}
            />
            <Location location={currentWeather.name} />
            <ResetWeather
                timeStamp={currentWeather.dt}
                reloadWeather={reloadWeather}
            />
        </div>
    );
}
