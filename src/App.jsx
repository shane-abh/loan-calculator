import { useState, useRef, createContext } from "react";

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
  console.log(pieChartData);

  const [inputVals, setinputVals] = useState("");
  console.log(inputVals);

  const [recomendationValues, setRecomendationValues] = useState();

  return (
    <>
      <header>Loan Calculator</header>

      <div className="container">
        <div className="row1">
          <div className="item">
            <LoanDetails
              setLineChartData={setLineChartData}
              setPieChartData={setPieChartData}
              setinputVals={setinputVals}
            />
          </div>
          <div className="item">
            <PieChart chartData={pieChartData} />
          </div>
          <div className="item">
            <LineChart chartData={lineChartData} />
          </div>
        </div>

        <loaninputValues.Provider value={inputVals}>
          <div className="row1">
            <div className="item">
              <AdditionalPaymentForm setRecomendationValues={setRecomendationValues}/>
            </div>
            <div className="item group content">
            { inputVals? <ReccomdationDashboard recomendationValues={recomendationValues}/>
      : ""}
            </div>
          </div>
        </loaninputValues.Provider>
        <div></div>
      </div>
    </>
  );
}

export default App;
