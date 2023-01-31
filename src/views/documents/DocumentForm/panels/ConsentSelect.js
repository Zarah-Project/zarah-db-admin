import React, {useState, useEffect} from 'react';
import {FormItem, Input} from "formik-antd";
import style from "../../../../components/FormComponents/FormTextArea/FormTextArea.module.css";
import metadata from "../../../../services/metadata";
import {Typography} from "antd";
import {Radio} from "formik-antd";
import Label from "../../../../components/FormComponents/Label/Label";
import FormTextArea from "../../../../components/FormComponents/FormTextArea/FormTextArea";
import getLabel from "../../../../utils/getLabel";

const {Text} = Typography;

const ConsentSelect = ({values, action, ...props}) => {
  const [consentsDocument, setConsentsDocument] = useState([]);
  const [consentsInterview, setConsentsInterview] = useState([]);
  const [consentsCC, setConsentsCC] = useState([]);

  useEffect(() => {
    metadata.consents().then((response) => {
      const consents = response.data;
      setConsentsDocument(consents.filter(consent => consent.group === 'document'));
      setConsentsInterview(consents.filter(consent => consent.group === 'interview'));
      setConsentsCC(consents.filter(consent => consent.group === 'cc'));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getHelper = (consent) => {
    switch (consent['key']) {
      case 'cc_q2':
        return (
          <span>
            If you answered YES to either of the two questions above, please proceed to next question.<br/>
            (NB: For any one item, if one of the two answers above is Yes, the other answer must be No.)
          </span>
        )
      case 'cc_q3':
        return (
          <span>If the answer here is NO, just skip the following question.</span>
        )

    }
  }

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
          if (consent.type !== 'other') {
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
      <br/>
      <Label label={getLabel('cc', values)}/>
      {
        consentsCC.map((consent, idx) => {
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
              <div style={{fontSize: '11px', fontStyle: 'italic', textAlign: 'right'}}>
                {getHelper(consent)}
              </div>
            </FormItem>
          )
        })
      }
      <br/>
      <div>
        In all cases, please double check the relevant ZARAH Permission Forms before choosing.<br/>
        Also, please inquire with team member in charge of ethics when in doubt.
      </div>
      <br/>
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
                <Input name={`consents.${consent.key}.id`} hidden={true}/>
                <FormTextArea
                  action={action}
                  field={`consents.${consent.key}.consent_text`}
                  rows={4}
                />
              </FormItem>
            )
          }
        })
      }
    </React.Fragment>
  )
};

export default ConsentSelect;
