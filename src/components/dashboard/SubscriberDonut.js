'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function SubscriberDonut({ active, unsubscribed }) {
  const total = active + unsubscribed;
  const data = [
    { name: 'Aktif Abone', value: active, color: '#5b4fe9' },
    { name: 'Çıkmış', value: unsubscribed, color: '#db4c6b' },
  ];

  const hasData = total > 0;

  // Yüzde hesapla (bölme sıfır olmasın)
  const percent = (value) => (total > 0 ? Math.round((value / total) * 100) : 0);

  return (
    <div className="rounded-2xl bg-card p-6 shadow-lg">
      <h2 className="mb-6 text-lg font-semibold text-dark">Abone Dağılımı</h2>
      {hasData ? (
        <div className="flex items-center gap-6">
          {/* Sol: renkli nokta + isim + yüzde */}
          <div className="flex flex-col gap-4">
            {data.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div>
                  <p className="text-sm text-dark">{item.name}</p>
                  <p className="text-lg font-bold text-dark">%{percent(item.value)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Sağ: donut */}
          <div className="flex-1">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <p className="text-muted">Gösterilecek veri yok.</p>
      )}
    </div>
  );
}