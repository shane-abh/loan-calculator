function calculateMonthlyPayment(annualInterestRate, loanDurationYears, loanAmount) {
    // Monthly interest rate
    const monthlyRate = annualInterestRate / 12 / 100;

    // Total number of payments
    const numberOfPayments = loanDurationYears * 12;

    // Calculate monthly payment using PMT formula
    const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));

    return monthlyPayment;
}

export function calculateMortgagePayoff(loanAmount, annualInterestRate, loanDuration, downPaymentPercent, additionalPaymentAmount, intervalYears) {
    // Handle cases where downpayment percent is 0 and additional payment amount is 0
    const downPayment = loanAmount * (downPaymentPercent / 100);
    const principalAmount = loanAmount - downPayment;
    let remainingLoanAmount = principalAmount;
    let totalPayments = 0;
    let totalInterestPaid = 0;

    // Use the fixed-term monthly payment function
    const monthlyPayment = calculateMonthlyPayment(annualInterestRate, loanDuration, principalAmount);

let sum = 0;
    for (let year = 1; year <= loanDuration; year++) {
        const totalPaymentsThisYear = intervalYears === 0 ? 1 : Math.floor(year / intervalYears);

        for (let month = 1; month <= 12; month++) {
            const additionalPayment = (totalPaymentsThisYear * additionalPaymentAmount) / 12;

            const totalPayment = monthlyPayment + additionalPayment;
            const monthlyInterest = remainingLoanAmount * (annualInterestRate / 12 / 100);
            remainingLoanAmount -= (totalPayment - monthlyInterest);
            totalInterestPaid += monthlyInterest;

            if (remainingLoanAmount <= 0) {
                remainingLoanAmount = 0;
                break;
            }
            sum +=totalPayment;
            totalPayments++;
        }
        
        // Break if the loan is paid off
        if (remainingLoanAmount <= 0) {
            break;
        }
    }

    const paidOffYearsEarlier = Math.max(0, loanDuration - (totalPayments / 12) );

    return {
        totalPayments,
        paidOffYearsEarlier,
        monthlyPayment,
        totalInterestPaid,
        sum
    };
}

// Example usage:
const result = calculateMortgagePayoff(300000, 1, 30, 20, 0, 5);
console.log(result);