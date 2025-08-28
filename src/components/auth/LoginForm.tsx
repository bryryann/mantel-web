import { useForm } from 'react-hook-form';
import Input from '@/components/Input';
import Button from '@/components/Button';
import './LoginForm.css';

interface FormData {
    username: string;
    password: string;
}

const LoginForm: React.FC = () => {
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
                {...register('username', { required: 'Username is required' })}
                error={errors.username?.message}
            />
            <Input
                label='Password'
                type='password'
                {...register('password', { required: 'Password is required' })}
                error={errors.password?.message}
            />
            <Button type='submit'>Submit</Button>
        </form>
    );
};

export default LoginForm;
