import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './PostActions.css';

const PostActions: React.FC = () => {
    const [isLiked, setIsLiked] = useState<boolean>(false);


    return (
        <div className='post-actions-container'>
            <button
                onClick={() => setIsLiked(prev => !prev)}
                className='post-actions-like-btn'
            >
                {isLiked ? <FaHeart /> : <FaRegHeart />}
            </button>
        </div>
    )
};

export default PostActions;
