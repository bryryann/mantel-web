import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { countLikes } from '@/services/postServices';
import './PostActions.css';

interface PostActionsProps {
    postID: number;
};

const PostActions: React.FC<PostActionsProps> = ({
    postID
}) => {
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likes, setLikes] = useState<number>(0);

    useEffect(() => {
        const fetchPostData = async () => {
            const likesCount = await countLikes(postID);

            setLikes(likesCount);
        }

        fetchPostData();
    }, [isLiked]);

    return (
        <div className='post-actions-container'>
            <button
                className={`post-actions-like-btn ${isLiked ? "liked" : ""}`}
            >
                {isLiked ? <FaHeart /> : <FaRegHeart />}
                {likes}
            </button>
        </div>
    );
};

export default PostActions;
