import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '@/types/posts';
import { fetchPostsFromUser } from '@/services/postServices';
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
                {posts.length > 0 ? (
                    posts.map(post => (
                        <div key={post.id} className='post-card'>
                            <div className='post-meta'>
                                <div className='post-user'>
                                    <Link to={`/profile/${userID}`} className='post-username'>
                                        @{username}
                                    </Link>
                                </div>
                                <span className='post-date'>
                                    {new Date(post.created_at).toLocaleString()}
                                </span>
                            </div>

                            <p>{post.content}</p>
                        </div>
                    ))
                ) : (
                    <p className='end-message'>No posts yet.</p>
                )}
            </div>
        </div>
    );
}

export default Posts;
