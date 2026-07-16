'use client';

import { useState, useEffect } from 'react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { getSubscribers, createSubscriber, importSubscribers, getCategories, updateSubscriber, deleteSubscriber } from '../../lib/api';

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Filtreleme state'leri
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadSubscribers();
    loadCategories();
  }, []);

  const loadSubscribers = async () => {
    try {
      const data = await getSubscribers();
      setSubscribers(data);
    } catch (err) {
      setError(err.message);
    }
  };

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
    setMessage('');
    setLoading(true);
    try {
      await createSubscriber({ name, email, categoryId: categoryId || null });
      setName('');
      setEmail('');
      setCategoryId('');
      loadSubscribers();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!file) {
      setError('Lütfen bir CSV dosyası seçin');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (categoryId) formData.append('categoryId', categoryId);
      const result = await importSubscribers(formData);
      setMessage(`${result.added} kişi eklendi, ${result.skipped} atlandı`);
      setFile(null);
      loadSubscribers();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSubscribe = async (subscriber) => {
    try {
      await updateSubscriber(subscriber.id, {
        name: subscriber.name,
        email: subscriber.email,
        categoryId: subscriber.categoryId,
        isSubscribed: !subscriber.isSubscribed,
      });
      loadSubscribers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Bu aboneyi silmek istediğinize emin misiniz?')) return;
    try {
      await deleteSubscriber(id);
      loadSubscribers();
    } catch (err) {
      setError(err.message);
    }
  };

  // Filtreleme: kategori + durum + arama
  const filteredSubscribers = subscribers.filter((s) => {
    const matchCategory = filterCategory ? s.categoryId === Number(filterCategory) : true;
    const matchStatus = filterStatus
      ? (filterStatus === 'active' ? s.isSubscribed : !s.isSubscribed)
      : true;
    const matchSearch = search
      ? s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchCategory && matchStatus && matchSearch;
  });

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="mb-6 text-3xl font-bold text-dark">Aboneler</h1>

        {error && <p className="mb-4 text-sm text-accent-red">{error}</p>}
        {message && <p className="mb-4 text-sm text-primary">{message}</p>}

        <div className="mb-8 flex flex-wrap gap-6">
          {/* Manuel ekleme */}
          <div className="max-w-md flex-1 rounded-2xl bg-card p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold text-dark">Yeni Abone Ekle</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input label="İsim" id="name" type="text" value={name}
                onChange={(e) => setName(e.target.value)} placeholder="Ahmet Yılmaz" required />
              <Input label="E-posta" id="email" type="email" value={email}
                onChange={(e) => setEmail(e.target.value)} placeholder="ahmet@mail.com" required />
              <div className="flex flex-col gap-1">
                <label htmlFor="category" className="text-sm font-medium text-dark">Kategori</label>
                <select
                  id="category"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-dark outline-none focus:border-primary"
                >
                  <option value="">Kategori seçin</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? 'Ekleniyor...' : 'Ekle'}
              </Button>
            </form>
          </div>

          {/* CSV import */}
          <div className="max-w-md flex-1 rounded-2xl bg-card p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold text-dark">CSV ile Toplu Ekle</h2>
            <form onSubmit={handleImport} className="flex flex-col gap-4">
              <p className="text-sm text-muted">
                CSV formatı: name,email (ilk satır başlık). Yukarıda kategori seçiliyse hepsi o kategoriye eklenir.
              </p>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => setFile(e.target.files[0])}
                className="text-sm text-dark"
              />
              <Button type="submit" disabled={loading}>
                {loading ? 'Yükleniyor...' : 'İçe Aktar'}
              </Button>
            </form>
          </div>
        </div>

        {/* Filtreleme çubuğu */}
        <div className="mb-4 flex flex-wrap items-end gap-4 rounded-2xl bg-card p-4 shadow-sm">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-muted">Ara</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="İsim veya email"
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-dark outline-none focus:border-primary"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-muted">Kategori</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-dark outline-none focus:border-primary"
            >
              <option value="">Tümü</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-muted">Durum</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-dark outline-none focus:border-primary"
            >
              <option value="">Tümü</option>
              <option value="active">Abone</option>
              <option value="inactive">Çıkmış</option>
            </select>
          </div>
        </div>

        {/* Liste */}
        <div className="rounded-2xl bg-card p-6 shadow-lg">
          <h2 className="mb-4 text-lg font-semibold text-dark">
            Aboneler ({filteredSubscribers.length})
          </h2>
          {filteredSubscribers.length === 0 ? (
            <p className="text-muted">Gösterilecek abone yok.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {filteredSubscribers.map((s) => (
                <li key={s.id} className="flex items-center justify-between rounded-lg border border-gray-100 p-4">
                  <div>
                    <p className="font-medium text-dark">{s.name}</p>
                    <p className="text-sm text-muted">{s.email}</p>
                    <p className="text-xs text-primary">
                      {s.Category ? s.Category.name : 'Kategorisiz'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleSubscribe(s)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                        s.isSubscribed
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                    >
                      {s.isSubscribed ? 'Abone ✓' : 'Çıkmış'}
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="rounded-lg px-3 py-1 text-sm font-medium text-accent-red transition-colors hover:bg-accent-red/10"
                    >
                      Sil
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}