import { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MainLayout } from '@/layouts';
import { UserCard } from '@/components/query';
import { searchUsers, UserPublic } from '@/services/queryServices';
import Toast from '@/utils/toast';
import './UserSearchPage.css';
import { Loading } from '@/components/shared';

const UserSearchPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [searchResults, setSearchResults] = useState<UserPublic[]>([]);

    const [searchParams, _] = useSearchParams();
    const observerRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const query = searchParams.get('search');
        if (!query) return;

        setSearchResults([]);
        setPage(1);
        setHasMore(true);
        setHasLoaded(false);
    }, [searchParams]);

    useEffect(() => {
        const query = searchParams.get('search');
        if (!query || isLoading || !hasMore) return;

        let cancelled = false;

        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const res = await searchUsers(query, page);

                if (!cancelled) {
                    setSearchResults(prev =>
                        page === 1 ? res.users : [...prev, ...res.users]
                    );

                    if (res.users.length === 0) {
                        setHasMore(false);
                    }
                }
            } catch (err: any) {
                if (!cancelled) {
                    Toast.error(err.message || 'An unknown error occurred.');
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                    setHasLoaded(true);
                }
            }
        };

        fetchUsers();

        return () => {
            cancelled = true;
        };
    }, [page, searchParams]);

    useEffect(() => {
        if (!observerRef.current || !hasMore || isLoading) return;

        const observer = new IntersectionObserver(
            (entries: IntersectionObserverEntry[]) => {
                if (entries[0].isIntersecting) {
                    setPage(prev => prev + 1);
                }
            }
        );

        observer.observe(observerRef.current);
        return () => observer.disconnect();
    }, [hasMore, isLoading]);

    if (!hasLoaded) return <Loading />

    return (
        <MainLayout>
            <div className="usersearchresults-content">
                {searchResults.length > 0 ? (
                    <ul className="usersearchresults-list">
                        {searchResults.map(s => (
                            <li key={s.id} className="usersearchresults-item">
                                <UserCard
                                    followers={s.profile.follows.followers_count}
                                    following={s.profile.follows.following_count}
                                    friends={s.profile.friends}
                                    {...s}
                                    onClick={(id: string) => navigate(`/profile/${id}`)}
                                />
                            </li>
                        ))}
                    </ul>
                ) : hasLoaded ? (
                    <p className="usersearchresults-empty">No results.</p>
                ) : (
                    <Loading />
                )}

                {/* Scroll trigger */}
                {hasMore && <div ref={observerRef} className="scroll-loader">
                    {isLoading && <p>Loading more...</p>}
                </div>}
            </div>
        </MainLayout>
    );
};

export default UserSearchPage;
