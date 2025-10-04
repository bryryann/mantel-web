import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUser } from '@/services/userServices';
import { ProfileLayout } from '@/layouts';
import { UserFollowList } from '@/components/profile'
import { Modal } from '@/components/shared';
import { Button } from '@/components/ui';
import { User } from '@/types/auth';
import './ProfilePage.css';

type ModalContent = 'followers' | 'followees';

type ProfilePageParams = {
    userID: string;
}

const ProfilePage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [modalContent, setModalContent] = useState<ModalContent>('followers');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const { userID } = useParams<ProfilePageParams>();

    const openModal = (content: ModalContent) => {
        setIsModalOpen(true);
        setModalContent(content);
    };

    useEffect(() => {
        const fetchData = async (id: string) => {
            try {
                setError(null);
                const data = await fetchUser(id);
                setUser(data.user);
            } catch (err: any) {
                console.log(err);
                setError(err.message || "An unknown error has occurred.");
                setUser(null);
            }
        };

        fetchData(userID);
    }, [userID]);

    if (error) return <div>Error: {error}</div>
    if (!user) return <div>Loading...</div>;

    return (
        <ProfileLayout>
            <div className='profile-card'>
                <p>{user.username}'s profile</p>
                <p><span className='mantel-id'>Mantel ID:</span> {userID}</p>
                <Button onClick={() => openModal('followers')}>Followers</Button>
                &nbsp;
                <Button onClick={() => openModal('followees')}>Following</Button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <UserFollowList content={modalContent}/>
            </Modal>
        </ProfileLayout>
    );
};

export default ProfilePage;
