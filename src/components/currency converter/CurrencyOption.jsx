export default function CurrencyOption({ currencySymbol }) {
    return (
        <option value={currencySymbol.country}>{currencySymbol.country}</option>
    );
}
