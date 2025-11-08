import React from 'react';
import { Link } from 'react-router-dom';
import './PostCard.css';

interface PostCardProps {
    username: string;
    userID: string;
    content: string;
    date: Date;
};

const PostCard: React.FC<PostCardProps> = ({
    username,
    userID,
    content,
    date
}) => {
    return (
        <div className='post-card'>
            <div className='post-meta'>
                <div className='post-user'>
                    <Link to={`/profile/${userID}`} className='post-username'>
                        @{username}
                    </Link>
                </div>
                <span className='post-date'>
                    {new Date(date).toLocaleString()}
                </span>
            </div>

            <p>{content}</p>
        </div>
    )
};

export default PostCard;
