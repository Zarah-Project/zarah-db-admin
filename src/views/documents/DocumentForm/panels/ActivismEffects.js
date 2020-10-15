import React from "react";

import {Col, Row} from "antd";
import {Input} from 'formik-antd';
import CascaderWithExtraOption from "../../../../components/FormComponents/CascaderWithExtraOption/CascaderWithExtraOption";
import FormTextArea from "../../../../components/FormComponents/FormTextArea/FormTextArea";
import getLabel from "../../../../utils/getLabel";

const ActivismEffects = ({values, action, ...props}) => {
  return (
    <Row gutter={10}>
      <Col span={24}>
        <CascaderWithExtraOption
          action={action}
          label={getLabel('effects_of_activism', values)}
          category={'effects_of_activism'}
          placeholder={'- Select effect -'}
          color={'blue'}
        />
      </Col>
      <Col span={24}>
        <Input name={'explanations.effects_of_activism.id'} hidden={true} />
        <FormTextArea
          action={action}
          field={'explanations.effects_of_activism.text'}
          label={getLabel('effects_of_activism_explanation', values)}
          rows={4}
        />
      </Col>
    </Row>
  )
};

export default ActivismEffects;
