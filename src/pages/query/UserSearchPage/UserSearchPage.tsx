import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { User } from '@/types/auth';
import { MainLayout } from '@/layouts';
import './UserSearchPage.css';
import { searchUsers } from '@/services/queryServices';
import Toast from '@/utils/toast';

const UserSearchPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchResults, setSearchResults] = useState<User[]>([]);

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
        }

        fetchSearchResults();
    }, [searchParams]);

    if (searchResults.length === 0) return <div className='loading-msg'>Loading...</div>

    console.log(searchResults);

    return (
        <MainLayout>
            <p>{searchParams.get('search')}</p>
        </MainLayout>
    );
};

export default UserSearchPage;
