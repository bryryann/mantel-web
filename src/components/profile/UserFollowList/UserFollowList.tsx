import { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/hooks';
import { selectUser } from '@/features/auth/authSelectors';
import { fetchFollowData } from '@/services/userServices';
import { User } from '@/types';
import './UserFollowList.css';

type UserFollowListProps = {
    content: 'followees' | 'followers';
};

const UserFollowList: React.FC<UserFollowListProps> = ({ content }) => {
    const user = useAppSelector(selectUser);
    const [userList, setUserList] = useState<User[] | null>(null);

    useEffect(() => {
        const fetchContent = async (content) => {
            if (content === 'followers') {
                const followers = await fetchFollowData(user.id, content);
                setUserList(followers);
            }
            else if (content === 'followees') {
                const followees = await fetchFollowData(user.id, content);
                setUserList(followees);
            }
        }

        console.log(content);
        fetchContent(content);
    }, []);

    if (userList === null) return <p>Loading</p>;
    return (
        <div className='user-follows-list'>
            <h3>
                {
                    content === 'followees' ?
                        'FOLLOWING'
                        :
                        content.toUpperCase()
                }
            </h3>

            {userList && userList.length > 0 ? (
                <ul className='user-list'>
                    {userList.map((user) => (
                        <li key={user.id} className='user-list-item'>
                            <span>{user.username}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='empty-user-list-message'>N/A</p>
            )}
        </div>
    );
};

export default UserFollowList;
