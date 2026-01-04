import { useForm } from 'react-hook-form';
import { useAppSelector } from '@/hooks/hooks';
import { selectAccessToken } from '@/features/auth/authSelectors';
import { Button, Input } from '@/components/ui';
import './ProfileSettingsForm.css';

interface FormData {
    username?: string;
    password?: string;
    confirmPassword?: string;
};

const ProfileSettingsForm = () => {
    const _token = useAppSelector(selectAccessToken);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>();

    const password = watch('password');

    const onSubmit = (data: FormData) => {
        const { username, password } = data;

        if (!username && !password) return;

        const payload: Partial<FormData> = {};

        if (username) payload.username = username;
        if (password) payload.password = password;

        console.log('submitting:', payload);

        // updateProfile(payload, token);
    };

    return (
        <div className='profile-settings-form__container'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label='Username'
                    {...register('username', {
                        minLength: {
                            value: 3,
                            message: 'Username must be at least 3 characters long',
                        },
                    })}
                    error={errors.username?.message}
                />

                <div className='profile-settings-form__password'>
                    <Input
                        label='New Password'
                        type='password'
                        {...register('password', {
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters long',
                            },
                        })}
                        error={errors.password?.message}
                    />

                    <Input
                        label='Confirm Password'
                        type='password'
                        {...register('confirmPassword', {
                            validate: (value) =>
                                (!password || value === password || 'Password do not match'),
                        })}
                        error={errors.confirmPassword?.message}
                    />
                </div>

                <Button type='submit'>Save Changes</Button>
            </form>
        </div>
    );
};

export default ProfileSettingsForm;
