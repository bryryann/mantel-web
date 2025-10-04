import './UserFollowList.css';

type UserFollowListProps = {
    content: 'following' | 'followers';
};

const UserFollowList: React.FC<UserFollowListProps> = ({ content }) => {
    return <p>{content}</p>
};

export default UserFollowList;
