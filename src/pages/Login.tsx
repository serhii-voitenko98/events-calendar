import { Layout, Row } from 'antd'
import React, { FC } from 'react'
import { LoginForm } from '../components/LoginForm'

export const Login: FC = () => {
  return (
    <Layout>
      <Row justify="center" align="middle" className="h100">
        <LoginForm></LoginForm>
      </Row>
    </Layout>
  )
}
