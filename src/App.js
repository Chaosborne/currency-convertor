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
    fetch("https://www.cbr-xml-daily.ru/daily_json.js")
      .then((res) => res.json())
      .then((json) => {
        setRates(json.Valute);
        console.log(json.Valute);
      })
      .catch((err) => {
        console.warn(err);
        alert("Failed to get data");
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / rates[fromCurrency].Value;
    const result = price * rates[toCurrency].Value;
    setFromPrice(value);
    setToPrice(result);
  };
  const onChangeToPrice = (value) => {
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
