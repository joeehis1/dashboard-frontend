import Location from "../Location";
import DateComponent from "../weather summary/DateComponent";

export default function TopPanel({ timeStamp, location }) {
    return (
        <div className="top">
            <Location location={location} />
            <DateComponent timeStamp={timeStamp} />
        </div>
    );
}

//This is responsible for showing the location and the date at the top most part of the weather detail
