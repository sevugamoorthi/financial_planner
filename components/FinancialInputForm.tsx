import React, { useState } from 'react';
import { FinancialData } from '../types';

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  format?: (value: number) => string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, min, max, step = 1, format }) => {
  const displayValue = format ? format(value) : value.toString();

  return (
    <div className="space-y-2">
      <label className="flex justify-between items-center text-sm font-medium text-slate-300">
        <span>{label}</span>
        <span className="font-semibold text-cyan-400 text-base">{displayValue}</span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer range-lg accent-cyan-500"
      />
    </div>
  );
};


interface FinancialInputFormProps {
  onCalculate: (data: FinancialData) => void;
}

const FinancialInputForm: React.FC<FinancialInputFormProps> = ({ onCalculate }) => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [initialSavings, setInitialSavings] = useState(500000);
  const [monthlyContribution, setMonthlyContribution] = useState(10000);
  const [interestRate, setInterestRate] = useState(7);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate({ currentAge, retirementAge, initialSavings, monthlyContribution, interestRate });
  };

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg sticky top-24">
      <h2 className="text-2xl font-bold mb-6 text-white">Your Financial Plan</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Current Age"
          value={currentAge}
          onChange={setCurrentAge}
          min={18}
          max={90}
        />
        <InputField
          label="Retirement Age"
          value={retirementAge}
          onChange={setRetirementAge}
          min={currentAge + 1}
          max={100}
        />
        <InputField
          label="Initial Savings"
          value={initialSavings}
          onChange={setInitialSavings}
          min={0}
          max={10000000}
          step={10000}
          format={(v) => `₹${v.toLocaleString('en-IN')}`}
        />
        <InputField
          label="Monthly Contribution"
          value={monthlyContribution}
          onChange={setMonthlyContribution}
          min={0}
          max={100000}
          step={100}
          format={(v) => `₹${v.toLocaleString('en-IN')}`}
        />
        <InputField
          label="Est. Annual Return"
          value={interestRate}
          onChange={setInterestRate}
          min={1}
          max={20}
          step={0.5}
          format={(v) => `${v}%`}
        />
        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
        >
          Calculate Projection
        </button>
      </form>
    </div>
  );
};

export default FinancialInputForm;