export default function ResetButton({ handleClick }) {
    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                handleClick();
            }}
            className="btn-refresh-weather btn-transparent btn-transperent-hovered-bg"
        >
            <i className="ri-refresh-line"></i>
        </button>
    );
}

//This button is used by the component that calls the api to get the current weather data after the initial load
