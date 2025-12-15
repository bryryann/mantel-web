import React, { useState, useEffect } from 'react';
import { fetchUser, UserProfile } from '@/services/userServices';
import { useAppSelector } from '@/hooks/hooks';
import { selectAccessToken } from '@/features/auth/authSelectors';
import { rejectFriendRequest } from '@/services/friendsServices';
import Toast from '@/utils/toast';
import './RequestCard.css';

interface RequestCardProps {
    requestID: string;
    targetID: string;
}

const RequestCard: React.FC<RequestCardProps> = ({ requestID, targetID }) => {
    const [target, setTarget] = useState<UserProfile | null>(null);

    const accessToken = useAppSelector(selectAccessToken);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetchUser(targetID);
            setTarget(res.user);
        };

        fetchData();
    }, [targetID]);

    const onReject = async () => {
        if (!accessToken || !requestID) return;

        try {
            const res = await rejectFriendRequest(accessToken, requestID);

            if (res === 1) {
                Toast.success('Successfully rejected friendship request.');
            }
        } catch (err: any) {
            console.error(err);

            Toast.error(err.message || 'An unknown error occurred.');
        }
    }

    if (!target) {
        return (
            <div className="request-card request-card--loading">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <article className="request-card">
            <div className="request-card-user">
                <div className="request-card-info">
                    <h3 className="request-card-username">
                        {target.username}
                    </h3>
                </div>
            </div>

            <div className="request-card-actions">
                <button
                    className="request-card-btn request-card-btn--accept"
                    type="button"
                >
                    Accept
                </button>

                <button
                    className="request-card-btn request-card-btn--decline"
                    type="button"
                    onClick={onReject}
                >
                    Decline
                </button>
            </div>
        </article>
    );
};

export default RequestCard;
