import { MainLayout } from '@/layouts';
import { ProfileSettingsForm } from '@/components/settings';
import './SettingsPage.css';

const SettingsPage = () => {
    return (
        <MainLayout>
            <div className='settings-page__container'>
                <ProfileSettingsForm />
            </div>
        </MainLayout>
    );
};

export default SettingsPage;
