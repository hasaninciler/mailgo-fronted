'use client';

import { useState } from 'react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Giriş denemesi:', { email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-subtle">
      <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-lg">
        <h1 className="mb-2 text-3xl font-bold text-dark">mailGo</h1>
        <p className="mb-6 text-sm text-muted">Hesabına giriş yap</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="E-posta"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@mail.com"
            required
          />
          <Input
            label="Şifre"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <Button type="submit">Giriş Yap</Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted">
                    Hesabın yok mu? {' '}
                    <Link href="/register" className="text-primary hover:underline">
                        Kayıt Ol
                    </Link>
                </p>
      </div>
    </div>
  );
}