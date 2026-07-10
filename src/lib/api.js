const API_URL = 'http://localhost:5001/api';

export async function registerUser(data) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || 'hata oluştu');
  }

  return result;
}

export async function loginUser(data) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || 'hata oluştu');
  }

  return result;
}
export async function getCategories() {
  const res = await fetch(`${API_URL}/categories`);
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || 'Kategoriler alınamadı');
  return result;
}

export async function createCategory(data) {
  const res = await fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || 'Kategori oluşturulamadı');
  return result;
}

export async function getCampaigns() {
  const res = await fetch(`${API_URL}/campaigns`);
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || 'Kampanyalar alınamadı');
  return result;
}

export async function createCampaign(data) {
  const res = await fetch(`${API_URL}/campaigns`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || 'Kampanya oluşturulamadı');
  return result;
}
export async function getSubscribers() {
  const res = await fetch(`${API_URL}/subscribers`);
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || 'Aboneler alınamadı');
  return result;
}

export async function createSubscriber(data) {
  const res = await fetch(`${API_URL}/subscribers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || 'Abone oluşturulamadı');
  return result;
}

export async function importSubscribers(formData) {
  const res = await fetch(`${API_URL}/subscribers/import`, {
    method: 'POST',
    body: formData,
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || 'İçe aktarma başarısız');
  return result;
}

export async function getAnalytics(startDate, endDate) {
  let url = `${API_URL}/analytics`;
  if (startDate && endDate) {
    url += `?startDate=${startDate}&endDate=${endDate}`;
  }
  const res = await fetch(url);
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || 'Analitik veriler alınamadı');
  return result;
}