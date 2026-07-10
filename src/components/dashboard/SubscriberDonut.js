'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

export default function SubscriberDonut({ active, unsubscribed }) {
  const data = [
    { name: 'Aktif Abone', value: active },
    { name: 'Çıkmış', value: unsubscribed },
  ];

  const COLORS = ['#5b4fe9', '#db4c6b'];

  const hasData = active > 0 || unsubscribed > 0;

  return (
    <div className="rounded-2xl bg-card p-6 shadow-lg">
      <h2 className="mb-6 text-lg font-semibold text-dark">Abone Dağılımı</h2>
      {hasData ? (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-muted">Gösterilecek veri yok.</p>
      )}
    </div>
  );
}