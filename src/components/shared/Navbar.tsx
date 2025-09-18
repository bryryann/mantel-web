import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { logoutUser as logoutUserThunk } from '@/features/auth/authThunks';
import { selectUser } from '@/features/auth/authSelectors';
import { ProfileDropdown } from '@/components/shared';
import Toast from '@/utils/toast';
import './Navbar.css';

const Navbar = () => {
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
                <h1>Mantel</h1>

            </div>
            <ProfileDropdown
                user={user!}
                onLogout={onLogout}
            />
        </nav>
    );
};

export default Navbar;
