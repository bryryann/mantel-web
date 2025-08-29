import { useForm } from 'react-hook-form';
import Input from '@/components/Input';
import Button from '@/components/Button';
import './RegisterForm.css';

interface FormData {
    username: string;
    email: string;
    password: string;
}

const RegisterForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        // TODO: Submit to API.
        console.log('submitted with data:', data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                label='Username'
                type='text'
                {...register('username', { required: 'Username is required' })}
                error={errors.username?.message}
            />
            
            <Input
                label='Email'
                type='email'
                {...register('email', { required: 'Email is required' })}
                error={errors.email?.message}
            />

            <Input
                label='password'
                type='password'
                {...register('password', { required: 'Password is required' })}
                error={errors.password?.message}
            />

            <Button type='submit'>Create account</Button>
        </form>
    );
};

export default RegisterForm;
