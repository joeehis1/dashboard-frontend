export default function Description({
    description,
    highTemp,
    lowTemp,
    perceivedTemp,
}) {
    return (
        <div className="description text-dialog-normal">
            <p>{description}</p>
            {/* min temp/max temp */}
            <p>
                {highTemp} <sup>o</sup>/{lowTemp}
                <sup>o</sup>
            </p>
            <p>
                feels like {perceivedTemp} <sup>o</sup>
            </p>
        </div>
    );
}

//This component is part of the middle panel that shows the weather description perceived temperature and min and max temperature of that day
