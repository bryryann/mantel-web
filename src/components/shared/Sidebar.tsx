import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

interface SidebarProps {
    open: boolean;
    onClose: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
    return (
        <>
            <div
                className={`sidebar-overlay ${open ? 'show' : ''}`}
                onClick={onClose}
            />

            <div className={`sidebar ${open ? 'open' : ''}`}>
                <button className='close-btn' onClick={onClose}>×</button>

                <p className='sidebar-section-title'>Menu</p>
                <ul className='sidebar-links'>
                    <li><Link to='/friend-requests' onClick={onClose}>Friend Requests</Link></li>
                </ul>
            </div>
        </>
    );
};

export default Sidebar;
