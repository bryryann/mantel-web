import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { countLikes, likePost, hasUserLikedPost } from '@/services/postActionsServices';
import './PostActions.css';
import { useAppSelector } from '@/hooks/hooks';
import { selectAccessToken, selectUser } from '@/features/auth/authSelectors';

interface PostActionsProps {
    postID: number;
};

const PostActions: React.FC<PostActionsProps> = ({
    postID
}) => {
    const user = useAppSelector(selectUser);
    const token = useAppSelector(selectAccessToken);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likes, setLikes] = useState<number>(0);

    useEffect(() => {
        const fetchPostData = async () => {
            const likesCount = await countLikes(postID);
            if (user) {
                const hasLiked = await hasUserLikedPost(user.id, postID);
                setIsLiked(hasLiked);
            }

            setLikes(likesCount);
        }

        fetchPostData();
    }, [postID, user]);

    const onLike = async () => {
        if (!user || isLiked) return;

        setIsLiked(true);
        setLikes(prev => prev + 1);

        try {
            await likePost(token!, postID);
        } catch (err) {
            setIsLiked(false);
            setLikes(prev => prev - 1);
        }
    }

    return (
        <div className='post-actions-container'>
            <button
                onClick={onLike}
                className={`post-actions-like-btn ${isLiked ? "liked" : ""}`}
            >
                {isLiked ? <FaHeart /> : <FaRegHeart />}
                {likes}
            </button>
        </div>
    );
};

export default PostActions;
