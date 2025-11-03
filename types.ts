
export interface FinancialData {
  currentAge: number;
  retirementAge: number;
  initialSavings: number;
  monthlyContribution: number;
  interestRate: number;
}

export interface ProjectionPoint {
  age: number;
  value: number;
  contributions: number;
  interest: number;
}
