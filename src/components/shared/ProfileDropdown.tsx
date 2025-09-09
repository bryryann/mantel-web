import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui';
import './ProfileDropdown.css';

interface ProfileDropdownProps {
    username: string;
    onLogout: () => void;
};

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ username, onLogout }) => {
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
                👤 {username}
            </Button>

            {isOpen && (
                <div className="dropdown-menu">
                    <a href="/profile" className="dropdown-item">Profile</a>
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
