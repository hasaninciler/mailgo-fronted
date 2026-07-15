'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { getCampaign } from '../../../lib/api';
import { ArrowLeft, MousePointerClick, Link as LinkIcon } from 'lucide-react';

export default function CampaignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [campaign, setCampaign] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCampaign();
  }, []);

  const loadCampaign = async () => {
    try {
      const data = await getCampaign(params.id);
      setCampaign(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <button
          onClick={() => router.push('/campaigns')}
          className="mb-6 flex items-center gap-2 text-sm text-muted hover:text-dark"
        >
          <ArrowLeft size={18} />
          Kampanyalara dön
        </button>

        {error && <p className="text-sm text-accent-red">{error}</p>}

        {!campaign ? (
          <p className="text-muted">Yükleniyor...</p>
        ) : (
          <div className="max-w-2xl">
            <h1 className="mb-2 text-3xl font-bold text-dark">{campaign.name}</h1>
            <p className="mb-8 text-muted">{campaign.description || 'Açıklama yok'}</p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-2xl bg-card p-6 shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-orange/10">
                  <MousePointerClick className="text-accent-orange" size={24} />
                </div>
                <p className="text-sm text-muted">Toplam Tıklanma</p>
                <p className="mt-1 text-3xl font-bold text-dark">{campaign.clickCount}</p>
              </div>

              <div className="rounded-2xl bg-card p-6 shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <LinkIcon className="text-primary" size={24} />
                </div>
                <p className="text-sm text-muted">Hedef Link</p>
                <a href={campaign.targetUrl} target="_blank" rel="noopener noreferrer" className="mt-1 block truncate text-sm font-medium text-primary hover:underline">
                  {campaign.targetUrl}
                </a>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-card p-6 shadow-lg">
              <p className="mb-2 text-sm font-medium text-dark">Kampanya Tıklama Linki</p>
              <p className="mb-3 text-xs text-muted">
                Bu linki maillere koyarsanız linke her basıldıgında sayaç artar
              </p>
              <code className="block rounded-lg bg-bg-subtle p-3 text-xs text-dark">
                http://localhost:5001/api/campaigns/{campaign.id}/click
              </code>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}