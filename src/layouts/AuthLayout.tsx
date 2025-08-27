import React from 'react';

type AuthLayoutProps = {
  title: string;
  children: React.ReactNode;
};

const AuthLayout = ({ title, children }: AuthLayoutProps) => {
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default AuthLayout;
