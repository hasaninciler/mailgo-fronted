'use client';

import { useState } from 'react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Şifre Sıfırlama Denemesi', { email });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-bg-subtle">
            <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-lg">
                <Image src="/logo.png" alt="mailGo" width={130} height={40} className="mb-4" />
                <p className="mb-6 text-sm text-muted">Şifremi Unuttum</p>

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
                    <Button type="submit">Şifremi Sıfırla</Button>
                </form>
                <p className="mt-4 text-center text-sm text-muted">
                    Şifreni hatırladın mı?{' '}
                    <Link href="/login" className="text-primary hover:underline">
                        Giriş yap
                    </Link>
                </p>
            </div>
        </div>
    );
}