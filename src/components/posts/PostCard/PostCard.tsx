import React from 'react';
import { Link } from 'react-router-dom';
import PostActions from '@/components/posts/PostActions/PostActions';
import './PostCard.css';

interface PostCardProps {
    username: string;
    userID: string;
    postID: number;
    content: string;
    date: Date;
};

const PostCard: React.FC<PostCardProps> = ({
    username,
    userID,
    postID,
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

            <PostActions postID={postID} />
        </div>
    )
};

export default PostCard;
