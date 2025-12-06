import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { logoutUser as logoutUserThunk } from '@/features/auth/authThunks';
import { selectUser } from '@/features/auth/authSelectors';
import { ProfileDropdown } from '@/components/shared';
import { Button } from '@/components/ui';
import Toast from '@/utils/toast';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);

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
                    <h1>MANTEL</h1>
                </Link>
            </div>

            <div className='navbar-actions'>
                {user ? (
                    <ProfileDropdown
                        user={user!}
                        onLogout={onLogout}
                    />
                ) : (
                    <Button
                        className='login-btn'
                        onClick={() => navigate('/auth')}
                    >
                        Log In / Sign Up
                    </Button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
