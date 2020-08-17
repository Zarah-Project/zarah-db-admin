import React from 'react';
import {Card, Col, Divider, Layout, Popover, Row, Typography} from "antd";
import LoginForm from "./LoginForm";
import logo from '../../../assets/image/zarah-logo.png';

import style from './Login.module.css';

const { Text, Title } = Typography;

const Login = () => {
  const lostPassword = (
    <div>
      <span>In case you lost your password, please contact the ZARAH database administrator
        or the project member in charge of the database so that your password can be reset.</span>
    </div>
  )

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex' }}>
      <Row justify="center" align="middle" style={{ height: '100vh' }} gutter={0} type="flex">
        <Col lg={12}>
          <Card className={style.LoginBox}>
            <Row>
              <Col lg={12} md={24} sm={24} xs={24} className={style.LoginForm}>
                  <Title level={2}>Login</Title>
                  <Text>Sign in to your account</Text>
                  <LoginForm/>
                  <div style={{marginTop: 15}}>
                    <Popover content={lostPassword} overlayStyle={{width: 400}}>
                      <Text className={style.ForgotPassword}>Forgot your password?</Text>
                    </Popover>
                  </div>
              </Col>
              <Col lg={12} md={0} sm={0} xs={0} className={style.LoginInfo}>
                <div className={style.Logo}>
                  <img alt={'ZARAH'} src={logo}/>
                </div>
                <Divider style={{color: '#FFF', marginBottom: '30px'}}><strong>ZARAH</strong> Database</Divider>
                <Text style={{color: '#FFF'}}>
                  Welcome to the administration interface for the Zarah database! Please log in to continue.
                </Text>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Layout>
  )
};

export default Login;
