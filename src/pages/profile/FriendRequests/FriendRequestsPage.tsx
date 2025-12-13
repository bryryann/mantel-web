import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/shared';
import { FriendRequest } from '@/types';
import './FriendRequestsPage.css';
import { fetchFriendRequests } from '@/services/friendsServices';
import { useAppSelector } from '@/hooks/hooks';
import { selectAccessToken } from '@/features/auth/authSelectors';

const FriendRequestsPage: React.FC = () => {
    const [requests, setRequests] = useState<FriendRequest[]>([]);
    const token = useAppSelector(selectAccessToken);

    useEffect(() => {
        const fetchRequests = async () => {
            if (token) {
                const reqs = await fetchFriendRequests(token);

                setRequests(reqs);
            }
        }

        fetchRequests();
    }, []);

    return (
        <div className='friend-requests-page'>
            <Navbar />
            <div className='friend-requests-content'>
                {requests ? (
                    <p>render requests here</p>
                ) : (
                    <p>No Friend Requests found.</p>
                )}
            </div>
        </div>
    );
};

export default FriendRequestsPage;
