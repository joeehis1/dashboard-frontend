import Temperature from "../Temperature";
import Description from "./Description";

export default function MidPanel({
    temp,
    id,
    description,
    highTemp,
    lowTemp,
    perceivedTemp,
}) {
    return (
        <div className="middle">
            <Temperature temp={temp} id={id} />
            <Description
                description={description}
                highTemp={highTemp}
                lowTemp={lowTemp}
                perceivedTemp={perceivedTemp}
            />
        </div>
    );
}

//This component makes up the middle of the component that shows the current weather and the forecasted weather. It renders the temperture and the weather description
