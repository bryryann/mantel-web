import React, { useState, useEffect, useCallback } from 'react';
import { Post } from '@/types/posts';
import './Posts.css';
import { fetchPostsFromUser } from '@/services/postServices';

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
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState<string | null>();

    const loadPosts = useCallback(async () => {
        if (!userID) return;
        try {
            setError(null);

            const data = await fetchPostsFromUser(userID);
            setPosts(data.posts);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'An unknown error occurred.');
        }
    }, [userID]);

    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

    if (error) return <div className='error-msg'>Error: {error}</div>;

    return (
        <div className='user-posts'>
            <div className='user-posts-header'>
                <h3>{isOwnProfile ? 'Your Posts' : `${username}'s Posts`}</h3>
                <select >...</select>
            </div>

            <div className='posts-list'>
            </div>
        </div>
    );
}

export default Posts;
