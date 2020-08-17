import React, {useState} from 'react';
import {Formik} from "formik";
import {Form, FormItem, Input, SubmitButton} from "formik-antd";
import validation from './config/validation';
import style from "./Login.module.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import auth from "../../../services/auth";
import {setAuthTokens} from "axios-jwt";
import { useHistory } from "react-router-dom";
import {Alert, Col, Popover, Row, Typography} from "antd";
import {useDispatch} from "react-redux";
import setUser from "../UserAvatar/actions/setUser";

const { Text } = Typography;

const LoginForm = () => {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const dispatch = useDispatch();

  const lostPassword = (
    <div>
      <span>In case you lost your password, please contact the ZARAH database administrator
        or the project member in charge of the database so that your password can be reset.</span>
    </div>
  )

  const authResponseToAuthTokens = (response) => {
    return {
      accessToken: response.data.access,
      refreshToken: response.data.refresh
    }
  };

  const handleSubmit = (values, actions) => {
    setLoading(true);
    auth.getToken(values).then((response) => {
      setLoading(false);
      setLoginError(false);
      setAuthTokens(authResponseToAuthTokens(response));
    }).then(() => {
      auth.getUser().then((response) => {
        history.push("/");
        dispatch(setUser(response.data));
      })
    }).catch((error) => {
      setLoading(false);
      setLoginError(true);
    })
  };

  return (
    <React.Fragment>
      {
        loginError &&
        <Alert message="Invalid login credentials" type="error" showIcon style={{marginTop: '10px'}} />
      }
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validationSchema={validation}
      >
        <Form className={style.LoginFormik}>
          <FormItem name='username'>
            <Input
              addonBefore={<UserOutlined/>}
              name={'username'}
              placeholder={'User'}
            />
          </FormItem>
          <FormItem name='password'>
            <Input.Password
              addonBefore={<LockOutlined/>}
              name={'password'}
              placeholder={'Password'}
            />
          </FormItem>
          <Row>
            <Col span={12}>
              <SubmitButton
                loading={loading}
                style={{marginTop: '10px'}}
                disabled={false}
              >
                Submit
              </SubmitButton>
            </Col>
            <Col span={12}>
              <div style={{marginTop: 15}}>
                <Popover content={lostPassword} overlayStyle={{width: 400}}>
                  <Text className={style.ForgotPassword}>Forgot your password?</Text>
                </Popover>
              </div>
            </Col>
          </Row>
        </Form>
      </Formik>
    </React.Fragment>
  )
};

export default LoginForm;
