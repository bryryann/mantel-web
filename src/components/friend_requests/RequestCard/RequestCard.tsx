import React, { useState, useEffect } from 'react';
import { fetchUser, UserProfile } from '@/services/userServices';
import { useAppSelector } from '@/hooks/hooks';
import { selectAccessToken } from '@/features/auth/authSelectors';
import { acceptFriendRequest, rejectFriendRequest } from '@/services/friendsServices';
import Toast from '@/utils/toast';
import './RequestCard.css';
import { Loading } from '@/components/shared';

interface RequestCardProps {
    requestID: string;
    targetID: string;
}

const RequestCard: React.FC<RequestCardProps> = ({ requestID, targetID }) => {
    const [target, setTarget] = useState<UserProfile | null>(null);
    const [accepted, setAccepted] = useState<boolean | null>(null);

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
                setAccepted(false);
                Toast.success('Successfully rejected friendship request.');
            }
        } catch (err: any) {
            console.error(err);
            Toast.error(err.message || 'An unknown error occurred.');
        }
    };

    const onAccept = async () => {
        if (!accessToken || !requestID) return;

        try {
            await acceptFriendRequest(accessToken, requestID);
            setAccepted(true);
            Toast.success('You are now friends!');
        } catch (err: any) {
            console.error(err);
            Toast.error(err.message || 'An unknown error occurred.');
        }
    };

    if (!target) {
        return (
            <div className="request-card request-card--loading">
                <Loading />
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
                {accepted === null && (
                    <>
                        <button
                            className="request-card-btn request-card-btn--accept"
                            type="button"
                            onClick={onAccept}
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
                    </>
                )}

                {accepted === true && (
                    <p className="request-card-status request-card-status--accepted">
                        You are now friends
                    </p>
                )}

                {accepted === false && (
                    <p className="request-card-status request-card-status--rejected">
                        Request rejected
                    </p>
                )}
            </div>
        </article>
    );
};

export default RequestCard;
