import { Layout } from 'antd';
import React, { FC, useEffect } from 'react';
import { AppRouter } from './components/AppRouter';
import { Navbar } from './components/Navbar';
import './App.css';
import { useActions } from './hooks/useActions';
import { IUser } from './models/user';

export const App: FC = () => {
  const {setUser, setAuth} = useActions();
  useEffect(() => {
    if (!!localStorage.getItem('auth')) {
      setAuth(true);
      setUser({username: localStorage.getItem('username') || ''} as IUser)
    }
  }, []);

  return (
    <div>
      <Layout>
        <Navbar />
        <Layout.Content>
          <AppRouter />
        </Layout.Content>
      </Layout>
    </div>
  );
};
