import React from 'react';
import {Col, Row} from "antd";
import {FormItem} from 'formik-antd';
import FormattedTextArea from "../../../../components/FormComponents/FormattedTextArea/FormattedTextArea";
import getLabel from "../../../../utils/getLabel";

const AbstractAndNotes = ({values, setFieldValue, action, ...props}) => {
  return (
    <Row gutter={10}>
      <Col md={24} xs={24}>
        <FormItem label={getLabel('abstract', values)} name={'abstract'}>
          <FormattedTextArea name={'abstract'} disabled={action === 'view'} />
        </FormItem>
      </Col>
      <Col md={24} xs={24}>
        <FormItem label={getLabel('additional_research', values)} name={'additional_research'}>
          <FormattedTextArea name={'additional_research'} disabled={action === 'view'} />
        </FormItem>
      </Col>
    </Row>
  )
};

export default AbstractAndNotes;
