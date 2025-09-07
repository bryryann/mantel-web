import { useForm } from 'react-hook-form';
import { Button, Input } from '@/components/ui';
import { useAppDispatch } from '@/hooks/hooks';
import { login as loginUserThunk } from '@/features/auth/authThunks';
import './LoginForm.css';

interface FormData {
    username: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        dispatch(loginUserThunk(data))
            .unwrap()
            .then(() => {
                // TODO: Improve login success behaviour
                console.log('user logged in succesfully');
            })
            .catch(err => {
                // TODO: Improve login failure behaviour
                console.error('login error:', err);
            });
    };

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
            <Button type='submit'>Log In</Button>
        </form>
    );
};

export default LoginForm;
