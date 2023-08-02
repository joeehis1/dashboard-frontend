export default function Location({ location }) {
    return (
        <p className="location text-weather-summary-mid">
            <i className="ri-map-pin-2-fill"></i>
            <span>{location}</span>
        </p>
    );
}

//This is resposible for showing the location of the user
