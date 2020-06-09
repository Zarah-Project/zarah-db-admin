import React, {useEffect, useState} from 'react'
import {Button, Col, Row} from "antd";
import {FieldArray, Formik} from "formik";
import {Form, FormItem, Input} from "formik-antd";
import { CloseOutlined } from '@ant-design/icons';
import style from "../../documents/DocumentForm/DocumentForm.module.css";
import person from '../../../services/person';
import validation from "./validation/validation";
import Label from "../../../components/FormComponents/Label/Label";

const PeopleForm = ({action, formType='simple', recordID, onClose, ...props}) => {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState({
    first_name: '',
    last_name: '',
    other_names: [{
      first_name: '',
      last_name: ''
    }]
  });

  useEffect(() => {
    if (action !== 'create') {
      person.read(recordID).then((response) => {
        setInitialData(response.data);
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (values, formik) => {
    setLoading(true);

    let {other_names} = values;
    values['other_names'] = other_names.filter(value => value.first_name !== '' || value.last_name !== '');

    switch(action) {
      case 'create':
        person.create(values).then((response) => {
          onClose(response.data)
        }).catch((error) => {
          setLoading(false);
        });
        break;
      case 'edit':
        person.edit(recordID, values).then((response) => {
          onClose(response.data)
        }).catch((error) => {
          setLoading(false);
        });
        break;
      default:
        break;
    }

    setLoading(false);
  };

  const renderOtherNames = (values) => {
    const otherNames = values['other_names'] && values['other_names'].length > 0 ? values['other_names'] : [{first_name: '', last_name: ''}];

    const onAdd = (arrayHelpers) => {
      const lastName = otherNames.slice(-1)[0];
      if (lastName['first_name'] !== '' && lastName['last_name'] !== '') {
        arrayHelpers.push({first_name: '', last_name: ''})
      }
    };

    return (
      <React.Fragment>
        <Label label={'Other form of name(s)'} />
        <FieldArray
          name={'other_names'}
          style={{marginBottom: 0}}
          render={(arrayHelpers) => (
            <React.Fragment>
              {
                otherNames.map((otherName, idx) => (
                  <Row key={idx} gutter={10} style={{marginBottom: '10px'}}>
                    <Col span={11}>
                      <FormItem name={`other_names[${idx}].first_name`}>
                        <Input
                          name={`other_names[${idx}].first_name`}
                          placeholder={'First Name'}
                          style={{width: '100%'}}
                          disabled={action === 'view'}
                        />
                      </FormItem>
                    </Col>
                    <Col span={11}>
                      <FormItem name={`other_names[${idx}].last_name`}>
                        <Input
                          name={`other_names[${idx}].last_name`}
                          placeholder={'Last Name'}
                          style={{width: '100%'}}
                          disabled={action === 'view'}
                        />
                      </FormItem>
                    </Col>
                    <Col span={2}>
                      {
                        action !== 'view' ?
                        <Button
                          type={'secondary'}
                          onClick={() => {
                            if (idx > 0) {
                              arrayHelpers.remove(idx)
                            }
                          }}
                        >
                          <CloseOutlined/>
                        </Button> : ''
                      }
                    </Col>
                  </Row>
                ))
              }
              {
                action !== 'view' &&
                <Button
                  type={'secondary'}
                  onClick={() => onAdd(arrayHelpers)}
                >
                  Add
                </Button>
              }
            </React.Fragment>
          )}
        />
      </React.Fragment>
    )
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
      {({ values, submitForm }) => (
        <Form layout={'vertical'}>
          <Row gutter={10}>
            <Col span={12}>
              <FormItem name={'first_name'} label={'First name'}>
                <Input name={'first_name'} disabled={action === 'view'}/>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem name={'last_name'} label={'Last name'}>
                <Input name={'last_name'} disabled={action === 'view'}/>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={24}>
              <FormItem name={'notes'} label="Notes">
                <Input.TextArea rows={4} name={'notes'} disabled={action === 'view'}/>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={24}>
              {renderOtherNames(values)}
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

export default PeopleForm;
