import React from 'react';
import { CalculatorIcon } from './icons/CalculatorIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center">
        <CalculatorIcon className="h-8 w-8 text-cyan-400" />
        <h1 className="ml-3 text-2xl font-bold tracking-tight text-white">
          Financial Planner
        </h1>
      </div>
    </header>
  );
};

export default Header;