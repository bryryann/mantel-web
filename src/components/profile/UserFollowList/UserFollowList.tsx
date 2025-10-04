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
    const [userList, setUserList] = useState<User[]>([]);

    useEffect(() => {
        const fetchContent = async (content) => {
            if (content === 'followers') {
                const followers = await fetchFollowData(user.id, content);
                console.log(followers);
            }
            else if (content === 'followees') {
                const followees = await fetchFollowData(user.id, content);
                console.log(followees);
            }
        }

        console.log(content);
        fetchContent(content);
    }, []);

    return <p>{content}</p>
};

export default UserFollowList;
