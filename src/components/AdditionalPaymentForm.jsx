import React, { useEffect, useState, useRef, useContext } from "react";

import { loaninputValues } from "../App";
import { calculateMortgagePayoff } from "../calculations/recomendation";

const AdditionalPaymentForm = ({setRecomendationValues}) => {
  const formValues = useContext(loaninputValues);
 

  
  const {loanAmount, rate, loanDuration, downPaymentPercent} = formValues;

 

  const [inputValues, setInputValues] = useState({
    Percentage: 0,
    interval: 0,
  });

  useEffect(() => {
    
    const loanAmountRanges = [
      { min: 1000, max: 10000, values: { Percentage: 20, interval: parseInt(loanDuration / 5) } },
      { min: 10001, max: 50000, values: { Percentage: 15, interval: parseInt(loanDuration / 5) } },
      { min: 50001, max: 100000, values: { Percentage: 6, interval: parseInt(loanDuration / 5) } },
      { min: 100001, max: 200000, values: { Percentage: 5.9, interval: parseInt(loanDuration / 7) } },
      { min: 200001, max: 300000, values: { Percentage: 5.5, interval: parseInt(loanDuration / 9) } },
      { min: 300001, max: 400000, values: { Percentage: 4.5, interval: parseInt(loanDuration / 10) } },
      { min: 400001, max: 500000, values: { Percentage: 3.5, interval: parseInt(loanDuration / 11) } },
      { min: 500001, max: 600000, values: { Percentage: 2.5, interval: parseInt(loanDuration / 12) } },
      { min: 600001, max: 700000, values: { Percentage: 1.5, interval: parseInt(loanDuration / 13) } },
      { min: 700001, max: 800000, values: { Percentage: 0.2, interval: parseInt(loanDuration / 5) } },
      { min: 800001, max: 900000, values: { Percentage: 1.3, interval: parseInt(loanDuration / 15) } },
      { min: 900001, max: 1000000, values: { Percentage: 1.2, interval: parseInt(loanDuration / 16) } },
      { min: 1000001, max: 1100000, values: { Percentage: 1.1, interval: parseInt(loanDuration / 17) } },
      { min: 1100001, max: 1200000, values: { Percentage: 0.9, interval: parseInt(loanDuration / 18) } },
      { min: 1200001, max: 1300000, values: { Percentage: 0.9, interval: parseInt(loanDuration / 19 ) } },
      { min: 1300001, max: 1400000, values: { Percentage: 0.7, interval: parseInt(loanDuration / 20) } },
      // Add more ranges as needed
    ];
    
    const selectedRange = loanAmountRanges.find(range => loanAmount >= range.min && loanAmount <= range.max);
    
    if (selectedRange) {
      setInputValues(selectedRange.values);
    }
  }, [formValues])


  
  const recomendationValues = calculateMortgagePayoff(loanAmount, rate, loanDuration, downPaymentPercent, (loanAmount * (inputValues.Percentage/100)), inputValues.interval)
  recomendationValues.interval = inputValues.interval
  recomendationValues.additionalPayment = loanAmount * (inputValues.Percentage/100)
  useEffect(()=> {
    
    setRecomendationValues(recomendationValues)
  }, [formValues, inputValues])

  const inputRefs = {
    Percentage: useRef(null),
    interval: useRef(null),
  };

  // Update state when input values change
  const handleInputChange = (inputName) => (e) => {
    setInputValues({
      ...inputValues,
      [inputName]: e.target.value,
    });
  };

  // Update input values when state changes
  useEffect(() => {
    Object.keys(inputValues).forEach((inputName) => {
      if (inputRefs[inputName].current) {
        inputRefs[inputName].current.value = inputValues[inputName];
      }
    });
  }, [inputValues]);

  // Update state when range values change
  const handleRangeChange = (inputName) => (e) => {
    setInputValues({
      ...inputValues,
      [inputName]: e.target.value,
    });
  };
  return (
    <>
      <div className="content">
        <h2>Additional Payment Form</h2>
        <form className="details">
          <div className="input-fields">
            <div className="descriptive-field">
              <label>Percentage</label>
              <input
                name="Percentage"
                id="Percentage"
                type="number"
                value={inputValues.Percentage}
                onChange={handleInputChange("Percentage")}
                ref={inputRefs.Percentage}
              />
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={inputValues.Percentage}
              onChange={handleRangeChange("Percentage")}
            />
          </div>

          <div className="input-fields">
            <div className="descriptive-field">
              <label>Payment Interval</label>
              <input
                type="number"
                name="interval"
                id="interval"
                value={inputValues.interval}
                onChange={handleInputChange("interval")}
                ref={inputRefs.interval}
              />
            </div>
            <input
              type="range"
              min={0}
              max={20}
              value={inputValues.interval}
              step={1}
              onChange={handleRangeChange("interval")}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AdditionalPaymentForm;
