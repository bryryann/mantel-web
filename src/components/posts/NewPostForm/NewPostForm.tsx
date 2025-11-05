import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { selectAccessToken } from '@/features/auth/authSelectors';
import { Button, TextArea } from '@/components/ui';
import { newPost } from '@/services/postServices';
import Toast from '@/utils/toast';
import './NewPostForm.css';

interface FormData {
    content: string;
}

const NewPostForm = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(selectAccessToken);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        const submitData = async () => {
            try {
                const response = await newPost(token!, data.content)

                console.log(response);
                Toast.success('Post sent!');
            }
            catch (err) {
                Toast.error(`Error sending post: ${err}`);
            }
        }

        submitData();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextArea
                label='New Post'
                error={errors.content?.message}
                {...register('content', { required: 'Post content is required' })}
                className='new-post-textarea'
            />

            <Button type='submit'>Post</Button>
        </form>
    );
};

export default NewPostForm;
