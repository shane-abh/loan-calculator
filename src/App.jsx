import { useState, useRef, createContext, useEffect } from "react";

import "./App.css";
import PieChart from "./components/PieChart";
import LineChart from "./components/LineChart";
import LoanDetails from "./components/LoanDetails";
import AdditionalPaymentForm from "./components/AdditionalPaymentForm";
import ReccomdationDashboard from "./components/ReccomdationDashboard";


export const loaninputValues = createContext();

function App() {
  const [lineChartData, setLineChartData] = useState("");
  const [pieChartData, setPieChartData] = useState("");

  const [inputVals, setinputVals] = useState("");
  const [normalData, setNormalData] = useState("");
  console.log(normalData);

  const [recomendationValues, setRecomendationValues] = useState();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const color = getComputedStyle(document.querySelector(':root'))
  .getPropertyValue('--text-color');

  function handleClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      <header>
        <h1>Mortgage Calculator</h1>
        <div className="img-container">
          
        <label for="hamburger" class="hamburger" onClick={handleClick}>
          <span class="line"></span>
          <span class="line"></span>
          <span class="line"></span>
      </label>
          {isMenuOpen ? (
            <div onClick={handleClick} className="side-menu">
              <h4>Choose Your Theme</h4>
              <hr />
              <div className="colors">
                <div
                  className="color purple"
                  onClick={() =>
                    document.body.setAttribute("data-theme", "purple-theme")
                  }
                ></div>
                <div
                  className="color orange"
                  onClick={() =>
                    document.body.setAttribute("data-theme", "orange-theme")
                  }
                ></div>
                <div
                  className="color blue"
                  onClick={() =>
                    document.body.setAttribute("data-theme", "blue-theme")
                  }
                ></div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </header>

      <div className="container">
        <div className="row1">
          <div className="item ">
            <LoanDetails
              setLineChartData={setLineChartData}
              setPieChartData={setPieChartData}
              setinputVals={setinputVals}
              setNormalData={setNormalData}
            />
          </div>
          <div className="item align-center">
          <h2 className="details">Breakdown</h2>
          {normalData?

            <h3 >Monthly Payment: ${normalData.monthlyPayment.toFixed(2)}</h3> 
            : ""
          }
            <PieChart chartData={pieChartData} />
          </div>
          <div className="item ">
            <h2 className="details">Ammoritization</h2>
            <div className="align-center graph">
              <LineChart chartData={lineChartData} />
            </div>
          </div>
        </div>

        <loaninputValues.Provider value={inputVals}>
          <div className="row1">
            <div className="item">
              <AdditionalPaymentForm
                setRecomendationValues={setRecomendationValues}
              />
            </div>
            <div className="item group content">
              {inputVals ? (
                <ReccomdationDashboard
                  recomendationValues={recomendationValues}
                  normalData={normalData}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </loaninputValues.Provider>
        <div></div>
      </div>
    </>
  );
}

export default App;
