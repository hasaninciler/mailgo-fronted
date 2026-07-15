'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { getAnalytics } from '../../lib/api';
import { Users, UserMinus, Mail, MousePointerClick, Calendar } from 'lucide-react';
import SubscriberChart from '../../components/dashboard/SubscriberChart';
import SubscriberDonut from '../../components/dashboard/SubscriberDonut';
import RecentActivity from '../../components/dashboard/RecentActivity';


export default function DashboardPage() {
  const user = useSelector((state) => state.auth.user);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const data = await getAnalytics();
      setStats(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const cards = [
    {
      label: 'Toplam Abone',
      value: stats?.totalSubscribers,
      icon: Users,
      iconColor: 'text-primary',
      iconBg: 'bg-primary/10',
    },
    {
      label: 'Abonelikten Çıkan',
      value: stats?.unsubscribedCount,
      icon: UserMinus,
      iconColor: 'text-accent-red',
      iconBg: 'bg-accent-red/10',
    },
    {
      label: 'Gönderilen Mail',
      value: stats?.totalSentMails,
      icon: Mail,
      iconColor: 'text-accent-blue',
      iconBg: 'bg-accent-blue/10',
    },
    {
      label: 'Toplam Tıklanma',
      value: stats?.totalCampaignClicks,
      icon: MousePointerClick,
      iconColor: 'text-accent-orange',
      iconBg: 'bg-accent-orange/10',
    },
  ];
  const today = new Date().toLocaleDateString('tr-TR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-dark">Dashboard</h1>
            <p className="mt-2 text-muted">
              Aboneleriniz ve kampanyalarınız hakkında genel bilgiler
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-card px-4 py-3 shadow-sm">
            <Calendar size={18} className="text-muted" />
            <span className="text-sm font-medium text-dark">{today}</span>
          </div>
        </div>

        {error && <p className="mb-4 text-sm text-accent-red">{error}</p>}

        <div className="flex flex-col divide-y divide-gray-100 rounded-2xl bg-card p-2 shadow-lg sm:flex-row sm:divide-x sm:divide-y-0">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="flex flex-1 items-center gap-4 p-6">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${card.iconBg}`}>
                  <Icon className={card.iconColor} size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted">{card.label}</p>
                  <p className="mt-1 text-2xl font-bold text-dark">
                    {stats ? card.value : '...'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          <SubscriberChart />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SubscriberDonut
            active={stats ? stats.totalSubscribers - stats.unsubscribedCount : 0}
            unsubscribed={stats?.unsubscribedCount || 0}
          />
          <RecentActivity />
        </div>
      </div>
    </DashboardLayout>
  );
}