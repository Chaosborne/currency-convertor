import React, { useEffect, useRef, useState } from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  const [fromCurrency, setFromCurrency] = useState("CAD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);

  // const [rates, setRates] = useState({});
  const ratesRef = useRef({});

  useEffect(() => {
    // fetch("https://www.cbr-xml-daily.ru/daily_json.js")
    fetch("https://www.cbr-xml-daily.ru/latest.js")
      .then((res) => res.json())
      .then((json) => {
        // setRates(json.rates);
        ratesRef.current = json.rates;
        onChangeToPrice(1);
      })
      .catch((err) => {
        console.warn(err);
        alert("Failed to get data");
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToPrice(result.toFixed(3));
    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    if (!ratesRef.current[fromCurrency] || !ratesRef.current[toCurrency]) {
      return;
    }

    const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;

    if (isNaN(result)) {
      return;
    }

    setFromPrice(result.toFixed(3));
    setToPrice(value);
  };

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  return (
    <div className="App">
      <Block value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice} />
      <Block value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice} />
    </div>
  );
}

export default App;
