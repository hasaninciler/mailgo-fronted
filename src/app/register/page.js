'use client';

import { useState } from 'react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { registerUser } from '../../lib/api';

export default function RegisterPage() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== passwordConfirm) {
            setError('Şifreler eşleşmiyor');
            return;
        }

        setLoading(true);
        try {
            await registerUser({ name, email, password });
            router.push('/login');
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
                <p className="mb-6 text-sm text-muted">Hesabını Oluştur</p>
                {error && <p className="mb-4 text-sm text-accent-red">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input label="İsim" id="name" type="text" value={name}
                        onChange={(e) => setName(e.target.value)} placeholder="Hasan İnciler" required />
                    <Input label="E-posta" id="email" type="email" value={email}
                        onChange={(e) => setEmail(e.target.value)} placeholder="ornek@mail.com" required />
                    <Input label="Şifre" id="password" type="password" value={password}
                        onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
                    <Input label="Şifre Tekrar" id="passwordConfirm" type="password" value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)} placeholder="••••••••" required />
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Kayıt olunuyor...' : 'Kayıt Ol'}
                    </Button>
                </form>
                <p className="mt-4 text-center text-sm text-muted">
                    Zaten hesabın var mı?{' '}
                    <Link href="/login" className="text-primary hover:underline">
                        Giriş yap
                    </Link>
                </p>
            </div>
        </div>
    );
}