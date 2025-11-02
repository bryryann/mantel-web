import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/hooks/hooks';
import { Button, TextArea } from '@/components/ui';
import Toast from '@/utils/toast';
import './NewPostForm.css';

interface FormData {
    content: string;
}

const NewPostForm = () => {
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log('posting....');
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextArea 
                label='New Post'
                name='new-post-textarea'
                error={errors.content?.message}
                {...register('content', { required: 'Post content is required' })}
                className='new-post-textarea'
            />

            <Button type='submit'>Post</Button>
        </form>
    );
};

export default NewPostForm;
