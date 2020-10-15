import React from 'react';
import {Col, Divider, List, Row} from "antd";
import {FormItem, Radio} from 'formik-antd';
import { FlagTwoTone } from '@ant-design/icons';

const explanation = [
  <span><FlagTwoTone twoToneColor={'#45a321'}/> Public</span>,
  <span><FlagTwoTone twoToneColor={'#c8b800'}/> Team</span>,
  <span><FlagTwoTone twoToneColor={'#ed4600'}/> Private</span>,
];

const PrivacyForm = ({values, setFieldValue, action, ...props}) => {
  return (
    <div style={{backgroundColor: '#fafafa', padding: '16px 16px 0 16px'}}>
      <Row gutter={10}>
        <Col md={12} xs={24}>
          <FormItem label="Privacy options" name={'record_type'} required={true}>
            <Radio.Group name={'record_type'} defaultValue="default" buttonStyle="solid" disabled={action === 'view'}>
              <Radio.Button value="default">Public</Radio.Button>
              <Radio.Button value="team">Team</Radio.Button>
              <Radio.Button value="individual">Individual</Radio.Button>
            </Radio.Group>
          </FormItem>
        </Col>
        <Col md={12} xs={24}>
          <label style={{height: '30px', marginTop: '8px', alignItems: 'center'}}>Visible to</label>
          <List
            style={{lineHeight: 2, marginBottom: 0}}
            grid={{ gutter: 16, column: 4 }}
            dataSource={explanation}
            renderItem={item => (
              <List.Item>
                {item}
              </List.Item>
            )}
          />
        </Col>
        <Divider style={{margin: '12px 0'}}/>
      </Row>
    </div>
  )
};

export default PrivacyForm;
