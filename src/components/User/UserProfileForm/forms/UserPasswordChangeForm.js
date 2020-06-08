import React, {useState} from 'react'
import {Formik} from "formik";
import {Form, FormItem, Input} from "formik-antd";
import {Button, Card, Col, notification, Row, Spin} from "antd";
import style from "./UserForms.module.css"
import auth from "../../../../services/auth";
import { LoadingOutlined } from '@ant-design/icons';
import userPasswordChangeValidation from "./validation/userPasswordChangeValidation";

const UserPasswordChangeForm = () => {
  const init = {
    new_password: '',
    re_new_password: '',
    current_password: ''
  };

  const [loading, setLoading] = useState(false);

  const successAlert = () => {
    notification.success({
      duration: 3,
      message: 'Success!',
      description: 'Password was changed successfully!',
    });
  };

  const errorAlert = () => {
    notification.error({
      duration: 3,
      message: 'Error!',
      description: 'Password change is not completed!',
    });
  };

  const handleSubmit = (values, formik) => {
    setLoading(true);
    auth.updatePassword(values).then((response) => {
      successAlert();
    }).catch((error) => {
      errorAlert();
      formik.setErrors(error.response.data);
    });
    setLoading(false);
  };

  return (
    <Spin spinning={loading} indicator={<LoadingOutlined/>}>
      <Formik
        enableReinitialize={true}
        initialValues={init}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={userPasswordChangeValidation}
      >
        <Form className={style.Form} layout={'vertical'}>
          <Card title={'Change password'} size={'small'}>
            <Row gutter={10}>
              <Col span={24}>
                <FormItem name='current_password' label={'Current password'} className={style.FormItem}>
                  <Input.Password name={'current_password'} />
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem name='new_password' label={'New password'} className={style.FormItem}>
                  <Input.Password name={'new_password'} />
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem name='re_new_password' label={'Re-enter new password'} className={style.FormItem}>
                  <Input.Password name={'re_new_password'} />
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

export default UserPasswordChangeForm;
