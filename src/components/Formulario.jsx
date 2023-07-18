import axios from "axios";
import { useEffect, useState } from "react";

const Formulario = () => {
  
  //Rates API
  const [rate, setRate] = useState({})

  // Estados del Formulario
  const [inputValue, setInputValue] = useState("1.00");
  // Estado de validación (Error)
  const [errorMessage, setErrorMessage] = useState("");
  const [rateFrom, setRateFrom] = useState("USD")
  const [rateTo, setRateTo] = useState("EUR");   

  // Effect para llamado de API
  useEffect(() => {
    const obtenerMoneda = async () => {
      const url = `https://api.vatcomply.com/rates`;
      try {
        const response = await axios.get(url);
        const rates = response.data.rates;
        setRate(rates);
      } catch (error) {
        console.error(error);
      }
    };
  
    obtenerMoneda();
  }, []);  

  const handleInputChange = (e) => {
    const value = e.target.value;
  
    if (isNaN(value) || parseFloat(value) <= 1) {
      setErrorMessage("You can only use numbers greater than 1");
    } else {
      setErrorMessage("");
      setInputValue(value);
    }
  };
  
  const handleRateFromChange = (e) => {

    setRateFrom(e.target.value);
  };

  const handleRateToChange = (e) => {
    
    setRateTo(e.target.value);
  };  

  const handleCurrencyConversion = () => {
    const rateFromValue = rate[rateFrom];
    const rateToValue = rate[rateTo];
  
    // Verificar si los valores son números válidos
    if (isNaN(rateFromValue) || isNaN(rateToValue)) {
      return "Invalid conversion rates";
    }
  
    const convertedValue = (parseFloat(inputValue) / rateFromValue) * rateToValue;
    return convertedValue.toFixed(6);
  };

  return (
    <div className="relative flex justify-center">
      <div className="bg-white w-[85%] sm:w-[1126px] h-auto z-10 absolute top-[-100px]  sm:top-[-140px] rounded-lg shadow-lg">
        <form className="grid grid-cols-1 sm:grid-cols-3 grid-rows-6 sm:grid-rows-2 w-full align-items-center pt-8 px-8">
          <label className="grid col-span-1 sm:col-span-1 sm:row-start-1 font-medium pt-4 sm:pt-0 pb-4 sm:pb-0">Amount</label>
          <input
            className="grid row-start-2 sm:row-start-2 rounded-md py-2 px-2 border font-medium w-full sm:w-[80%]"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />          
          <label className="grid col-span-1 sm:col-span-1 row-start-3 sm:row-start-1 font-medium pt-4 sm:pt-0 pb-4 sm:pb-0">From</label>
          <select value={rateFrom} className="grid row-start-4 sm:row-start-2 rounded-md py-2 px-2 border font-medium w-full sm:w-[80%]" 
            onChange={handleRateFromChange}>
            
            {Object.keys(rate).map((currency, index) => (
              <option key={index} value={currency}>
                {currency}
              </option>
            ))}
          </select>          
          <label className="grid col-span-1 sm:col-span-1 row-start-5 sm:row-start-1 font-medium pt-4 sm:pt-0 pb-4 sm:pb-0">To</label>
          <select value={rateTo} className="grid col-span-1 sm:row-start-2 row-span-6 rounded-md py-2 px-2 border font-medium w-full sm:w-[80%]" 
            onChange={handleRateToChange}>
          {Object.keys(rate).map((currency, index) => (
              <option key={index} value={currency}>{currency}</option>
            ))}
          </select>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-3">        
        <h3 className="grid col-start-1 text-3xl font-semibold pt-8 ml-8">
            {`${handleCurrencyConversion()} ${rateTo}`}  = <br /> {`${inputValue} ${rateFrom}`}
        </h3>
        <p className="grid row-start-2 text-gray-700 pt-6 ml-8">{`${inputValue} ${rateFrom}`} = {`${handleCurrencyConversion()} ${rateTo}`}</p>
          {errorMessage && (
            <p className="font-bold text-sm uppercase pl-8 text-red-600 row-start-3 col-start-1">{errorMessage}</p>
          )}
        <div className="grid col-start-1 sm:col-start-2 row-start-3 sm:row-start-2 w-[85%] bg-lightBlueSecondary rounded-lg px-4 py-6 text-sm hidden sm:block">
            <p>
                We use the mid-market rate for our Converter. This is for informational purposes only.
                 You won’t receive this rate when sending money.
            </p>
        </div>

        <p className="grid col-start-1 sm:col-start-2 sm:row-start-3 text-gray-800 sm:text-end text-center text-xs sm:text-sm pt-0 sm:pt-4 pr-0 sm:pr-20">
          Euro to US Dollar conversion — Last updated Dec 15, 2022, 19:17 UTC
          </p>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
