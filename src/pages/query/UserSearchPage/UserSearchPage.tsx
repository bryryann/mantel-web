import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MainLayout } from '@/layouts';
import { UserCard } from '@/components/query';
import { searchUsers, UserPublic } from '@/services/queryServices';
import Toast from '@/utils/toast';
import './UserSearchPage.css';

const UserSearchPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [hasLoaded, setHasLoaded] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<UserPublic[]>([]);

    useEffect(() => {
        const query = searchParams.get('search');
        if (!query) return;

        const fetchSearchResults = async () => {
            try {
                const results = await searchUsers(query);

                setSearchResults(results.users);
            } catch (err: any) {
                console.error(err);
                setSearchResults([]);
                Toast.error(err.message || 'An unknown error occurred.');
            }

            setHasLoaded(true);
        }

        fetchSearchResults();
    }, [searchParams]);

    console.log(searchResults);

    if (!hasLoaded) return <div className='loading-msg'>Loading...</div>

    return (
        <MainLayout>
            <div className='usersearchresults-content'>
                {hasLoaded && searchResults.length > 0 ? (
                    <ul className='usersearchresults-list'>
                        {searchResults.map(s => (
                            <li key={s.id} className='usersearchresults-item'>
                                <UserCard
                                    followers={s.data.follows.followers_count}
                                    following={s.data.follows.following_count}
                                    friends={s.data.friends}
                                    {...s}

                                    onClick={(id: string) => { navigate(`/profile/${id}`) }}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className='usersearchresults-empty'>No results.</p>
                )}
            </div>
        </MainLayout>
    );
};

export default UserSearchPage;
