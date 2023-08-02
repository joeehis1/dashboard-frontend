import { useEffect } from "react";

export default function Liveclock({ date, refreshDate }) {
    const timeStyle = new Intl.DateTimeFormat("en", {
        timeStyle: "short",
    });

    const match = timeStyle.format(date).match(/\d+:\d+/g);

    useEffect(() => {
        const interval = setInterval(refreshDate, 1000);
        return () => clearInterval(interval);
    }, [refreshDate]);
    return <p className="text-clock clock-face">{match[0]}</p>;
}
