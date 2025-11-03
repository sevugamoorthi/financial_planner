
import { FinancialData, ProjectionPoint } from '../types';

export const calculateRetirementProjection = (data: FinancialData): ProjectionPoint[] => {
  const { currentAge, retirementAge, initialSavings, monthlyContribution, interestRate } = data;
  const projection: ProjectionPoint[] = [];
  
  let currentValue = initialSavings;
  let totalContributions = initialSavings;
  let totalInterest = 0;
  const yearlyContribution = monthlyContribution * 12;
  const rate = interestRate / 100;

  for (let age = currentAge; age <= retirementAge; age++) {
    const interestForYear = currentValue * rate;
    totalInterest += interestForYear;
    currentValue += interestForYear;

    projection.push({
      age,
      value: Math.round(currentValue),
      contributions: Math.round(totalContributions),
      interest: Math.round(totalInterest),
    });
    
    if (age < retirementAge) {
      currentValue += yearlyContribution;
      totalContributions += yearlyContribution;
    }
  }

  return projection;
};
