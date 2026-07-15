'use client';

import { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { getWeeklySubscribers } from '../../lib/api';

export default function SubscriberChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getWeeklySubscribers()
      .then((res) => setData(res))
      .catch(() => {});
  }, []);

  return (
    <div className="rounded-2xl bg-card p-6 shadow-lg">
      <h2 className="mb-6 text-lg font-semibold text-dark">
        Son 7 Günde Eklenen Aboneler
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#5b4fe9" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#5b4fe9" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="day" stroke="#8b8ba7" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#8b8ba7" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#5b4fe9"
            strokeWidth={3}
            fill="url(#colorCount)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}