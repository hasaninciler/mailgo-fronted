'use client';

import { useState, useEffect } from 'react';
import { getSubscribers } from '../../lib/api';

export default function RecentActivity() {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    getSubscribers()
      .then((data) => setSubscribers(data.slice(0, 5)))
      .catch(() => {});
  }, []);

  return (
    <div className="rounded-2xl bg-card p-6 shadow-lg">
      <h2 className="mb-6 text-lg font-semibold text-dark">Son Eklenen Aboneler</h2>
      {subscribers.length === 0 ? (
        <p className="text-muted">Henüz abone yok.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {subscribers.map((s) => (
            <li key={s.id} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {s.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-dark">{s.name}</p>
                <p className="text-xs text-muted">{s.email}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}