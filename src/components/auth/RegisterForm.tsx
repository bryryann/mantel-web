import { useForm } from 'react-hook-form';
import { Input, Button } from '@/components/ui'
import { useAppDispatch } from '@/hooks/hooks';
import { register as registerUserThunk } from '@/features/auth/authThunks';
import Toast from '@/utils/toast';
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
                Toast.success('User successfully registered.');
            })
            .catch(err => {
                Toast.error('Registration error: ' + err);
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
