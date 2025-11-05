import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui';
import { User } from '@/types/auth';
import './ProfileDropdown.css';

interface ProfileDropdownProps {
    user: User;
    onLogout: () => void;
};

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    return (
        <div className="profile-dropdown-wrapper" ref={menuRef}>
            <Button
                className="profile-button"
                onClick={() => setIsOpen(!isOpen)}
            >
                👤 {user.username}
            </Button>

            {isOpen && (
                <div className="dropdown-menu">
                    <a href={`/profile/${user.id}`} className="dropdown-item">Profile</a>
                    <a href="/settings" className="dropdown-item">Settings</a>
                    <Button
                        onClick={onLogout}
                        className="dropdown-item logout-button"
                        variant='danger'
                    >
                        Logout
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
