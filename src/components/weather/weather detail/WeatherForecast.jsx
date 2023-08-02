import ForecastItem from "./ForecastItem";

export default function WeatherForeCast({ forecastData }) {
    return (
        <ul className="reset-list forecast bottom text-dialog-mid">
            {forecastData.list.slice(0, 5).map((weatherObj) => {
                return (
                    <ForecastItem
                        key={weatherObj.dt_txt}
                        forecastedTimestamp={weatherObj.dt}
                        forecastWeatherId={weatherObj.weather[0].id}
                        forecastHumidity={weatherObj.main.humidity}
                    />
                );
            })}
        </ul>
    );
}
