"use client";

import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Jan', total: 1200 },
  { name: 'Feb', total: 2100 },
  { name: 'Mar', total: 1800 },
  { name: 'Apr', total: 2750 },
  { name: 'May', total: 2400 },
  { name: 'Jun', total: 3400 },
];

export const RevenueChart = () => {
  return (
    <div className="w-full h-[350px] bg-card border border-border rounded-xl shadow-sm p-6">
      <div className="mb-4">
        <h3 className="font-semibold text-foreground">Revenue Overview</h3>
        <p className="text-sm text-foreground/60">Monthly earning performance</p>
      </div>
      
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
            <XAxis 
              dataKey="name" 
              stroke="currentColor" 
              className="text-foreground/50 text-xs" 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="currentColor" 
              className="text-foreground/50 text-xs" 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '8px' }}
              itemStyle={{ color: 'var(--color-foreground)' }}
            />
            <Area 
              type="monotone" 
              dataKey="total" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorTotal)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};