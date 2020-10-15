import React from "react";

import {Col, Row} from "antd";
import CascaderWithExtraOption from "../../../../components/FormComponents/CascaderWithExtraOption/CascaderWithExtraOption";
import FormTextArea from "../../../../components/FormComponents/FormTextArea/FormTextArea";
import {Input} from "formik-antd";
import getLabel from "../../../../utils/getLabel";

const Agendas = ({values, action, ...props}) => {
  return (
    <Row gutter={10}>
      <Col span={24}>
        <CascaderWithExtraOption
          action={action}
          label={getLabel('agendas', values)}
          category={'agendas'}
          placeholder={'- Select agenda -'}
          color={'blue'}
        />
      </Col>
      <Col span={24}>
        <Input name={'explanations.agendas.id'} hidden={true}/>
        <FormTextArea
          action={action}
          field={'explanations.agendas.text'}
          label={getLabel('agendas_explanation', values)}
          rows={4}
        />
      </Col>
    </Row>
  )
};

export default Agendas;
