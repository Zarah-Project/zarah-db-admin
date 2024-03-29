import React, {useEffect, useState} from 'react';
import {Alert, Button, Col, Collapse, notification, Row} from "antd";
import BaseForm from "./panels/BaseForm";
import AuthorityForm from "./panels/AuthorityForm";
import style from './DocumentForm.module.css';
import RepertoireActions from "./panels/RepertoireActions";
import Agendas from "./panels/Agendas";
import ActivismEffects from "./panels/ActivismEffects";
import Labour from "./panels/Labour";
import HistoricalContext from "./panels/HistoricalContext";
import NonActivism from "./panels/NonActivism";
import {Formik} from "formik";
import {Form, FormItem, Radio} from "formik-antd"
import ConsentSelect from "./panels/ConsentSelect";
import FileUpload from "../../../components/FileUpload/FileUpload";
import {Link} from "react-router-dom";
import validation from "./validation/validation";
import document from "../../../services/document";
import decodeValues from "./decoders/decodeValues";
import encodeValues from "./decoders/encodeValues";
import PDFBox from "../../../components/PDFBox/PDFBox";
import AbstractAndNotes from "./panels/AbstractAndNotes";
import PrivacyForm from "./panels/PrivacyForm";
import { PersistFormikValues } from 'formik-persist-values';

const { Panel } = Collapse;

const initialValues = {
  record_type: "team",
  title: '',
  item_type: '',
  dates: [{date_from: '', date_to: '', event: ''}],
  abstract: '',
  summary: '',
  organisations: [],
  places: [],
  people: [],
  classifications: {},
  explanations: {},
  consents: {
    "longer_than_five_years": false,
    "open_access": false,
    "personal_data": false,
    "five_years_after": false
  }
};

const panelFields = {
  base_data: {
    label: 'Base data',
    fields: ['title', 'type', 'item_type', 'dates', 'summary', 'abstract']
  }
};

