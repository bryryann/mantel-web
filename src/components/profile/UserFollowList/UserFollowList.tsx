import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchFollowData } from '@/services/userServices';
import { User } from '@/types/auth';
import './UserFollowList.css';

type UserFollowListProps = {
    content: 'followees' | 'followers';
    userId: string;
};

const UserFollowList: React.FC<UserFollowListProps> = ({ content, userId }) => {
    const navigate = useNavigate();
    const [userList, setUserList] = useState<User[] | null>(null);

    useEffect(() => {
        const fetchContent = async (content: string) => {
            if (content === 'followers') {
                const followers = await fetchFollowData(userId, content);
                setUserList(followers);
            }
            else if (content === 'followees') {
                const followees = await fetchFollowData(userId, content);
                setUserList(followees);
            }
        }

        fetchContent(content);
    }, []);

    const handleUserClick = (id: string) => {
        navigate(`/profile/${id}`);
        window.location.reload();
    }

    if (userList === null) return <p>Loading...</p>;

    return (
        <div className="user-follows-list">
            <h3>{content === 'followees' ? 'FOLLOWING' : content.toUpperCase()}</h3>

            {userList && userList.length > 0 ? (
                <ul className="user-list">
                    {userList.map((user) => (
                        <li
                            key={user.id}
                            className="user-list-item"
                            onClick={() => handleUserClick(user.id)}
                        >
                            <span className="user-profile-link">{user.username}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="empty-user-list-message">N/A</p>
            )}
        </div>
    );
};

export default UserFollowList;
