import './UserCard.css';

interface UserCardParams {
    id: string;
    username: string;
    followers: number;
    following: number;
    friends: number;
    onClick: (id: string) => void;
};

const UserCard: React.FC<UserCardParams> = ({
    id,
    username,
    followers,
    following,
    friends,
    onClick
}) => {
    return (
        <article
            className='usercard'
            tabIndex={0}
            role='button'
            onClick={() => onClick?.(id)}
        >
            <div className='usercard-content'>
                <h3 className='usercard-username'>@{username}</h3>

                <div className='usercard-stats'>
                    <div>
                        <strong>{followers}</strong>
                        <span>Followers</span>
                    </div>
                    <div>
                        <strong>{following}</strong>
                        <span>Following</span>
                    </div>
                    <div>
                        <strong>{friends}</strong>
                        <span>Friends</span>
                    </div>
                </div>
            </div>
        </article>
    )
};

export default UserCard;
