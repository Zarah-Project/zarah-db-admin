import React, {useState, useEffect} from 'react';
import {FormItem, Input} from "formik-antd";
import style from "../../../../components/FormComponents/FormTextArea/FormTextArea.module.css";
import metadata from "../../../../services/metadata";
import {Typography} from "antd";
import {Radio} from "formik-antd";

const {Text} = Typography;

const ConsentSelect = ({values, action, ...props}) => {
  const [consents, setConsents] = useState([]);

  useEffect(() => {
    metadata.consents().then((response) => {
      setConsents(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      {
        consents.map((consent, idx) => {
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
    </React.Fragment>
  )
};

export default ConsentSelect;
