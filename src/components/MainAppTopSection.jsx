import CurrencyConverter from "./currency converter/CurrencyConverter";

import Weather from "./weather/Weather";

export default function MainAppTopSection() {
    return (
        <div className="container">
            <section className="app-top">
                <CurrencyConverter />
                <Weather />
            </section>
        </div>
    );
}
