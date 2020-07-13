import React from "react";

import {Col, Row} from "antd";
import CascaderWithExtraOption from "../../../../components/FormComponents/CascaderWithExtraOption/CascaderWithExtraOption";
import FormTextArea from "../../../../components/FormComponents/FormTextArea/FormTextArea";
import {Input} from "formik-antd";
import getLabel from "../../../../utils/getLabel";

const HistoricalContext = ({values, action, ...props}) => {
  return (
    <Row gutter={10}>
      <Col span={24}>
        <CascaderWithExtraOption
          action={action}
          label={getLabel('historical_context', values)}
          placeholder={'- Select historical context -'}
          category={'historical_context'}
          color={'blue'}
        />
      </Col>
      <Col span={24}>
        <Input name={'explanations.historical_context.id'} hidden={true}/>
        <FormTextArea
          action={action}
          field={'explanations.historical_context.text'}
          label={getLabel('historical_context_explanation', values)}
          rows={4}
        />
      </Col>
      <Col span={24}>
        <CascaderWithExtraOption
          action={action}
          label={getLabel('labour_conditions', values)}
          placeholder={'- Select labour condition -'}
          category={'labour_conditions'}
          color={'green'}
        />
      </Col>
      <Col span={24}>
        <Input name={'explanations.labour_conditions.id'} hidden={true}/>
        <FormTextArea
          action={action}
          field={'explanations.labour_conditions.text'}
          label={getLabel('labour_conditions_explanation', values)}
          rows={4}
        />
      </Col>
      <Col span={24}>
        <CascaderWithExtraOption
          action={action}
          label={getLabel('living_conditions', values)}
          placeholder={'- Select living condition -'}
          category={'living_conditions'}
          color={'red'}
        />
      </Col>
      <Col span={24}>
        <Input name={'explanations.living_conditions.id'} hidden={true}/>
        <FormTextArea
          action={action}
          field={'explanations.living_conditions.text'}
          label={getLabel('living_conditions_explanation', values)}
          rows={4}
        />
      </Col>
    </Row>
  )
};

export default HistoricalContext;
