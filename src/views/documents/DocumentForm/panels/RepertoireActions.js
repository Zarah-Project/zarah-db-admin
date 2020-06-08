import React from "react";

import {Col, Row} from "antd";
import {Input} from "formik-antd";
import CascaderWithExtraOption from "../../../../components/FormComponents/CascaderWithExtraOption/CascaderWithExtraOption";
import TagAssigner from "../../../../components/FormComponents/TagAssigner/TagAssigner";
import FormTextArea from "../../../../components/FormComponents/FormTextArea/FormTextArea";
import getLabel from "../../../../utils/getLabel";

const RepertoireActions = ({values, action, ...props}) => {
  return (
    <Row gutter={10}>
      <Col span={12}>
        <CascaderWithExtraOption
          action={action}
          label={getLabel('activist_repertoire', values)}
          category={'activist_repertoire'}
          placeholder={'- Select activist repertoire -'}
          color={'blue'}
        />
      </Col>
      <Col span={12}>
        <CascaderWithExtraOption
          action={action}
          label={getLabel('activist_repertoire_scale', values)}
          category={'activist_repertoire_scale'}
          placeholder={'- Select activist repertoire scale -'}
          color={'green'}
        />
      </Col>
      <Col span={24}>
        <Input name={'explanations.activist_repertoire.id'} hidden={true}/>
        <FormTextArea
          action={action}
          field={'explanations.activist_repertoire.text'}
          label={getLabel('activist_repertoire_explanation', values)}
          rows={4}
        />
      </Col>
      <Col span={24}>
        <TagAssigner
          action={action}
          field={'triggering_factor_keywords'}
          label={getLabel('triggering_factor_keywords', values)}
          color={'warning'}
        />
      </Col>
    </Row>
  )
};

export default RepertoireActions;
