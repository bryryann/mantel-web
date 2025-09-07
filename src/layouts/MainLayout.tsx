import Navbar from '@/components/feed/Navbar';
import './MainLayout.css';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className='main-layout'>
      <Navbar />
      <div className='main-content'>
        <div className='feed'>{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
