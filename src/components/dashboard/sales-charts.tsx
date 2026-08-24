'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

export function SalesChart() {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-900">
      <h3 className="text-lg font-semibold mb-4">Sales Trend (Last 7 Days)</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            <XAxis dataKey="name" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            />
            <Area 
              type="monotone" 
              dataKey="sales" 
              stroke="#3b82f6" 
              fill="#3b82f6" 
              fillOpacity={0.2} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}