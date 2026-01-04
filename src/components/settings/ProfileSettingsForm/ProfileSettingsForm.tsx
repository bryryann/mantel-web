import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { selectAccessToken } from '@/features/auth/authSelectors';
import { Button, Input } from '@/components/ui';
import { updateProfile } from '@/features/auth/authThunks';
import Toast from '@/utils/toast';
import './ProfileSettingsForm.css';

interface FormData {
    username?: string;
    password?: string;
    confirmPassword?: string;
};

const ProfileSettingsForm = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(selectAccessToken);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>();

    const password = watch('password');

    const onSubmit = async (data: FormData) => {
        const { username, password } = data;

        if ((!username && !password) || !token) return;

        const payload: Partial<FormData> = {};

        if (username) payload.username = username;
        if (password) payload.password = password;

        try {
            await dispatch(updateProfile({ username, password })).unwrap();
            Toast.success('Successfully updated profile settings');
        } catch (err: any) {
            Toast.error(err)
        }
    };

    return (
        <div className='profile-settings-form__container'>
            <form onSubmit={() => handleSubmit(onSubmit)}>
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
