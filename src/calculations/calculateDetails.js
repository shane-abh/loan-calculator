import { useState } from "react";

import React from "react";

function calculateMonthlyPayment(
  annualInterestRate,
  loanDurationYears,
  loanAmount
) {
  // Monthly interest rate
  const monthlyRate = annualInterestRate / 12 / 100;

  // Total number of payments
  const numberOfPayments = loanDurationYears * 12;

  // Calculate monthly payment using PMT formula
  const monthlyPayment =
    (loanAmount * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -numberOfPayments));

  // Calculate monthly interest
  const monthlyInterest = loanAmount * monthlyRate;

  // Calculate monthly principal
  const monthlyPrincipal = monthlyPayment - monthlyInterest;

  return {
    monthlyPayment,
    monthlyInterest,
    monthlyPrincipal,
  };
}

function calculateMortgagePayoff(
  loanAmount,
  annualInterestRate,
  loanDuration,
  downPaymentPercent
) {
  // Handle cases where downpayment percent is 0 and additional payment amount is 0
  const downPayment = loanAmount * (downPaymentPercent / 100);
  const principalAmount = loanAmount - downPayment;
  let remainingLoanAmount = principalAmount;
  let totalPayments = 0;
  let totalInterestPaid = 0;

  // Use the fixed-term monthly payment function
  const { monthlyPayment, monthlyInterest, monthlyPrincipal } =
    calculateMonthlyPayment(annualInterestRate, loanDuration, principalAmount);

  let totalAmountPaid = 0;
  let balance = [];
  let monthlyInterestPayment = [];
  for (let year = 1; year <= loanDuration; year++) {
    for (let month = 1; month <= 12; month++) {
      const totalPayment = monthlyPayment;
      const monthlyInterest =
        remainingLoanAmount * (annualInterestRate / 12 / 100);

      remainingLoanAmount -= totalPayment - monthlyInterest;
      totalInterestPaid += monthlyInterest;
      balance.push(remainingLoanAmount);
      if (remainingLoanAmount <= 0) {
        remainingLoanAmount = 0;
        break;
      }
      totalAmountPaid += totalPayment;
      totalPayments++;

      monthlyInterestPayment.push(totalAmountPaid);
    }

    // Break if the loan is paid off
    if (remainingLoanAmount <= 0) {
      break;
    }
  }

  return {
    totalPayments,
    monthlyPayment,
    monthlyInterest,
    monthlyPrincipal,
    totalInterestPaid,
    totalAmountPaid,
    balance,
    monthlyInterestPayment,
  };
}

export const result = ({
  loanAmount,
  rate,
  loanDuration,
  downPaymentPercent,
}) => {
  const res = calculateMortgagePayoff(
    loanAmount,
    rate,
    loanDuration,
    downPaymentPercent
  );

  const filterAndMapData = (data, maxPointsToShow, totalDataPoints) => {
    const samplingInterval = Math.max(
      1,
      Math.floor(totalDataPoints / maxPointsToShow)
    );

    return data
      .filter(
        (point, index) =>
          point > 0 &&
          (index % samplingInterval === 0 || index === totalDataPoints - 1)
      )
      .map((point, index) => ({ point, label: index }));
  };

  const maxPointsToShow = 7;
  const totalDataPoints = res.balance.length;
  const loanDurations = res.balance;
  const monthlyInterestPayment = res.monthlyInterestPayment;
  const principalAmount = res.principalAmounts;

  const balance = filterAndMapData(
    loanDurations,
    maxPointsToShow,
    totalDataPoints
  );
  balance.forEach(({ point, label }) => {
    console.log(`Selected point: ${point}, Original index: ${label}`);
  });

  const monthlyInterestPayments = filterAndMapData(
    monthlyInterestPayment,
    maxPointsToShow,
    totalDataPoints
  );
  monthlyInterestPayments.forEach(({ point, label }) => {
    console.log(
      `Selected point for interest: ${point}, Original index: ${label}`
    );
  });

  return { res, balance, monthlyInterestPayments };
};
