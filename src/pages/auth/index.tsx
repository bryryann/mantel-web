import AuthLayout from '@/layouts/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { useState } from 'react';

const AuthPage = () => {
    const [formType, setFormType] = useState<'login' | 'register'>('login');

    return (
        <AuthLayout title={formType === 'login' ? 'Login' : 'Register'}>
            <div style={{ marginBottom: '1rem' }}>
                <button
                    onClick={() => setFormType('login')}
                    style={{ marginRight: '1rem', fontWeight: formType === 'login' ? 'bold' : 'normal' }}
                >
                    Login
                </button>
                <button
                    onClick={() => setFormType('register')}
                    style={{ fontWeight: formType === 'register' ? 'bold' : 'normal' }}
                >
                    Register
                </button>
            </div>

            {formType === 'login' ? <LoginForm /> : <RegisterForm />}
        </AuthLayout>
    );
};

export default AuthPage;
