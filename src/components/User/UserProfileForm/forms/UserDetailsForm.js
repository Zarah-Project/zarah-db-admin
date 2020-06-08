import React, {useEffect, useState} from 'react'
import {Formik} from "formik";
import {Form, FormItem, Input} from "formik-antd";
import {Button, Card, Col, notification, Row, Spin} from "antd";
import style from "./UserForms.module.css"
import auth from "../../../../services/auth";
import { LoadingOutlined } from '@ant-design/icons';
import userDetailsValidation from "./validation/userDetailsValidation";
import {useDispatch} from "react-redux";
import setUser from "../../UserAvatar/actions/setUser";

const UserDetailsForm = () => {
  const init = {
    first_name: '',
    last_name: '',
    email: ''
  };

  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [initialData, setInitialData] = useState(init);
  const dispatch = useDispatch();

  // componentDidMount
  useEffect(() => {
    setFormLoading(true);
    auth.getUser().then((response) => {
      setInitialData(response.data);
      setFormLoading(false);
    }).catch((error) => {
      setFormLoading(true);
    })
  },[]);

  const successAlert = (message) => {
    notification.success({
      duration: 3,
      message: 'Success!',
      description: message,
    });
  };

  const handleSubmit = (values) => {
    setLoading(true);
    auth.updateUser(values).then((response) => {
      dispatch(setUser(response.data));
      successAlert('User details were successfully updated!');
    });
    setLoading(false);
  };

  return (
    <Spin spinning={formLoading} indicator={<LoadingOutlined/>}>
      <Formik
        enableReinitialize={true}
        initialValues={initialData}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={userDetailsValidation}
      >
        <Form className={style.Form} layout={'vertical'}>
          <Card title={'Details'} size={'small'}>
            <Row gutter={10}>
              <Col span={12}>
                <FormItem name='first_name' label={'First name'} className={style.FormItem}>
                  <Input name={'first_name'} />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem name='last_name' label={'Last name'} className={style.FormItem}>
                  <Input name={'last_name'} />
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem name='email' label={'E-mail'} className={style.FormItem}>
                  <Input name={'email'} />
                </FormItem>
              </Col>
            </Row>
          </Card>
          <Card size={'small'} style={{borderTop: 0, backgroundColor: '#FEFEFE'}}>
            <Button htmlType={'submit'} type={'primary'} loading={loading}>Submit</Button>
          </Card>
        </Form>
      </Formik>
    </Spin>
  )
};

export default UserDetailsForm;
