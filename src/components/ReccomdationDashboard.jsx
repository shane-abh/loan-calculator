import React from "react";

const ReccomdationDashboard = ({ recomendationValues }) => {
  console.log(recomendationValues);
  return (
    <>
      <h2>Recommendation</h2>
      <div className="recommendation-cards">
        <div className="card">
          <p className="rec-tip">
            If you made ${recomendationValues.monthlyPayment.toFixed(2)} payment
            every {recomendationValues.interval}-year
            interval, you could potentially pay off the mortgage{" "}
            {recomendationValues.paidOffYearsEarlier.toFixed(2)} years earlier.
          </p>
        </div>
        <div className="card savings">
          <h3>Savings</h3>
          <hr />
          <div className="savings-info">
            <p>Time</p>
            <p>-2.5yrs</p>
          </div>
          <div className="savings-info">
            <p>Time</p>
            <p>-2.5yrs</p>
          </div>
          <div className="savings-info">
            <p>Time</p>
            <p>-2.5yrs</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReccomdationDashboard;
