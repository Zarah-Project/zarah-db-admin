import React, {useEffect, useState} from 'react'
import {Button, Col, Row} from "antd";
import {Formik} from "formik";
import {Form, FormItem, Input} from "formik-antd";
import style from "../../documents/DocumentForm/DocumentForm.module.css";
import event from '../../../services/event';
import validation from "./validation/validation";

const EventForm = ({action, formType='simple', recordID, onClose, ...props}) => {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState({
    date_from: '',
    event: ''
  });

  useEffect(() => {
    if (action !== 'create') {
      event.read(recordID).then((response) => {
        setInitialData(response.data);
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (values, formik) => {
    setLoading(true);

    switch(action) {
      case 'create':
        event.create(values).then((response) => {
          onClose(response.data)
        }).catch((error) => {
          setLoading(false);
          formik.setErrors(error.response.data);
        });
        break;
      case 'edit':
        event.edit(recordID, values).then((response) => {
          onClose(response.data)
        }).catch((error) => {
          setLoading(false);
          formik.setErrors(error.response.data);
        });
        break;
      default:
        break;
    }

    setLoading(false);
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialData}
      onSubmit={handleSubmit}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={validation}
    >
      {({ values, setFieldValue, submitForm }) => (
        <Form layout={'vertical'}>
          <Row gutter={10}>
            <Col span={12}>
              <FormItem
                name={'date_from'}
                label={'Date From'}
                help={'Date format: YYYY, YYYY-MM, or YYYY-MM-DD'}
                className={style.ApproxDateField}
              >
                <Input name={'date_from'} disabled={action === 'view'} className={style.FormInput}/>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                name={'date_to'}
                label={'Date To'}
                help={'Date format: YYYY, YYYY-MM, or YYYY-MM-DD'}
                className={style.ApproxDateField}
              >
                <Input name={'date_to'} disabled={action === 'view'} className={style.FormInput}/>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={24}>
              <FormItem name={'event'} label="Event">
                <Input name={'event'} disabled={action === 'view'} className={style.FormInput}/>
              </FormItem>
            </Col>
          </Row>
          {
            action !== 'view' &&
            <Button
              type="primary"
              className={style.SubmitButton}
              loading={loading}
              onClick={submitForm}
            >
              Submit
            </Button>
          }
        </Form>
      )}
    </Formik>
  )
};

export default EventForm;
