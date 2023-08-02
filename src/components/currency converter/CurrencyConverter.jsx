import { useEffect } from "react";
import { useState } from "react";
import ExchangerMini from "./ExchangerMini";

export default function CurrencyConverter() {
    const [currencyList, setCurrencyList] = useState([]);

    useEffect(() => {
        async function getCurrencyList() {
            const response = await fetch(
                "https://dashboard-backend-k56x.onrender.com/api/currency-list"
            );
            const data = await response.json();
            setCurrencyList(data);
        }
        getCurrencyList();
    }, []);
    return (
        <div className="converter">
            <ExchangerMini currencyList={currencyList} />
        </div>
    );
}
