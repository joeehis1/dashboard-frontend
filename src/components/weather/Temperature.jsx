export default function Temperature({ temp, id }) {
    return (
        <p className="temp text-weather-summary-lg">
            <i className={`wi wi-owm-${id}`}></i>
            <span>
                {temp}
                <sup>o</sup>
            </span>
        </p>
    );
}

//This component displays the temperature and displays a different icon depending on the weather condition
