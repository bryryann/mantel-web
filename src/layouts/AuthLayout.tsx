import React from 'react';
import './AuthLayout.css';

type AuthLayoutProps = {
  title: string;
  children: React.ReactNode;
};

const AuthLayout = ({ title, children }: AuthLayoutProps) => {
  return (
    <div className='auth-layout'>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default AuthLayout;
