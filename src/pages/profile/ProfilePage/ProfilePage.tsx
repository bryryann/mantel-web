import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUser, isFollowing, followUser } from '@/services/userServices';
import { useAppSelector } from '@/hooks/hooks';
import { selectAccessToken, selectUser } from '@/features/auth/authSelectors';
import { ProfileLayout } from '@/layouts';
import { UserFollowList } from '@/components/profile'
import { Modal } from '@/components/shared';
import { Button } from '@/components/ui';
import { User } from '@/types/auth';
import './ProfilePage.css';
import Toast from '@/utils/toast';

type ModalContent = 'followers' | 'followees';

const ProfilePage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [following, setFollowing] = useState<boolean | null>(null);
    const [modalContent, setModalContent] = useState<ModalContent>('followers');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const { id } = useParams<{ id: string }>();
    const currentUser = useAppSelector(selectUser);
    const accessToken = useAppSelector(selectAccessToken);

    const isOwnProfile = id === currentUser?.id;

    const openModal = (content: ModalContent) => {
        setIsModalOpen(true);
        setModalContent(content);
    };

    useEffect(() => {
        const fetchData = async (id: string) => {
            try {
                setError(null);
                const data = await fetchUser(id);

                if (data.user.id != currentUser!.id) {
                    const followStatus = await isFollowing(id, data.user.id);

                    setFollowing(followStatus.is_following);
                }
                setUser(data.user);
            } catch (err: any) {
                console.log(err);
                setError(err.message || "An unknown error has occurred.");
                setUser(null);
            }
        };

        fetchData(id);
    }, [id, following]);

    const onFollow = async () => {
        try {
            await followUser(accessToken, currentUser.id, id);
            setFollowing(prev => !prev);
        } catch (err: any) {
            console.log(err);
            Toast.error(err.message || "An unknown error has occurred.");
        }
    }

    if (error) return <div>Error: {error}</div>
    if (!user) return <div>Loading...</div>;

    return (
        <ProfileLayout>
            <div className='profile-card'>
                {!isOwnProfile && (
                    following ?
                        <Button className='unfollow-feat-btn'>Unfollow</Button>
                        :
                        <Button
                            className='follow-feat-btn'
                            onClick={onFollow}
                        >
                            Follow
                        </Button>
                )}
                {isOwnProfile && (
                    <Button className='edit-profile-btn'>Edit Profile</Button>
                )}

                <p>{user.username}'s profile</p>
                <p><span className='mantel-id'>Mantel ID:</span> {id}</p>

                <Button
                    onClick={() => openModal('followers')}
                    className='profile-follow-data-btn'
                >
                    Followers
                </Button>
                &nbsp;
                <Button
                    onClick={() => openModal('followees')}
                    className='profile-follow-data-btn'
                >
                    Following
                </Button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <UserFollowList content={modalContent} />
            </Modal>
        </ProfileLayout>
    );
};

export default ProfilePage;
