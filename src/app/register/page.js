'use client';

import { useState } from 'react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Link from 'next/link';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Kayıt Denemesi', { email, password, passwordConfirm, name });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-bg-subtle">
            <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-lg">
                <h1 className="mb-2 text-3xl font-bold text-dark">mailGo</h1>
                <p className="mb-6 text-sm text-muted">Hesabını Oluştur</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        label="İsim"
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Hasan İnciler"
                        required
                    />
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
                    <Input
                        label="Şifre Tekrar"
                        id="passwordConfirm"
                        type="password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        placeholder="••••••••"
                        required
                    />
                    <Button type="submit">Kayıt Ol</Button>
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