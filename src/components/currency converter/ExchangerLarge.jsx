// //This component is not in use at this point.

// import { useEffect, useState } from "react";
// import CurrencySelect from "./CurrencySelect";
// import { getExchangeData, getCurrency } from "../../util";

// export default function ExchangerLarge({ currencyList }) {
//     const [currencyAmountFrom, setCurrencyAmountFrom] = useState(1);
//     const [currencyAmountTo, setCurrencyAmountTo] = useState(1);
//     //test
//     const [baseInputVal, setBaseInputVal] = useState("");
//     const [targetInputVal, setTargetInputVal] = useState("");

//     //test
//     const [conversionFactor, setConversionFactor] = useState(1);
//     const [date, setDate] = useState(new Date().toLocaleString());
//     const [baseCurrency, setBaseCurrency] = useState(
//         "United Arab Emirates Dirham"
//     );
//     const [baseChanged, setBaseChanged] = useState(false);

//     const [targetCurrency, setTargetCurrency] = useState(
//         "United Arab Emirates Dirham"
//     );

//     const [exchangeData, setExchangeData] = useState(null);
//     const [exchangeDataChanged, setExchangeDataChanged] = useState(false);

//     const [targetChanged, setTargetChanged] = useState(false);

//     // Change Handlers

//     function handleFromCurrencyChange(e) {
//         setBaseInputVal(e.target.value);
//         setTargetInputVal((e.target.value * conversionFactor).toFixed(2));
//     }

//     function handleToCurrencyChange(e) {
//         setTargetInputVal(e.target.value);
//         setBaseInputVal((e.target.value / conversionFactor).toFixed(2));
//     }

//     function handleBaseCurrencyOptionChange(e) {
//         setBaseCurrency(e.target.value);
//         setBaseChanged(true);
//     }

//     function handleTargetCurrencyOptionChange(e) {
//         setTargetCurrency(e.target.value);
//         setTargetChanged(true);
//     }

//     //This will run as soon as exchange data comes back from api
//     useEffect(() => {
//         if (exchangeData || exchangeDataChanged) {
//             setConversionFactor(exchangeData.info.rate);
//             setCurrencyAmountTo(exchangeData.info.rate);
//             setCurrencyAmountFrom(1);
//             setBaseInputVal(1);
//             setTargetInputVal(exchangeData.info.rate.toFixed(2));
//             setExchangeDataChanged(false);
//         }
//     }, [exchangeData, exchangeDataChanged]);

//     //This will run when any of the currency options change

//     useEffect(() => {
//         async function retrieveExchangeData(base, target, amount) {
//             try {
//                 const exchangeData = await getExchangeData(
//                     base,
//                     target,
//                     amount
//                 );
//                 setExchangeData(exchangeData);
//                 setDate(
//                     new Date(
//                         exchangeData.info.timestamp * 1000
//                     ).toLocaleString()
//                 );
//                 if (!exchangeDataChanged) setExchangeDataChanged(true);
//             } catch (error) {
//                 console.log(error.message);
//             }
//         }
//         if (baseChanged || targetChanged) {
//             console.log(baseCurrency, targetCurrency);
//             const baseCurrencyObject = getCurrency(currencyList, baseCurrency);
//             const targetCurrencyObject = getCurrency(
//                 currencyList,
//                 targetCurrency
//             );
//             retrieveExchangeData(
//                 baseCurrencyObject.symbol,
//                 targetCurrencyObject.symbol,
//                 1
//             );
//             setBaseChanged(false);
//             setTargetChanged(false);
//         }
//     }, [baseChanged, targetChanged]);

//     // This will run on load to update the currency options

//     return (
//         <>
//             <form className="exchanger exchanger-ls" action="">
//                 {/* This text will be dynamically generated */}
//                 <p className="currency-summary text-exchanger-lg">
//                     <span className="base text-exchanger-normal">
//                         {currencyAmountFrom} {baseCurrency} equals{" "}
//                     </span>
//                     <span className="target">
//                         {currencyAmountTo.toFixed(2)} {targetCurrency}
//                     </span>
//                 </p>
//                 {/* This date should be the date as at when the conversion data was generated */}
//                 <p className="currency-date text-exchanger-sm">{date}</p>
//                 <div className="calculator">
//                     <input
//                         type="number"
//                         name="currencyAmount"
//                         value={baseInputVal}
//                         min={1}
//                         onChange={handleFromCurrencyChange}
//                     />
//                     {currencyList.length && (
//                         <CurrencySelect
//                             currencyList={currencyList}
//                             handleChange={handleBaseCurrencyOptionChange}
//                             name={"base-currency"}
//                             value={baseCurrency}
//                         />
//                     )}
//                 </div>
//                 <div className="calculator">
//                     <input
//                         type="number"
//                         name="currencyAmount"
//                         value={targetInputVal}
//                         min={1}
//                         onChange={handleToCurrencyChange}
//                     />
//                     {currencyList.length && (
//                         <CurrencySelect
//                             currencyList={currencyList}
//                             handleChange={handleTargetCurrencyOptionChange}
//                             name={"target-currency"}
//                             value={targetCurrency}
//                         />
//                     )}
//                 </div>
//             </form>
//         </>
//     );
// }
