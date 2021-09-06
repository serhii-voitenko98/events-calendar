import { Layout } from 'antd';
import React, { FC } from 'react';
import { AppRouter } from './components/AppRouter';
import { Navbar } from './components/Navbar';
import './App.css';

export const App: FC = () => {
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
