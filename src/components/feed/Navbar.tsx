import { useAppDispatch } from '@/hooks/hooks';
import { logoutUser as logoutUserThunk } from '@/features/auth/authThunks';
import { Button } from '@/components/ui';
import Toast from '@/utils/toast';
import './Navbar.css';

const Navbar = () => {
    const dispatch = useAppDispatch();

    const onClick = () => {
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
            <Button
                variant='danger'
                onClick={onClick}
            >
                Log out
            </Button>
        </nav>
    );
};

export default Navbar;
