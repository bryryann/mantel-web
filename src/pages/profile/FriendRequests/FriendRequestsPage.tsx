import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/shared';
import { RequestCard } from '@/components/friend_requests';
import { FriendRequest } from '@/types';
import { fetchFriendRequests } from '@/services/friendsServices';
import { useAppSelector } from '@/hooks/hooks';
import { selectAccessToken } from '@/features/auth/authSelectors';
import './FriendRequestsPage.css';

const FriendRequestsPage: React.FC = () => {
    const [requests, setRequests] = useState<FriendRequest[]>([]);
    const token = useAppSelector(selectAccessToken);

    useEffect(() => {
        const fetchRequests = async () => {
            if (token) {
                const reqs = await fetchFriendRequests(token, 'received');

                setRequests(reqs);
            }
        }

        fetchRequests();
    }, []);

    return (
        <div className='friend-requests-page'>
            <Navbar />
            <div className="friend-requests-content">
                {requests && requests.length > 0 ? (
                    <ul className="friend-requests-list">
                        {requests.map(r => (
                            <li key={r.id} className="friend-requests-list-item">
                                <RequestCard targetID={r.sender_id} requestID={r.id} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="friend-requests-empty">No Friend Requests found.</p>
                )}
            </div>
        </div>
    );
};

export default FriendRequestsPage;
