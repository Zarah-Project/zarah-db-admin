import React, {useEffect, useState} from 'react'
import {Button, Col, Row} from "antd";
import {FieldArray, Formik} from "formik";
import {Form, FormItem, Input} from "formik-antd";
import { CloseOutlined } from '@ant-design/icons';
import style from "../../documents/DocumentForm/DocumentForm.module.css";
import place from '../../../services/place';
import validation from "./validation/validation";

const PlaceForm = ({action, formType='simple', recordID, onClose, ...props}) => {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState({
    place_name: '',
    notes: ''
  });

  useEffect(() => {
    if (action !== 'create') {
      place.read(recordID).then((response) => {
        setInitialData(response.data);
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (values, formik) => {
    setLoading(true);

    switch(action) {
      case 'create':
        place.create(values).then((response) => {
          onClose(response.data)
        }).catch((error) => {
          setLoading(false);
        });
        break;
      case 'edit':
        place.edit(recordID, values).then((response) => {
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
    const otherNames = values['other_names'] && values['other_name'] > 0 ? values['other_names'] : [{place_name: ''}];

    const onAdd = (arrayHelpers) => {
      const lastName = otherNames.slice(-1)[0];
      if (lastName['place_name'] !== '') {
        arrayHelpers.push({place_name: ''})
      }
    };

    return (
      <FormItem label="Other name(s)" name={'other_names'}>
        <FieldArray
          name={'other_names'}
          style={{marginBottom: 0}}
          render={(arrayHelpers) => (
            <React.Fragment>
              {
                otherNames.map((otherName, idx) => (
                  <Row key={idx} gutter={10} style={{marginBottom: '10px'}}>
                    <Col span={22}>
                      <Input
                        name={`other_names[${idx}].place_name`}
                        placeholder={'Place'}
                        style={{width: '100%'}}
                        disabled={action === 'view'}
                        className={style.FormInput}
                      />
                    </Col>
                    <Col span={2}>
                      { action !== 'view' ?
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
      </FormItem>
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
      {({ values, setFieldValue, submitForm }) => (
        <Form layout={'vertical'}>
          <Row gutter={10}>
            <Col span={24}>
              <FormItem name={'place_name'} label={'Place'}>
                <Input name={'place_name'} disabled={action === 'view'} className={style.FormInput}/>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={24}>
              <FormItem name={'country'} label={'Country / kingdom'}>
                <Input name={'country'} disabled={action === 'view'} className={style.FormInput}/>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={24}>
              <FormItem name={'notes'} label="Notes">
                <Input.TextArea rows={4} name={'notes'} disabled={action === 'view'} className={style.FormInput}/>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={24}>
              <FormItem name={'internal_notes'} label="Internal Notes">
                <Input.TextArea rows={4} name={'internal_notes'} disabled={action === 'view'} className={style.FormInput}/>
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

export default PlaceForm;
