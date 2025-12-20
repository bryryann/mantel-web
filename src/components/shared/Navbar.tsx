import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { logoutUser as logoutUserThunk } from '@/features/auth/authThunks';
import { selectAccessToken, selectUser } from '@/features/auth/authSelectors';
import { ProfileDropdown } from '@/components/shared';
import { Button } from '@/components/ui';
import Toast from '@/utils/toast';
import { countReceivedRequests } from '@/services/friendsServices';
import Sidebar from './Sidebar';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [pendingRequests, setPendingRequests] = useState<number>(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const user = useAppSelector(selectUser);
    const token = useAppSelector(selectAccessToken);

    useEffect(() => {
        if (!token) return;

        const fetchRequests = async () => {
            const res = await countReceivedRequests(token);

            setPendingRequests(res);
        }

        fetchRequests();
    }, [token]);

    const onLogout = () => {
        dispatch(logoutUserThunk())
            .unwrap()
            .then(() => {
                Toast.info('Logged out successfully.');
            })
            .catch(err => Toast.error('Logout error: ' + err));
    };

    const toggleSidebar = () => {
        console.log('toggle');
        setIsSidebarOpen(prev => !prev);
    }

    return (
        <>
            <nav className='navbar-container'>
                <button
                    className="hamburger-btn"
                    onClick={toggleSidebar}
                    aria-label="Open sidebar"
                >
                    ☰
                    {pendingRequests > 0 && (
                        <span className="sidebar-badge">
                            {pendingRequests > 99 ? '99+' : pendingRequests}
                        </span>
                    )}
                </button>

                <div>
                    <Link to='/' className='navbar-logo'>
                        <h1>MANTEL</h1>
                    </Link>
                </div>

                <div className='navbar-actions'>
                    {user ? (
                        <ProfileDropdown user={user!} onLogout={onLogout} />
                    ) : (
                        <Button className='login-btn' onClick={() => navigate('/auth')}>
                            Log In / Sign Up
                        </Button>
                    )}
                </div>
            </nav>

            <Sidebar
                open={isSidebarOpen}
                pendingRequests={pendingRequests}
                onClose={toggleSidebar}
            />
        </>
    );
};

export default Navbar;
