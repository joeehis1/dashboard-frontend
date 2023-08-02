import DateComponent from "./DateComponent";
import ResetButton from "./ResetButton";

export default function ResetWeather({ timeStamp, reloadWeather }) {
    return (
        <p className="date text-weather-summary-sm ">
            <DateComponent timeStamp={timeStamp} />
            <ResetButton handleClick={reloadWeather} />
        </p>
    );
}

//This displays the date in the weather summary component and has the reset button