const DocumentForm = ({action, ...props}) => {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(initialValues);
  const [errors, setErrors] = useState([]);

  const recordID = props.match.params.id;

  useEffect(() => {
    switch (action) {
      case 'view':
        document.read(recordID).then((response) => {
          setInitialData(decodeValues(response.data));
        });
        break;
      case 'edit':
        document.read(recordID).then((response) => {
          setInitialData(decodeValues(response.data));
        });
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const successAlert = () => {
    notification.success({
      duration: 3,
      message: 'Success!',
      description: `Document record was ${action === 'create' ? 'created' : 'updated'}!`,
    });
  };

  const errorAlert = () => {
    notification.error({
      duration: 3,
      message: 'Error!',
      description: `There was some error trying to save the form! Please correct the errors!`,
    });
  };

  const renderErrors = () => {
    const onErrorClose = () => {
      setErrors([]);
    };

    if (errors.length > 0) {
      const errorDisplay = errors.map((e, idx) => {
        return (
          <div key={idx}>{e}</div>
        )
      });

      return (
        <Alert
          description={errorDisplay}
          type="error"
          closable
          className={style.ErrorAlert}
          onClose={onErrorClose}
          message={''}
        />
      )
    }
  };

  const handleSubmit = (values, formik) => {
    setLoading(true);

    const handleError = (error) => {
      console.log(error);
      const errors = error.response.data;
      const {non_field_errors, ...field_errors} = errors;
      if (non_field_errors) {
        setErrors(non_field_errors);
      }
      if (field_errors) {
        formik.setErrors(field_errors)
      }
      setLoading(false);
    };

    switch (action) {
      case 'create':
        document.create(encodeValues(values)).then((response) => {
          successAlert();
          localStorage.removeItem(`document-create-form`);
          props.history.push('/documents');
        }).catch(error => {
          errorAlert();
          handleError(error);
        });
        break;
      case 'edit':
        document.edit(recordID, encodeValues(values)).then((response) => {
          successAlert();
          props.history.push('/documents');
        }).catch(error => {
          errorAlert();
          handleError(error);
        });
        break;
      default:
        break;
    }

    setLoading(false);
  };

  const getPanelTitle = (panel, errors) => {
    let hasError = false;
    if (panelFields.hasOwnProperty(panel)) {
      if (errors) {
        if (Object.keys(errors).length !== 0) {
          panelFields[panel].fields.forEach((field) => {
            if (Object.keys(errors).includes(field)) {
              hasError = true;
            }
          })
        }
      }
      return hasError ? <span style={{color: 'red'}}>{panelFields[panel]['label']}</span> : panelFields[panel]['label']
    }
  };

  const persist = () => {
    switch (action) {
      case 'create':
        return <PersistFormikValues name="document-create-form" />;
      default:
        return '';
    }
  };

  return (
    <React.Fragment>
      <Formik
        enableReinitialize={true}
        initialValues={initialData}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={validation}
      >
        {({values, setFieldValue, errors}) => (
          <React.Fragment>
            <Col span={10}>
              <PDFBox
                fileID={values['file_id']}
              />
              {action !== 'view' &&
                <FileUpload
                  setFieldValue={setFieldValue}
                />
              }
              <Row style={{textAlign: 'center'}}>
                <Col md={24} xs={24}>
                  <FormItem label="Privacy options for document reproduction" name={'attachment_type'}>
                    <Radio.Group name={'attachment_type'} defaultValue="team" buttonStyle="solid" disabled={action === 'view'}>
                      <Radio.Button value="default">Public</Radio.Button>
                      <Radio.Button value="team">Team</Radio.Button>
                      <Radio.Button value="individual">Individual</Radio.Button>
                    </Radio.Group>
                  </FormItem>
                </Col>
              </Row>
            </Col>
            <Col span={14}>
              <Form layout={'vertical'} >
                {renderErrors()}
                <PrivacyForm action={action} />
                <Collapse
                  accordion={action !== 'view'}
                  bordered={false}
                  defaultActiveKey={action === 'view' ? ['1', '2', '3',] : ['1',]}
                  expandIconPosition={'right'}
                >
                  <Panel header={getPanelTitle('base_data', errors)} key="1" className={style.Panel}>
                    <BaseForm
                      action={action}
                      errors={errors}
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  </Panel>
                  <Panel header="Special Records" key="2" className={style.Panel}>
                    <AuthorityForm
                      action={action}
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  </Panel>
                  <Panel header="Historical context, labour conditions and living conditions" key="3" className={style.Panel}>
                    <HistoricalContext
                      action={action}
                      values={values}
                    />
                  </Panel>
                  <Panel header="Labour relations" key="4" className={style.Panel}>
                    <Labour
                      action={action}
                      values={values}
                    />
                  </Panel>
                  <Panel header="Repertoire" key="5" className={style.Panel}>
                    <RepertoireActions
                      action={action}
                      values={values}
                    />
                  </Panel>
                  <Panel header="Agendas" key="6" className={style.Panel}>
                    <Agendas
                      action={action}
                      values={values}
                    />
                  </Panel>
                  <Panel header="Effects of activism" key="7" className={style.Panel}>
                    <ActivismEffects
                      action={action}
                      values={values}
                    />
                  </Panel>
                  <Panel header="Activism and non-activism" key="8" className={style.Panel}>
                    <NonActivism
                      action={action}
                      values={values}
                    />
                  </Panel>
                  <Panel header="Summary and notes" key="9" className={style.Panel}>
                    <AbstractAndNotes
                      action={action}
                      values={values}
                    />
                  </Panel>
                  <Panel header="Interview consent and permissions for documents" key="10" className={style.Panel}>
                    <ConsentSelect
                      action={action}
                      values={values}
                    />
                  </Panel>
                </Collapse>
                {
                  action !== 'view' &&
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={style.SubmitButton}
                    loading={loading}
                  >
                    Submit
                  </Button>
                }
                <Link to={'/documents'}>
                  <Button
                    style={{float: 'right'}}
                    type="secondary"
                    className={style.SubmitButton}
                  >
                    Close
                  </Button>
                </Link>
                {persist()}
              </Form>
            </Col>
          </React.Fragment>
        )}
      </Formik>
    </React.Fragment>
  )
};

export default DocumentForm;
