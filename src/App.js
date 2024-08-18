import { useState, useEffect } from "react";

export default function App() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [output, setOutput] = useState("");

  useEffect(
    function () {
      async function fetchCurrencyConversionInfo() {
        if (!amount || isNaN(amount)) return;
        if (fromCurrency === toCurrency) {
          setOutput(amount);
          return;
        }
        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
          );
          if (!res.ok) throw new Error("Something went wrong...");
          const data = await res.json();
          setOutput(data.rates[toCurrency] * amount);
        } catch (err) {
          console.error(err.message);
          setOutput("Error");
        }
      }
      fetchCurrencyConversionInfo();

      return () => {
        setOutput("");
      };
    },
    [amount, fromCurrency, toCurrency]
  );

  function handleNewAmount(e) {
    setAmount(e.target.value);
  }

  function handleOnChangeFrom(e) {
    setFromCurrency(e.target.value);
  }

  function handleOnChangeTo(e) {
    setToCurrency(e.target.value);
  }
  return (
    <div>
      <input type="text" value={amount} onChange={handleNewAmount} />
      <select onChange={handleOnChangeFrom} value={fromCurrency}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select onChange={handleOnChangeTo} value={toCurrency}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {toCurrency}: {output}
      </p>
    </div>
  );
}
