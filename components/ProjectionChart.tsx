import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ProjectionPoint } from '../types';

interface ProjectionChartProps {
  data: ProjectionPoint[];
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-700/80 backdrop-blur-sm p-4 border border-slate-600 rounded-lg shadow-xl text-sm">
        <p className="font-bold text-white">{`Age: ${label}`}</p>
        <p className="text-cyan-400">{`Total Savings: ₹${payload[0].value.toLocaleString('en-IN')}`}</p>
        <p className="text-emerald-400">{`Total Contributions: ₹${payload[1].value.toLocaleString('en-IN')}`}</p>
        <p className="text-amber-400">{`Total Interest: ₹${payload[2].value.toLocaleString('en-IN')}`}</p>
      </div>
    );
  }
  return null;
};


const ProjectionChart: React.FC<ProjectionChartProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 30,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
          <XAxis 
            dataKey="age" 
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            label={{ value: 'Age', position: 'insideBottom', offset: -10, fill: '#94a3b8' }}
          />
          <YAxis 
            stroke="#94a3b8" 
            tickFormatter={(value) => `₹${(Number(value) / 100000).toFixed(0)}L`}
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ color: '#e2e8f0', paddingTop: '20px' }} />
          <Line type="monotone" dataKey="value" name="Total Value" stroke="#22d3ee" strokeWidth={3} dot={false} />
          <Line type="monotone" dataKey="contributions" name="Contributions" stroke="#34d399" strokeWidth={2} dot={false} strokeDasharray="5 5" />
          <Line type="monotone" dataKey="interest" name="Interest" stroke="#f59e0b" strokeWidth={2} dot={false} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectionChart;