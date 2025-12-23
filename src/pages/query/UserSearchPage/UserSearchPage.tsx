import { useSearchParams } from 'react-router-dom';
import './UserSearchPage.css';
import { MainLayout } from '@/layouts';

const UserSearchPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <MainLayout>
            <p>{searchParams.get('search')}</p>
        </MainLayout>
    );
};

export default UserSearchPage;
