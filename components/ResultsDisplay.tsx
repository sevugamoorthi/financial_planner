import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { FinancialData } from '../types';

interface ResultsDisplayProps {
  finalValue: number;
  financialData: FinancialData | null;
  onGetAdvice: () => void;
  isLoadingAdvice: boolean;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ finalValue, financialData, onGetAdvice, isLoadingAdvice }) => {
  if (!financialData) return null;
  
  const totalYears = financialData.retirementAge - financialData.currentAge;
  const totalContributions = financialData.initialSavings + (financialData.monthlyContribution * 12 * totalYears);
  const totalInterest = finalValue - totalContributions;

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Projection Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
        <div className="bg-slate-700/50 p-4 rounded-lg">
          <p className="text-sm text-slate-400">Total Contributions</p>
          <p className="text-2xl font-semibold text-emerald-400">₹{totalContributions.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-slate-700/50 p-4 rounded-lg">
          <p className="text-sm text-slate-400">Total Interest Earned</p>
          <p className="text-2xl font-semibold text-amber-400">₹{totalInterest.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-slate-700/50 p-4 rounded-lg">
          <p className="text-sm text-slate-400">Retirement Nest Egg</p>
          <p className="text-3xl font-bold text-cyan-400">₹{Math.round(finalValue).toLocaleString('en-IN')}</p>
        </div>
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={onGetAdvice}
          disabled={isLoadingAdvice}
          className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoadingAdvice ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Getting Advice...
            </>
          ) : (
            <>
              <SparklesIcon className="h-5 w-5 mr-2" />
              Get AI-Powered Advice
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;