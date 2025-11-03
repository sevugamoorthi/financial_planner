
import React, { useState } from 'react';
import { FinancialData, ProjectionPoint } from './types';
import { calculateRetirementProjection } from './utils/financialCalculations';
import Header from './components/Header';
import FinancialInputForm from './components/FinancialInputForm';
import ProjectionChart from './components/ProjectionChart';
import ResultsDisplay from './components/ResultsDisplay';
import AdviceCard from './components/AdviceCard';
import { getFinancialAdvice } from './services/geminiService';

const App: React.FC = () => {
  const [projectionData, setProjectionData] = useState<ProjectionPoint[] | null>(null);
  const [financialSummary, setFinancialSummary] = useState<FinancialData | null>(null);
  const [aiAdvice, setAiAdvice] = useState<string>('');
  const [isLoadingAdvice, setIsLoadingAdvice] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleCalculate = (data: FinancialData) => {
    setProjectionData(null);
    setAiAdvice('');
    setError('');
    setFinancialSummary(data);
    const projection = calculateRetirementProjection(data);
    setProjectionData(projection);
  };

  const handleGetAdvice = async () => {
    if (!financialSummary || !projectionData) return;

    setIsLoadingAdvice(true);
    setError('');
    setAiAdvice('');

    try {
      const lastYearProjection = projectionData[projectionData.length - 1];
      const advice = await getFinancialAdvice(financialSummary, lastYearProjection.value);
      setAiAdvice(advice);
    } catch (err) {
      setError('Failed to get AI-powered advice. Please try again.');
      console.error(err);
    } finally {
      setIsLoadingAdvice(false);
    }
  };
  
  const lastProjectionPoint = projectionData ? projectionData[projectionData.length - 1] : null;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <FinancialInputForm onCalculate={handleCalculate} />
          </div>
          <div className="lg:col-span-8">
            {projectionData ? (
              <div className="space-y-8">
                <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
                  <h2 className="text-2xl font-bold text-cyan-400 mb-4">Retirement Savings Projection</h2>
                  <ProjectionChart data={projectionData} />
                </div>
                <ResultsDisplay 
                  finalValue={lastProjectionPoint?.value || 0}
                  financialData={financialSummary}
                  onGetAdvice={handleGetAdvice}
                  isLoadingAdvice={isLoadingAdvice}
                />
                <AdviceCard advice={aiAdvice} isLoading={isLoadingAdvice} error={error} />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full bg-slate-800 rounded-2xl shadow-lg min-h-[400px]">
                <div className="text-center p-8">
                  <h2 className="text-2xl font-bold text-slate-400">Welcome to AI-Powered Financial Planner</h2>
                  <p className="mt-2 text-slate-500">
                    Fill in your financial details on the left to project your retirement savings and get AI-powered insights.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="text-center p-4 mt-8 text-slate-600 text-sm">
        <p>Disclaimer: This is a financial projection tool for illustrative purposes only. Consult with a qualified financial advisor for personalized advice.</p>
      </footer>
    </div>
  );
};

export default App;
