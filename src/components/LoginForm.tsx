import { Input, Form, Button } from 'antd';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { AuthActionCreators } from '../store/reducers/auth/actionCreators';
import { formRules } from '../utils/formRules';

export const LoginForm: FC = () => {
  const dispatch = useDispatch();
  const {error, isLoading} = useTypedSelector(state => state.authReducer);

  const onFinish = ({username, password}: {username: string, password: string}) => {
    dispatch(AuthActionCreators.login(username, password));
  };

  return (
    <Form
      onFinish={(e) => onFinish(e)}
    >
      {error && <div style={{color: 'red'}}>{error}</div>}
      <Form.Item
        label='Username'
        name='username'
        rules={[formRules.required('Please input username!')]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Password'
        name='password'
        rules={[formRules.required('Please input password!')]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' loading={isLoading}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};
