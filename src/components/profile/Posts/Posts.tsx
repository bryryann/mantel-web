import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { Post } from '@/types/posts';
import { PostCard } from '@/components/posts';
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
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>(defaultSort);

    const loadPosts = useCallback(async () => {
        if (!userID) return;
        try {
            setError(null);

            const data = await fetchPostsFromUser(userID, sortOrder);
            setPosts(data.posts);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'An unknown error occurred.');
        }
    }, [userID, sortOrder]);

    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(e.target.value as 'newest' | 'oldest');
    }

    if (error) return <div className='error-msg'>Error: {error}</div>;

    return (
        <div className='user-posts'>
            <div className='user-posts-header'>
                <h3>{isOwnProfile ? 'Your Posts' : `${username}'s Posts`}</h3>
                <select
                    className='posts-filter'
                    value={sortOrder}
                    onChange={handleSelectChange}
                >
                    <option value='newest'>Newest</option>
                    <option value='oldest'>Oldest</option>
                </select>
            </div>

            <div className='posts-list'>
                {posts.length > 0 ? (
                    posts.map(post => (
                        <PostCard
                            key={post.id}
                            username={username}
                            userID={userID}
                            postID={post.id}
                            content={post.content}
                            date={post.created_at}
                        />
                    ))
                ) : (
                    <p className='end-message'>No posts yet.</p>
                )}
            </div>
        </div>
    );
}

export default Posts;
