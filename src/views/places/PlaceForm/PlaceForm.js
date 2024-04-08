import React, {useEffect, useState} from 'react'
import {Button, Col, Row} from "antd";
import {FieldArray, Formik} from "formik";
import {Form, FormItem, Input, Switch} from "formik-antd";
import { CloseOutlined } from '@ant-design/icons';
import style from "../../documents/DocumentForm/DocumentForm.module.css";
import place from '../../../services/place';
import validation from "./validation/validation";
import Label from "../../../components/FormComponents/Label/Label";
import FormattedTextArea from "../../../components/FormComponents/FormattedTextArea/FormattedTextArea";

const PlaceForm = ({action, formType='simple', recordID, onClose, ...props}) => {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState({
    place_name: '',
    notes: '',
    other_names: [{
      place_name: '',
    }],
    is_public: false
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

    let {other_names} = values;
    values['other_names'] = other_names.filter(value => value.place_name !== '');

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
    const otherNames = values['other_names'] && values['other_names'].length > 0 ? values['other_names'] : [{place_name: ''}];

    const onAdd = (arrayHelpers) => {
      const otherName = otherNames.slice(-1)[0];
      if (otherName['place_name'] !== '') {
        arrayHelpers.push({place_name: ''})
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
                    <Col span={22}>
                      <FormItem name={`other_names[${idx}].place_name`}>
                        <Input
                          name={`other_names[${idx}].place_name`}
                          placeholder={'Place'}
                          style={{width: '100%'}}
                          disabled={action === 'view'}
                          className={style.FormInput}
                        />
                      </FormItem>
                    </Col>
                    <Col span={2}>
                      { action !== 'view' ?
                        <Button
                          type={'secondary'}
                          onClick={() => {
                            arrayHelpers.remove(idx)
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
                <FormattedTextArea name={'notes'} disabled={action === 'view'} rows={4} />
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
            initialData.hasOwnProperty('is_public') &&
            <Row gutter={10}>
              <Col span={24}>
                <FormItem name={'is_public'} label="Visibility">
                  <Switch name={'is_public'} checkedChildren="Public" unCheckedChildren="Private" defaultChecked />
                </FormItem>
              </Col>
            </Row>
          }
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
