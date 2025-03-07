'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AreaChartProps {
  data: Array<{
    month: string;
    organicTraffic: number;
    conversions: number;
  }>;
}

const AreaChartComponent: React.FC<AreaChartProps> = ({ data }) => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ED2939" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ED2939" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9B2C2C" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#9B2C2C" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="organicTraffic" 
            name="Organic Traffic" 
            stroke="#ED2939" 
            fillOpacity={1} 
            fill="url(#colorTraffic)" 
          />
          <Area 
            type="monotone" 
            dataKey="conversions" 
            name="Conversions" 
            stroke="#9B2C2C" 
            fillOpacity={1} 
            fill="url(#colorConversions)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartComponent; 