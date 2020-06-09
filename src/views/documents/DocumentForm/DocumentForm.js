import React, {useEffect, useState} from 'react';
import {Button, Col, Collapse, notification} from "antd";
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
import {Form} from "formik-antd"
import ConsentSelect from "./panels/ConsentSelect";
import FileUpload from "../../../components/FileUpload/FileUpload";
import {Link} from "react-router-dom";
import validation from "./validation/validation";
import document from "../../../services/document";
import decodeValues from "./decoders/decodeValues";
import encodeValues from "./decoders/encodeValues";
import { FlagTwoTone } from '@ant-design/icons';
import PDFBox from "../../../components/PDFBox/PDFBox";
import AbstractAndNotes from "./panels/AbstractAndNotes";

const { Panel } = Collapse;

const initialValues = {
  record_type: "default",
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
    label: 'Base Data',
    fields: ['title', 'type', 'item_type', 'dates', 'summary', 'abstract']
  }
};

const DocumentForm = ({action, ...props}) => {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(initialValues);
  const recordID = props.match.params.id;

  useEffect(() => {
    if (action === 'edit' || action === 'view') {
      document.read(recordID).then((response) => {
        setInitialData(decodeValues(response.data));
      })
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

  const handleSubmit = (values, formik) => {
    setLoading(true);

    switch (action) {
      case 'create':
        document.create(encodeValues(values)).then((response) => {
          successAlert();
          props.history.push('/documents');
        });
        break;
      case 'edit':
        document.edit(recordID, encodeValues(values)).then((response) => {
          successAlert();
          props.history.push('/documents');
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
                url={values['file_url']}
              />
              {action !== 'view' &&
                <FileUpload
                  setFieldValue={setFieldValue}
                />
              }
            </Col>
            <Col span={14}>
              <Form layout={'vertical'} >
                <Collapse
                  accordion
                  bordered={false}
                  defaultActiveKey={['1',]}
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
                  <Panel header="Authorities" key="2" className={style.Panel}>
                    <AuthorityForm
                      action={action}
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  </Panel>
                  <Panel header="Historical Context, Labour Conditions and Living Conditions" key="3" className={style.Panel}>
                    <HistoricalContext
                      action={action}
                      values={values}
                    />
                  </Panel>
                  <Panel header="Labour Relations" key="4" className={style.Panel}>
                    <Labour
                      action={action}
                      values={values}
                    />
                  </Panel>
                  <Panel header="Activist repertoire" key="5" className={style.Panel}>
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
                  <Panel header="Abstract and notes" key="9" className={style.Panel}>
                    <AbstractAndNotes
                      action={action}
                      values={values}
                    />
                  </Panel>
                  <Panel header={<span>Consents <FlagTwoTone twoToneColor={'#c8b800'}/></span>} key="10" className={style.Panel}>
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
              </Form>
            </Col>
          </React.Fragment>
        )}
      </Formik>
    </React.Fragment>
  )
};

export default DocumentForm;
