import { MainLayout } from '@/layouts';
import { ProfileSettingsForm } from '@/components/settings';
import './SettingsPage.css';

const SettingsPage = () => {
    return (
        <MainLayout>
            <div className="settings-page__container">
                <div className="settings-page__sidebar">
                    <h2>Settings</h2>
                    <ul>
                        <li>Profile</li>
                        {/*
                        <li>Account</li>
                        <li>Security</li>
                        <li>Notifications</li>
                        <li>Privacy</li>
                        */}
                    </ul>
                </div>

                <div className="settings-page__main">
                    <div className="settings-page__section">
                        <h3>Profile Settings</h3>
                        <ProfileSettingsForm />
                    </div>

                    <div className="settings-page__section">
                        <h3>Account Settings</h3>
                        <p>coming soon...</p>
                    </div>

                    <div className="settings-page__section">
                        <h3>Security Settings</h3>
                        <p>coming soon...</p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default SettingsPage;
