import React from 'react';
import './Posts.css';

interface PostsProps {
    userID: string;
    username: string;
    isOwnProfile: boolean;
    defaultSort?: 'oldest' | 'newest';
    pageSize?: number;
};

const Posts: React.FC<PostsProps> = ({
    userID,
    username,
    isOwnProfile,
    defaultSort = 'newest',
    pageSize = 10
}) => {
    return (
        <div className='user-posts'>
            <div className='user-posts-header'>
                <h3>{isOwnProfile ? 'Your Posts' : `${username}'s Posts`}</h3>
                <select >...</select>
            </div>

            <div className='posts-list'> ... </div>
        </div>
    );
}

export default Posts;
