import { useAppDispatch } from '@/hooks/hooks';
import { logoutUser as logoutUserThunk } from '@/features/auth/authThunks';
import { Button } from '@/components/ui';
import './Navbar.css';

const Navbar = () => {
    const dispatch = useAppDispatch();

    const onClick = () => {
        dispatch(logoutUserThunk())
            .unwrap()
            .then(() => {
                console.log('logged out successfully');
            })
            .catch(err => {
                console.error('logout error:', err);
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
