import React from "react";
import { useState, useRef, useEffect } from "react";
import { result } from "../calculations/calculateDetails";
import { calculateMortgagePayoff } from "../calculations/recomendation";

const LoanDetails = ({setLineChartData, setPieChartData, setinputVals}) => {
  const [inputValues, setInputValues] = useState({
    loanAmount: 0,
    rate: 0,
    loanDuration: 0,
    downPaymentPercent: 0,
  });

//  useEffect(() => {
//   setinputVals(inputValues)

//  }, [inputValues])
  

  const inputRefs = {
    loanAmount: useRef(null),
    rate: useRef(null),
    loanDuration: useRef(null),
    downPaymentPercent: useRef(null),
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const ans = result(inputValues)
    setLineChartData({balance :ans.balance, monthlyInterestPayments: ans.monthlyInterestPayments})
    setPieChartData([ans.res.monthlyPayment, ans.res.monthlyInterest, ans.res.monthlyPrincipal])
     setinputVals(inputValues)
    
   
    
    
    console.log(ans)


  }

  return (
    <div>
      <div className="content">
        <h2>Loan Details</h2>
        <form action="" className="details">
          <div className="input-fields">
            <div className="descriptive-field">
              <label>Loan Amount</label>
              <input
                name="loanAmount"
                id="loan-amount"
                type="number"
                value={inputValues.loanAmount}
                onChange={handleInputChange("loanAmount")}
                ref={inputRefs.loanAmount}
              />
            </div>
            <input
              type="range"
              min={0}
              max={1000000}
              value={inputValues.loanAmount}
              onChange={handleRangeChange("loanAmount")}
            />
          </div>

          <div className="input-fields">
            <div className="descriptive-field">
              <label>Annual Interest Rate</label>
              <input
                type="number"
                name="annualInterestRate"
                id="annualInterestRate"
                value={inputValues.rate}
                onChange={handleInputChange("rate")}
                ref={inputRefs.rate}
              />
            </div>
            <input
              type="range"
              min={1}
              max={50}
              value={inputValues.rate}
              step={0.1}
              onChange={handleRangeChange("rate")}
            />
          </div>

          <div className="input-fields">
            <div className="descriptive-field">
              <label>Loan Duration</label>
              <input
                type="number"
                name="loanDuration"
                id="loanDuration"
                value={inputValues.loanDuration}
                onChange={handleInputChange("loanDuration")}
                ref={inputRefs.loanDuration}
              />
            </div>
            <input
              type="range"
              min={1}
              max={60}
              value={inputValues.loanDuration}
              step={1}
              onChange={handleRangeChange("loanDuration")}
            />
          </div>

          <div className="input-fields">
            <div className="descriptive-field">
              <label>Down Payment Percent</label>
              <input
                type="number"
                name="downPaymentPercent"
                id="downPaymentPercent"
                value={inputValues.downPaymentPercent}
                onChange={handleInputChange("downPaymentPercent")}
                ref={inputRefs.downPaymentPercent}
              />
            </div>
            <input
              type="range"
              min={1}
              max={100}
              value={inputValues.downPaymentPercent}
              step={1}
              onChange={handleRangeChange("downPaymentPercent")}
            />
          </div>

          <div className="submit-btn">
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoanDetails;
