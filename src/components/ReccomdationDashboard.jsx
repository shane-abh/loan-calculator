import React from "react";

const ReccomdationDashboard = ({ recomendationValues,normalData }) => {
  console.log(recomendationValues);
  return (
    <>
      <h2>Recommendation</h2>
      <div className="recommendation-cards">
        <div className="card">
          <p className="rec-tip">
            <div>

            If you made <span className="imp-highlight">${(recomendationValues.additionalPayment.toLocaleString("en-US", {maximumFractionDigits:2})) }</span> payment
            every {recomendationValues.interval}-year
            interval, you could potentially pay off the mortgage{" "}
            <span className="imp-highlight">{recomendationValues.paidOffYearsEarlier.toLocaleString("en-US", {maximumFractionDigits:2})}</span> years earlier.
            </div>
          </p>
        </div>
        <div className="card savings">
          <h3>Savings</h3>
          <hr />
          <div className="savings-info">
            <p>Time</p>
            <p className="imp-highlight">-{recomendationValues.paidOffYearsEarlier.toLocaleString("en-US", {maximumFractionDigits:2})}yrs</p>
          </div>
          <div className="savings-info">
            <p>Interest Amount</p>
            <p className="imp-highlight">${(normalData.totalInterestPaid - recomendationValues.totalInterestPaid).toLocaleString("en-US", {maximumFractionDigits:2})}</p>
          </div>
          <div className="savings-info">
            <p>Total Saved</p>
            <p className="imp-highlight">${(normalData.totalAmountPaid - recomendationValues.sum).toLocaleString("en-US", {maximumFractionDigits:2})}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReccomdationDashboard;
