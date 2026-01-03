import { useState, useEffect } from 'react';
import { fetchUser, UserProfile } from '@/services/userServices';
import Toast from '@/utils/toast';
import PostActions from '@/components/posts/PostActions/PostActions';
import './FeedPostCard.css';

interface FeedPostCardProps {
    userID: string;
    postID: number;
    content: string;
    date: Date;
}

const FeedPostCard: React.FC<FeedPostCardProps> = ({
    userID,
    postID,
    content,
    date
}) => {
    const [author, setAuthor] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchAuthorData = async () => {
            try {
                const res = await fetchUser(userID);

                setAuthor(res.user);
            } catch (err: any) {
                console.error(err);
                Toast.error(err.message || 'An unknown error has occurred.');
            }
        };

        fetchAuthorData();
    }, []);

    if (!author) return;

    return (
        <div className='feed-post-card'>
            <div className='feed-post-card__header'>
                <div className='feed-post-card__user-info'>
                    <span className='feed-post-card__username'>
                        {author.username}
                    </span>
                    <span className='feed-post-card__date'>
                        {new Date(date).toLocaleString()}
                    </span>
                </div>
            </div>

            <div className='feed-post-card__content'>
                <p>{content}</p>
            </div>

            <PostActions postID={postID} />
        </div>
    );
};

export default FeedPostCard;
