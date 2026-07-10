'use client';

import { useState, useEffect } from 'react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import DashboardLayout from '../../components/layout/DashboardLayout';

import { getCategories, createCategory } from '../../lib/api';

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await createCategory({ name, description });
            setName('');
            setDescription('');
            loadCategories();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="p-8">
                <h1 className="mb-6 text-3xl font-bold text-dark">Kategoriler</h1>
                <div className="mb-8 max-w-md rounded-2xl bg-card p-6 shadow-lg">
                    <h2 className="mb-4 text-lg font-semibold text-dark">Yeni Kategori Ekle</h2>
                    {error && <p className="mb-4 text-sm text-accent-red">{error}</p>}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Input
                            label="Kategori İsmi"
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Haftalık Bülten"
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
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Ekleniyor...' : 'Ekle'}
                        </Button>
                    </form>
                </div>

                <div className="rounded-2xl bg-card p-6 shadow-lg">
                    <h2 className="mb-4 text-lg font-semibold text-dark">Mevcut Kategoriler</h2>
                    {categories.length === 0 ? (
                        <p className="text-muted">Henüz kategori yok.</p>
                    ) : (
                        <ul className="flex flex-col gap-3">
                            {categories.map((cat) => (
                                <li key={cat.id} className="rounded-lg border border-gray-100 p-4">
                                    <p className="font-medium text-dark">{cat.name}</p>
                                    <p className="text-sm text-muted">{cat.description || 'Açıklama yok'}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}