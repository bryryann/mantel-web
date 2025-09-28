import { Navbar } from '@/components/shared';
import './ProfileLayout.css';

type ProfileLayoutProps = {
  children: React.ReactNode;
};

const ProfileLayout = ({children}: ProfileLayoutProps) => {
  return (
    <div className='profile-layout'>
      <Navbar />
      <div className='profile-content'>
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;
