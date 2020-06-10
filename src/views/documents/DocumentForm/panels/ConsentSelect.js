import React, {useState, useEffect} from 'react';
import {FormItem, Input} from "formik-antd";
import style from "../../../../components/FormComponents/FormTextArea/FormTextArea.module.css";
import metadata from "../../../../services/metadata";
import {Col, Typography} from "antd";
import {Radio} from "formik-antd";
import Label from "../../../../components/FormComponents/Label/Label";
import FormTextArea from "../../../../components/FormComponents/FormTextArea/FormTextArea";
import getLabel from "../../../../utils/getLabel";

const {Text} = Typography;

const ConsentSelect = ({values, action, ...props}) => {
  const [consentsDocument, setConsentsDocument] = useState([]);
  const [consentsInterview, setConsentsInterview] = useState([]);

  useEffect(() => {
    metadata.consents().then((response) => {
      const consents = response.data;
      setConsentsDocument(consents.filter(consent => consent.group === 'document'));
      setConsentsInterview(consents.filter(consent => consent.group === 'interview'));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Label label={getLabel('interview_consents', values)}/>
      {
        consentsInterview.map((consent, idx) => {
          return (
            <FormItem
              key={idx}
              name={`consents.${consent.key}`}
              className={style.FormItem}
            >
              <Text>{consent.type}</Text>
              <Input name={`consents.${consent.key}.id`} hidden={true} />
              <Radio.Group
                disabled={action === 'view'}
                name={`consents.${consent.key}.consent`}
                style={{display: 'block'}}
                defaultValue={false}
              >
                <Radio value={true} name={`consents.${consent.key}.consent`}>Yes</Radio>
                <Radio value={false} name={`consents.${consent.key}.consent`}>No</Radio>
              </Radio.Group>
            </FormItem>
          )
        })
      }
      <br/>
      <Label label={getLabel('document_permissions', values)}/>
      {
        consentsDocument.map((consent, idx) => {
          if (consent.type === 'other') {
            return (
              <FormItem
                key={idx}
                name={`consents.${consent.key}`}
                label={'Comments on issues encountered, process of obtaining permissions etc.'}
                className={style.FormItem}
              >
                <Input name={`consents.${consent.key}.id`} hidden={true} />
                <FormTextArea
                  action={action}
                  field={`consents.${consent.key}.consent_text`}
                  rows={4}
                />
              </FormItem>
            )
          } else {
            return (
              <FormItem
                key={idx}
                name={`consents.${consent.key}`}
                className={style.FormItem}
              >
                <Text>{consent.type}</Text>
                <Input name={`consents.${consent.key}.id`} hidden={true} />
                <Radio.Group
                  disabled={action === 'view'}
                  name={`consents.${consent.key}.consent`}
                  style={{display: 'block'}}
                  defaultValue={false}
                >
                  <Radio value={true} name={`consents.${consent.key}.consent`}>Yes</Radio>
                  <Radio value={false} name={`consents.${consent.key}.consent`}>No</Radio>
                </Radio.Group>
              </FormItem>
            )
          }
        })
      }
    </React.Fragment>
  )
};

export default ConsentSelect;
