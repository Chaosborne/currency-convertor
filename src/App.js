import React, { useEffect, useState } from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  const [rates, setRates] = useState({});
  const [fromCurrency, setFromCurrency] = useState("AED");
  const [toCurrency, setToCurrency] = useState("AMD");
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);

  useEffect(() => {
    // fetch("https://www.cbr-xml-daily.ru/daily_json.js")
    fetch("https://www.cbr-xml-daily.ru/latest.js")
      .then((res) => res.json())
      .then((json) => {
        setRates(json.rates);
        console.log(json);
        console.log(json.rates);
      })
      .catch((err) => {
        console.warn(err);
        alert("Failed to get data");
      });
  }, []);

  const onChangeFromPrice = (value) => {
    console.log(rates[fromCurrency]);
    const price = value / rates[fromCurrency];
    const result = price * rates[toCurrency];
    setFromPrice(value);
    setToPrice(result);
  };
  const onChangeToPrice = (value) => {
    const result = (rates[fromCurrency] / rates[toCurrency]) * value;
    setFromPrice(result);
    setToPrice(value);
  };

  return (
    <div className="App">
      <Block value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice} />
      <Block value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice} />
    </div>
  );
}

export default App;
