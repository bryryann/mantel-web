import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { UserProfile, fetchUser, isFollowing, followUser, unfollowUser } from '@/services/userServices';
import { FriendshipStatus, getFriendship, getFriendshipStatus, sendFriendRequest, unfriend } from '@/services/friendsServices';
import { useAppSelector } from '@/hooks/hooks';
import { selectAccessToken, selectUser } from '@/features/auth/authSelectors';
import { ProfileLayout } from '@/layouts';
import { Posts, UserFollowList } from '@/components/profile';
import { Modal } from '@/components/shared';
import { Button } from '@/components/ui';
import { FriendRequest } from '@/types';
import Toast from '@/utils/toast';
import './ProfilePage.css';

type ModalContent = 'followers' | 'followees';

const ProfilePage = () => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [following, setFollowing] = useState<boolean | null>(null);
    const [friendshipStatus, setFriendshipStatus] = useState<FriendshipStatus>('none');
    const [friendshipObject, setFriendshipObject] = useState<FriendRequest | null>(null);
    const [modalContent, setModalContent] = useState<ModalContent>('followers');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { id } = useParams<{ id: string }>();
    const currentUser = useAppSelector(selectUser);
    const accessToken = useAppSelector(selectAccessToken);

    const isOwnProfile = id === currentUser?.id;

    const loadProfile = useCallback(async () => {
        if (!id) return;
        try {
            setError(null);
            setUser(null);
            const data = await fetchUser(id);
            setUser(data.user);

            if (currentUser && !isOwnProfile) {
                const followStatus = await isFollowing(currentUser.id, data.user.id);
                const friendStatus = await getFriendshipStatus(currentUser.id, data.user.id);
                const friendship = await getFriendship(currentUser.id, data.user.id);

                setFollowing(followStatus.is_following);
                setFriendshipStatus(friendStatus);
                setFriendshipObject(friendship);
            } else {
                setFollowing(null);
                setFriendshipStatus('none');
                setFriendshipObject(null);
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'An unknown error occurred.');
        }
    }, [id, currentUser]);

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);

    const onFollowToggle = async () => {
        if (!accessToken || !currentUser || !id) return;

        const optimisticState = !following;
        setFollowing(optimisticState);

        try {
            if (optimisticState) {
                await followUser(accessToken, currentUser.id, id);
                Toast.success('Followed!');
            } else {
                await unfollowUser(accessToken, currentUser.id, id);
                Toast.success('Unfollowed!');
            }
        } catch (err: any) {
            console.error(err);
            setFollowing(!optimisticState);
            Toast.error(err.message || 'An unknown error occurred.');
        }
    };

    const onFriendshipToggle = async () => {
        if (!accessToken || !id) return;

        const previousState = friendshipStatus;

        try {
            switch (friendshipStatus) {
                case 'none': {
                    const res = await sendFriendRequest(accessToken, id);
                    setFriendshipStatus(res.status);

                    break;
                }
                case 'accepted': {
                    if (!friendshipObject) return;

                    const confirmed = window.confirm('Are you sure you want to unfriend this user?');
                    if (!confirmed) return;

                    const _res = await unfriend(accessToken, friendshipObject.id);
                    setFriendshipStatus('none');

                    break;
                }
                default:
                    break;
            }
        } catch (err: any) {
            console.error(err);
            setFriendshipStatus(previousState);
            Toast.error(err.message || 'An unknown error occurred.');
        }
    };

    if (error) return <div className="error-msg">Error: {error}</div>;
    if (!user) return <div className="loading-msg">Loading...</div>;

    return (
        <ProfileLayout>
            <div className="profile-card">
                {currentUser && (
                    <div className="profile-action-buttons">
                        {!isOwnProfile && (
                            <>
                                {following !== null && (
                                    <Button
                                        className={following ? 'unfollow-feat-btn' : 'follow-feat-btn'}
                                        onClick={onFollowToggle}
                                    >
                                        {following ? 'Unfollow' : 'Follow'}
                                    </Button>
                                )}

                                {friendshipStatus && (
                                    friendshipStatus === 'pending' ? (
                                        <span className="friendship-pending-text">
                                            Friendship request sent
                                        </span>
                                    ) : (
                                        <Button
                                            className={`friendship-btn ${friendshipStatus}`}
                                            onClick={onFriendshipToggle}
                                            disabled={friendshipStatus === 'blocked'}
                                        >
                                            {(() => {
                                                switch (friendshipStatus) {
                                                    case 'none':
                                                        return 'Add Friend';
                                                    case 'accepted':
                                                        return 'Unfriend';
                                                    case 'blocked':
                                                        return 'Blocked';
                                                    default:
                                                        return 'Add Friend';
                                                }
                                            })()}
                                        </Button>
                                    )
                                )}
                            </>
                        )}

                        {isOwnProfile && (
                            <Button className="edit-profile-btn">
                                Edit Profile
                            </Button>
                        )}
                    </div>
                )}

                <p>{user.username}'s profile</p>
                <p>
                    <span className="mantel-id">Mantel ID:</span> {id}
                </p>
                <p>
                    {user.follow_data.followers_count} <span className="mantel-id">Followers</span>
                    <br />
                    {user.follow_data.following_count} <span className="mantel-id">Following</span>
                </p>

                {/* Follower Stats */}
                <div className="follow-stats">
                    <button
                        className="follow-stat-item"
                        onClick={() => {
                            setModalContent('followers');
                            setIsModalOpen(true);
                        }}
                    >
                        <span className="count">{user.follow_data.followers_count}</span>
                        <span className="label">Followers</span>
                    </button>

                    <button
                        className="follow-stat-item"
                        onClick={() => {
                            setModalContent('followees');
                            setIsModalOpen(true);
                        }}
                    >
                        <span className="count">{user.follow_data.following_count}</span>
                        <span className="label">Following</span>
                    </button>
                </div>
            </div>

            <Posts
                userID={user.id}
                username={user.username}
                isOwnProfile={isOwnProfile}
                defaultSort='newest'
                pageSize={10}
            />

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <UserFollowList content={modalContent} userId={id!} />
            </Modal>
        </ProfileLayout>
    );
};

export default ProfilePage;
