import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { logoutUser as logoutUserThunk } from '@/features/auth/authThunks';
import { selectUser } from '@/features/auth/authSelectors';
import { ProfileDropdown } from '@/components/shared';
import Toast from '@/utils/toast';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);

    useEffect(() => {
        if (user === null) {
            navigate('/auth', {replace: true});
        }
    }, [user, navigate]);

    const onLogout = () => {
        dispatch(logoutUserThunk())
            .unwrap()
            .then(() => {
                Toast.info('Logged out successfully.');
            })
            .catch(err => {
                Toast.error('Logout error: ' + err);
            });
    };

    return (
        <nav className='navbar-container'>
            <div>
                <Link to='/' className='navbar-logo'>
                    <h1>Mantel</h1>
                </Link>
            </div>
            
            {user && (
                <ProfileDropdown
                    user={user!}
                    onLogout={onLogout}
                />
            )}

        </nav>
    );
};

export default Navbar;
