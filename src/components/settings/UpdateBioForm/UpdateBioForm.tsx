import { useForm } from 'react-hook-form';
import { selectAccessToken } from '@/features/auth/authSelectors';
import { Button, TextArea } from '@/components/ui';
import { useAppSelector } from '@/hooks/hooks';
import { updateBio } from '@/services/profileServices';
import Toast from '@/utils/toast';
import './UpdateBioForm.css';

interface FormData {
    bio: string;
};

const UpdateBioForm = () => {
    const token = useAppSelector(selectAccessToken)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        const { bio } = data;

        if (!bio || !token) return;

        try {
            await updateBio(token, bio);
            Toast.success('Successfully updated profile bio');
        } catch (err: any) {
            Toast.error(err);
        }
    };

    return (
        <div className='profile-settings-form__container'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextArea
                    className='profile-settings-textarea__bio'
                    cols={80}
                    label='Bio'
                    {...register('bio', {
                        maxLength: {
                            value: 255,
                            message: 'Bio must be no longer than 255 characters',
                        },
                    })}
                    error={errors.bio?.message}
                />

                <Button type='submit'>Save Changes</Button>
            </form>
        </div>
    );
};

export default UpdateBioForm;
