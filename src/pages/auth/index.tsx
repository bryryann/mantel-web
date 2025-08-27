import { useState } from 'react';
import AuthLayout from '@/layouts/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import Button from '@/components/Button';
import './AuthPage.css';

const AuthPage = () => {
    const [formType, setFormType] = useState<'login' | 'register'>('login');

    return (
        <AuthLayout title={formType === 'login' ? 'Login' : 'Register'}>
            <div className='auth-div-btns'>
                <Button
                    onClick={() => setFormType('login')}
                    style={{ fontWeight: formType === 'login' ? 'bold' : 'normal' }}
                >
                    Login

                </Button>
                <Button
                    onClick={() => setFormType('register')}
                    style={{ fontWeight: formType === 'register' ? 'bold' : 'normal' }}
                >
                    Register
                </Button>
            </div>

            {formType === 'login' ? <LoginForm /> : <RegisterForm />}
        </AuthLayout>
    );
};

export default AuthPage;
