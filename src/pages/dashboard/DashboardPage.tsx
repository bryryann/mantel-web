import { useState, useEffect } from 'react';
import { useAppSelector } from '@/hooks/hooks';
import { selectAccessToken } from '@/features/auth/authSelectors';
import { MainLayout } from '@/layouts';
import { Post } from '@/types/posts';
import { getFeed } from '@/services/feedServices';
import { FeedPostCard } from '@/components/feed';
import './DashboardPage.css';

const DashboardPage = () => {
    const [error, setError] = useState<string | null>(null);
    const [feed, setFeed] = useState<Post[]>([]);

    const token = useAppSelector(selectAccessToken);

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const res = await getFeed(token);

                setFeed(res.feed);
            } catch (err: any) {
                console.error(err);
                setError(err.message || 'An unknown error occurred.');
            }
        }

        fetchData();
    }, [token]);

    if (error) return <div className="error-msg">Error: {error}</div>;

    return (
        <MainLayout>
            <ul className='feedresults-list'>
                {feed.map(p => (
                    <li key={p.id} className='feedresults-item'>
                        <FeedPostCard
                            userID={p.user_id}
                            postID={p.id}
                            content={p.content}
                            date={p.created_at}
                        />
                    </li>
                ))}
            </ul>
        </MainLayout>
    );
};

export default DashboardPage;
