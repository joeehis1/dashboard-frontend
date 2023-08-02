import CurrencyOption from "./CurrencyOption";

export default function CurrencySelect({
    currencyList,
    handleChange,
    value,
    name,
    id,
}) {
    return (
        <select name={name} value={value} id={id} onChange={handleChange}>
            <option disabled value="">
                --Select a Currency--
            </option>
            {currencyList.map((currency) => {
                return (
                    <CurrencyOption
                        key={currency.symbol}
                        currencySymbol={currency}
                    />
                );
            })}
        </select>
    );
}
