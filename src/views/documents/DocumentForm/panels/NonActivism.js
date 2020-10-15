import React from "react";

import {Col, Row} from "antd";
import CascaderWithExtraOption from "../../../../components/FormComponents/CascaderWithExtraOption/CascaderWithExtraOption";
import FormTextArea from "../../../../components/FormComponents/FormTextArea/FormTextArea";
import {Input} from "formik-antd";
import getLabel from "../../../../utils/getLabel";

const NonActivism = ({values, action, ...props}) => {
  return (
    <Row gutter={10}>
      <Col span={24}>
        <CascaderWithExtraOption
          action={action}
          label={getLabel('activism_broad_patterns', values)}
          placeholder={'- Select patterns -'}
          category={'activism_broad_patterns'}
          color={'blue'}
        />
      </Col>
      <Col span={24}>
        <Input name={'explanations.activism_broad_patterns.id'} hidden={true}/>
        <FormTextArea
          action={action}
          field={'explanations.activism_broad_patterns.text'}
          label={getLabel('activism_broad_patterns_explanation', values)}
          rows={4}
        />
      </Col>
    </Row>
  )
};

export default NonActivism;
