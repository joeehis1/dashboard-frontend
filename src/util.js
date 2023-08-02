async function getExchangeData(base, target, amount) {
    try {
        const response = await fetch(
            `https://dashboard-backend-k56x.onrender.com/api/convert`,
            {
                method: "post",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ base, target, amount }),
            }
        );
        const data = await response.json();
        return data;
    } catch (error) {
        return error.message;
    }
}

async function fetchWeather(lat, long) {
    try {
        const response = await fetch(
            "https://dashboard-backend-k56x.onrender.com/current-weather",
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ lat, long }),
            }
        );
        const data = await response.json();
        return data;
    } catch (error) {
        return error.message;
    }
}

function getCurrentLocation() {
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                res(position);
            },
            (error) => {
                rej(error);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 30000,
                timeout: 27000,
            }
        );
    });
}

function returnTime(timestamp) {
    const date = new Date(timestamp * 1000); //timestamp in UTC
    const hours = date.getHours();
    const timeString = hours >= 0 && hours < 12 ? "a.m." : "p.m.";
    const displayedHours = hours > 12 ? hours - 12 : hours;
    return `${displayedHours} ${timeString}`;
}

function getCurrency(currencyList, country) {
    return currencyList.find((curr) => {
        return curr.country === country;
    });
}

function timerDisplay(num) {
    const mins = Math.floor(num / 60);
    const secs = num % 60;
    const displayedMins = mins < 10 ? `0${mins}` : mins;
    const displayedSecs = secs < 10 ? `0${secs}` : secs;
    const displayed = `${displayedMins}m ${displayedSecs}s`;
    return displayed;
}

export {
    getExchangeData,
    fetchWeather,
    getCurrentLocation,
    returnTime,
    getCurrency,
    timerDisplay,
};
