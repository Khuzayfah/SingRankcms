'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BarChartProps {
  data: Array<{
    keyword: string;
    before: number;
    after: number;
  }>;
}

const BarChartComponent: React.FC<BarChartProps> = ({ data }) => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 20, left: 80, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis type="number" />
          <YAxis dataKey="keyword" type="category" width={100} />
          <Tooltip />
          <Legend />
          <Bar dataKey="before" name="Previous Ranking" fill="#9B2C2C" />
          <Bar dataKey="after" name="Current Ranking" fill="#ED2939" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent; 