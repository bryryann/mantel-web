import { Link } from 'react-router-dom';
import { useAppSelector } from '@/hooks/hooks';
import { selectUser } from '@/features/auth/authSelectors';
import './Sidebar.css';

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
    const user = useAppSelector(selectUser);

    return (
        <>
            <div
                className={`sidebar-overlay ${open ? 'show' : ''}`}
                onClick={onClose}
            />

            <div className={`sidebar ${open ? 'open' : ''}`}>
                <button className='close-btn' onClick={onClose}>×</button>

                {user && (
                    <>
                        <ul className='sidebar-links'>
                            <li><Link to='/' onClick={onClose}>Home</Link></li>
                        </ul>

                        <p className='sidebar-section-title'>Your Account</p>

                        <ul className='sidebar-links'>
                            <li>
                                <Link to={`/profile/${user.id}`} onClick={onClose}>
                                    Profile
                                </Link>
                            </li>

                            <li>
                                <Link to='/friend-requests' onClick={onClose}>
                                    Friend Requests
                                </Link>
                            </li>

                            <li>
                                <Link to='/settings' onClick={onClose}>
                                    Settings
                                </Link>
                            </li>
                        </ul>
                    </>
                )}

                {!user && (
                    <ul className='sidebar-links'>
                        <li>
                            <Link to='/auth' onClick={onClose}>
                                Log In / Sign Up
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </>
    );
};

export default Sidebar;
