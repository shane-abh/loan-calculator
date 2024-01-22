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
      { min: 50001, max: 100000, values: { Percentage: 12, interval: parseInt(loanDuration / 5) } },
      // Add more ranges as needed
    ];
    
    const selectedRange = loanAmountRanges.find(range => loanAmount > range.min && loanAmount < range.max);
    
    if (selectedRange) {
      setInputValues(selectedRange.values);
    }
  }, [loanAmount])


  
  const recomendationValues = calculateMortgagePayoff(loanAmount, rate, loanDuration, downPaymentPercent, 10000, inputValues.interval)
  recomendationValues.interval = inputValues.interval
  useEffect(()=> {
    
    setRecomendationValues(recomendationValues)
  }, [formValues])

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
