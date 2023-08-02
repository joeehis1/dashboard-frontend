import { returnTime } from "../../../util";

export default function ForecastItem({
    forecastedTimestamp,
    forecastWeatherId,
    forecastHumidity,
}) {
    return (
        <li className="forecast-item text-dialog-normal">
            <span>{returnTime(forecastedTimestamp)}</span>
            <i className={`wi wi-owm-${forecastWeatherId}`}></i>
            <p>
                <i className="ri-drop-line"></i>
                {forecastHumidity}%
            </p>
        </li>
    );
}

//This component is a list item that is used to display the weather forecast
