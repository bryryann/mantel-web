import React, { useState, useEffect } from 'react';
import { fetchUser, UserProfile } from '@/services/userServices';
import './RequestCard.css';

interface RequestCardProps {
    requestID: string;
    targetID: string;
}

const RequestCard: React.FC<RequestCardProps> = ({ targetID }) => {
    const [target, setTarget] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetchUser(targetID);
            setTarget(res.user);
        };

        fetchData();
    }, [targetID]);

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
                >
                    Decline
                </button>
            </div>
        </article>
    );
};

export default RequestCard;
