import React from "react";

import {Col, Row} from "antd";
import {Input} from "formik-antd";
import CascaderWithExtraOption from "../../../../components/FormComponents/CascaderWithExtraOption/CascaderWithExtraOption";
import FormTextArea from "../../../../components/FormComponents/FormTextArea/FormTextArea";
import getLabel from "../../../../utils/getLabel";

const Labour = ({values, action, ...props}) => {
  return (
    <Row gutter={10}>
      <Col span={24}>
        <CascaderWithExtraOption
          action={action}
          label={getLabel('labour_relations', values)}
          placeholder={'- Select labour relation -'}
          category={'labour_relations'}
          color={'blue'}
        />
      </Col>
      <Col span={24}>
        <Input name={'explanations.historical_context.id'} hidden={true} />
        <FormTextArea
          action={action}
          field={'explanations.labour_relations.text'}
          label={getLabel('labour_relations_explanation', values)}
          rows={4}
        />
      </Col>
    </Row>
  )
};

export default Labour;
