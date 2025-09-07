import { useForm } from 'react-hook-form';
import { Input, Button } from '@/components/ui'
import { useAppDispatch } from '@/hooks/hooks';
import { register as registerUserThunk } from '@/features/auth/authThunks';
import './RegisterForm.css';

interface FormData {
    username: string;
    email: string;
    password: string;
}

const RegisterForm: React.FC = () => {
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        dispatch(registerUserThunk(data))
            .unwrap()
            .then(() => {
                // TODO: Improve register success behaviour
                console.log('user registered and logged in');
            })
            .catch(err => {
                // TODO: Improve register failure behaviour
                console.error('registration error:', err);
            });
    };

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
