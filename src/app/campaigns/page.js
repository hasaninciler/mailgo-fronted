'use client';

import { useState, useEffect } from 'react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Link from 'next/link';
import { getCampaigns, createCampaign } from '../../lib/api';

export default function CampaignsPage() {
    const [campaigns, setCampaigns] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [targetUrl, setTargetUrl] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCampaigns();
    }, []);

    const loadCampaigns = async () => {
        try {
            const data = await getCampaigns();
            setCampaigns(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await createCampaign({ name, description, targetUrl });
            setName('');
            setDescription('');
            setTargetUrl('');
            loadCampaigns();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="p-8">
                <h1 className="mb-6 text-3xl font-bold text-dark">Kampanyalar</h1>
                <div className="mb-8 max-w-md rounded-2xl bg-card p-6 shadow-lg">
                    <h2 className="mb-4 text-lg font-semibold text-dark">Yeni Kampanya Ekle</h2>
                    {error && <p className="mb-4 text-sm text-accent-red">{error}</p>}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Input
                            label="Kampanya İsmi"
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Bordo io"
                            required
                        />
                        <Input
                            label="Açıklama"
                            id="description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Kısa açıklama"
                        />
                        <Input
                            label="Hedef Link"
                            id="targetUrl"
                            type="text"
                            value={targetUrl}
                            onChange={(e) => setTargetUrl(e.target.value)}
                            placeholder="https://bordo.io"
                            required
                        />
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Ekleniyor...' : 'Ekle'}
                        </Button>
                    </form>
                </div>

                <div className="rounded-2xl bg-card p-6 shadow-lg">
                    <h2 className="mb-4 text-lg font-semibold text-dark">Mevcut Kampanyalar</h2>
                    {campaigns.length === 0 ? (
                        <p className="text-muted">Henüz kampanya yok.</p>
                    ) : (
                        <ul className="flex flex-col gap-3">
                            {campaigns.map((c) => (
                                <li key={c.id} className="rounded-lg border border-gray-100 p-4">
                                    <p className="font-medium text-dark">{c.name}</p>
                                    <p className="text-sm text-muted">{c.description || 'Açıklama yok'}</p>
                                    <p className="mt-1 text-xs text-primary">{c.targetUrl}</p>
                                    <p className="text-xs text-muted">Tıklanma: {c.clickCount}</p>
                                    <Link href={`/campaigns/${c.id}`} className="mt-2 inline-block text-xs font-medium text-primary hover:underline">
                                        Detayları gör →
                                    </Link>
                                </li> 
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}