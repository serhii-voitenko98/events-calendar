import { Input, Form, Button } from 'antd';
import React, { FC } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { formRules } from '../utils/formRules';

interface ILoginForm {
  username: string;
  password: string;
}

export const LoginForm: FC = () => {
  const { error, isLoading } = useTypedSelector(state => state.authReducer);
  const { login } = useActions();

  const submitForm = (formData: ILoginForm) => {
    login(formData.username, formData.password);
  };

  return (
    <Form onFinish={e => submitForm(e)}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
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
