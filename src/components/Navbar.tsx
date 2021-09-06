import React, { FC } from 'react';
import { Layout, Menu } from 'antd';
import { useHistory } from 'react-router';
import { RouteNames } from '../routes';
import { useTypedSelector } from '../hooks/useTypedSelector';

export const Navbar: FC = () => {
  const router = useHistory();
  const { isAuth } = useTypedSelector(state => state.authReducer);

  return (
    <Layout.Header>
      {isAuth ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ color: 'white' }}>{'Username'}</div>
            <Menu
              theme='dark'
              mode='horizontal'
              selectable={false}
              style={{ justifyContent: 'flex-end' }}
            >
              <Menu.Item onClick={() => console.log('logout')} key={1}>
                Logout
              </Menu.Item>
            </Menu>
          </div>
        </>
      ) : (
        <Menu
          theme='dark'
          mode='horizontal'
          selectable={false}
          style={{ justifyContent: 'flex-end' }}
        >
          <Menu.Item onClick={() => router.push(RouteNames.LOGIN)} key={1}>
            Login
          </Menu.Item>
        </Menu>
      )}
    </Layout.Header>
  );
};
