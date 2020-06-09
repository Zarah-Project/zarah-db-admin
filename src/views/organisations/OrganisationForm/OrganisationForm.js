import React, {useEffect, useState} from 'react'
import {Button, Col, Row} from "antd";
import {Formik} from "formik";
import {Form, FormItem, Input} from "formik-antd";
import style from "../../documents/DocumentForm/DocumentForm.module.css";
import organisation from '../../../services/organisation';
import RemoteSelect from "../../../components/FormComponents/RemoteSelect/RemoteSelect";
import validation from "./validation/validation";

const OrganisationForm = ({action, formType='simple', recordID, onClose, ...props}) => {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState({
    name: '',
    acronym: '',
    organisation_form: undefined,
    organisation_form_scale: undefined,
    organisation_gendered_membership: undefined,
    organisation_form_text: '',
    organisation_form_scale_text: '',
    organisation_gendered_membership_text: ''
  });

  useEffect(() => {
    if (action !== 'create') {
      organisation.read(recordID).then((response) => {
        setInitialData(response.data);
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (values, formik) => {
    setLoading(true);

    switch(action) {
      case 'create':
        organisation.create(values).then((response) => {
          onClose(response.data)
        }).catch((error) => {
          setLoading(false);
        });
        break;
      case 'edit':
        organisation.edit(recordID, values).then((response) => {
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
            <Col span={16}>
              <FormItem name={'name'} label={'Name'}>
                <Input name={'name'} disabled={action === 'view'}/>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem name={'acronym'} label={'Acronym'}>
                <Input name={'acronym'} disabled={action === 'view'}/>
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
              <RemoteSelect
                label={'Organisation Form'}
                serviceClass={organisation.selectForms}
                valueField={'id'}
                labelField={'form'}
                placeholder={'- Select organisation form -'}
                field={'organisation_form'}
                disabled={action === 'view'}
              />
            </Col>
            {
              values['organisation_form'] === 99 &&
              <Col span={24}>
                <FormItem name={'organisation_form_text'} >
                  <Input
                    name={'organisation_form_text'}
                    placeholder={'Organisation Form (Other)'}
                    disabled={action === 'view'}
                  />
                </FormItem>
              </Col>
            }
          </Row>
          <Row gutter={10}>
            <Col span={24}>
              <RemoteSelect
                label={'Organisation Form Scale'}
                serviceClass={organisation.selectFormScales}
                valueField={'id'}
                labelField={'scale'}
                placeholder={'- Select organisation form scale -'}
                field={'organisation_form_scale'}
                disabled={action === 'view'}
              />
              {
                values['organisation_form_scale'] === 99 &&
                <Col span={24}>
                  <FormItem name={'organisation_form_scale_text'} >
                    <Input
                      name={'organisation_form_scale_text'}
                      placeholder={'Organisation Form Scale (Other)'}
                      disabled={action === 'view'}
                    />
                  </FormItem>
                </Col>
              }
            </Col>
            <Col span={24}>
              <RemoteSelect
                label={'Organisation Gendered Membership'}
                serviceClass={organisation.selectGenderedMemberships}
                valueField={'id'}
                labelField={'membership'}
                placeholder={'- Select organisation gendered membership -'}
                field={'organisation_gendered_membership'}
                disabled={action === 'view'}
              />
              {
                values['organisation_gendered_membership'] === 99 &&
                <Col span={24}>
                  <FormItem name={'organisation_gendered_membership_text'} >
                    <Input
                      name={'organisation_gendered_membership_text'}
                      placeholder={'Organisation Gendered Membership (Other)'}
                      disabled={action === 'view'}
                    />
                  </FormItem>
                </Col>
              }
            </Col>
          </Row>
          {action !== 'view' &&
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

export default OrganisationForm;
