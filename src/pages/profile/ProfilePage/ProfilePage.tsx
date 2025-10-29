import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { UserProfile, fetchUser, isFollowing, followUser, unfollowUser } from '@/services/userServices';
import { useAppSelector } from '@/hooks/hooks';
import { selectAccessToken, selectUser } from '@/features/auth/authSelectors';
import { ProfileLayout } from '@/layouts';
import { UserFollowList } from '@/components/profile';
import { Modal } from '@/components/shared';
import { Button } from '@/components/ui';
import Toast from '@/utils/toast';
import './ProfilePage.css';

type ModalContent = 'followers' | 'followees';

const ProfilePage = () => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [following, setFollowing] = useState<boolean | null>(null);
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

            if (data.user.id !== currentUser?.id) {
                const followStatus = await isFollowing(currentUser.id, data.user.id);
                setFollowing(followStatus.is_following);
            } else {
                setFollowing(null);
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

    const openModal = (content: ModalContent) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    if (error) return <div className="error-msg">Error: {error}</div>;
    if (!user) return <div className="loading-msg">Loading...</div>;

    return (
        <ProfileLayout>
            <div className="profile-card">
                {!isOwnProfile && following !== null && (
                    <Button
                        className={following ? 'unfollow-feat-btn' : 'follow-feat-btn'}
                        onClick={onFollowToggle}
                    >
                    {following ? 'Unfollow' : 'Follow'}
                    </Button>
                )}

                {isOwnProfile && (
                    <Button className="edit-profile-btn">Edit Profile</Button>
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

                <Button
                    onClick={() => openModal('followers')}
                    className="profile-follow-data-btn"
                >
                    Followers
                </Button>
                &nbsp;
                <Button
                    onClick={() => openModal('followees')}
                    className="profile-follow-data-btn"
                >
                    Following
                </Button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <UserFollowList content={modalContent} userId={id!} />
            </Modal>
        </ProfileLayout>
    );
};

export default ProfilePage;
