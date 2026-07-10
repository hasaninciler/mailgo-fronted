'use client';

import { useState } from 'react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slices/authSlice';
import { loginUser } from '../../lib/api';

export default function LoginPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await loginUser({ email, password });
            dispatch(setCredentials({ user: data.user, token: data.token }));
            router.push('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-bg-subtle">
            <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-lg">
                <Image src="/logo.png" alt="mailGo" width={130} height={40} className="mb-4" />
                <p className="mb-6 text-sm text-muted">Hesabına giriş yap</p>
                {error && <p className="mb-4 text-sm text-accent-red">{error}</p>}
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
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                    </Button>
                </form>
                <p className="mt-4 text-center text-sm text-muted">
                    Hesabın yok mu?{' '}
                    <Link href="/register" className="text-primary hover:underline">
                        Kayıt Ol
                    </Link>
                </p>
                <p className="mt-4 text-center text-sm text-muted">
                    Şifreni mi unuttun?{' '}
                    <Link href="/forgot-password" className="text-primary hover:underline">
                        Şifremi Unuttum
                    </Link>
                </p>
            </div>
        </div>
    );
}