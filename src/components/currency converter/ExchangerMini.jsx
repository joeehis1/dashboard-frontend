import { useState } from "react";
import CurrencySelect from "./CurrencySelect";
import { getExchangeData, getCurrency } from "../../util";

function LabelledCurrencySelect({
    labelfor,
    isShown,
    label,
    handleChange,
    value,
    name,
    currencyList,
    labelId,
    className,
}) {
    return (
        <div
            className={`currency-select-ss ${
                isShown ? "is-shown" : "is-hidden"
            }`}
        >
            <label className={className} htmlFor={labelfor}>
                {label}
            </label>
            <CurrencySelect
                currencyList={currencyList}
                handleChange={handleChange}
                value={value}
                name={name}
                id={labelId}
            />
        </div>
    );
}

function CurrencyValue({ value, handleChange, isShown }) {
    return (
        <div className={`currency-value ${isShown ? "is-shown" : "is-hidden"}`}>
            <label htmlFor="amount">Enter Amount:</label>
            <input
                type="number"
                name="amount"
                id="amount"
                min={0}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
}

export default function ExchangerMini({ currencyList }) {
    const [formData, setFormData] = useState({
        baseCurrency: "",
        targetCurrency: "",
        amount: "",
    });

    const [conversionShown, setConversionShown] = useState(false);

    const [exchangeData, setExchangeData] = useState(null);

    const [currentSelection, setCurrentSelection] = useState({
        base: false,
        target: false,
        value: false,
    });

    function handleBaseCurrencyChange(e) {
        setFormData((formData) => ({
            ...formData,
            baseCurrency: e.target.value,
        }));
        setCurrentSelection((selection) => ({
            ...selection,
            base: false,
            target: true,
        }));
    }

    function handleTargetCurrencyChange(e) {
        setFormData((formData) => ({
            ...formData,
            targetCurrency: e.target.value,
        }));
        setCurrentSelection((selection) => ({
            ...selection,
            target: false,
            value: true,
        }));
    }

    function handleAmountChange(e) {
        setFormData((formData) => ({
            ...formData,
            amount: Number(e.target.value),
        }));
    }

    function startConversion() {
        setCurrentSelection((selection) => ({
            ...selection,
            base: true,
        }));
    }

    function navigateBackwards() {
        if (exchangeData) {
            setExchangeData(null);
            setConversionShown(false);
            setFormData({
                baseCurrency: "",
                targetCurrency: "",
                amount: 0,
            });
            return setCurrentSelection({
                base: false,
                target: false,
                value: false,
            });
        }
        if (currentSelection.value) {
            setFormData((formData) => ({
                ...formData,
                targetCurrency: "",
                amount: 0,
            }));
            return setCurrentSelection((selection) => ({
                ...selection,
                value: false,
                target: true,
            }));
        }
        if (currentSelection.target) {
            setFormData((formData) => ({
                ...formData,
                baseCurrency: "",
            }));
            return setCurrentSelection((selection) => ({
                ...selection,
                target: false,
                base: true,
            }));
        }
        if (currentSelection.base) {
            setFormData(() => ({
                baseCurrency: "",
                targetCurrency: "",
                amount: 0,
            }));
            return setCurrentSelection((selection) => ({
                ...selection,
                base: false,
            }));
        }
    }

    async function convertCurrency(e) {
        e.preventDefault();
        console.log(formData);
        const baseObject = getCurrency(currencyList, formData.baseCurrency);
        const targetObject = getCurrency(currencyList, formData.targetCurrency);
        console.log(baseObject.symbol, targetObject.symbol);
        try {
            const exchangeData = await getExchangeData(
                baseObject.symbol,
                targetObject.symbol,
                formData.amount
            );
            setExchangeData(exchangeData);
        } catch (error) {
            console.log(error);
        }
        setConversionShown(true);
        setCurrentSelection((selection) => ({
            ...selection,
            value: false,
        }));
    }

    return (
        <>
            <form
                className="exchanger exchanger-ss text-dialog-normal"
                action=""
                onSubmit={convertCurrency}
            >
                <h3>Currency Converter</h3>
                {!currentSelection.base &&
                    !currentSelection.target &&
                    !currentSelection.value &&
                    !conversionShown && (
                        <button type="button" onClick={startConversion}>
                            Start Conversion
                        </button>
                    )}
                {(currentSelection.base ||
                    currentSelection.target ||
                    currentSelection.value ||
                    conversionShown) && (
                    <button onClick={navigateBackwards} type="button">
                        Previous
                    </button>
                )}
                {currencyList.length && (
                    <LabelledCurrencySelect
                        label="Select currency to convert from: "
                        labelfor={"base-currency"}
                        handleChange={handleBaseCurrencyChange}
                        value={formData.baseCurrency}
                        name="base-currency"
                        currencyList={currencyList}
                        labelId="base-currency"
                        isShown={currentSelection.base === true}
                        className={"base-label"}
                    />
                )}
                {currencyList.length && (
                    <LabelledCurrencySelect
                        label="Select currency to convert to: "
                        labelfor={"target-currency"}
                        handleChange={handleTargetCurrencyChange}
                        value={formData.targetCurrency}
                        name="target-currency"
                        currencyList={currencyList}
                        labelId="target-currency"
                        isShown={currentSelection.target === true}
                        className={"target-label"}
                    />
                )}
                <CurrencyValue
                    value={formData.amount}
                    handleChange={handleAmountChange}
                    isShown={currentSelection.value === true}
                />
                {currentSelection.value === true && <button>Convert</button>}
                {exchangeData && (
                    <p className="conversion text-dialog-mid">
                        {formData.amount} {formData.baseCurrency} equals{" "}
                        {exchangeData.result.toFixed(2)}{" "}
                        {formData.targetCurrency}
                    </p>
                )}
            </form>
        </>
    );
}
