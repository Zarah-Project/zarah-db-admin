import React from 'react';
import {FieldArray} from "formik";
import {Button, Col, Divider, List, Row} from "antd";
import {FormItem, Input, Radio} from 'formik-antd';
import { CloseOutlined } from '@ant-design/icons';
import ZoteroSearch from "../../../../components/FormComponents/ZoteroSearch/ZoteroSearch";
import FormattedTextArea from "../../../../components/FormComponents/FormattedTextArea/FormattedTextArea";
import TagAssigner from "../../../../components/FormComponents/TagAssigner/TagAssigner";
import Label from "../../../../components/FormComponents/Label/Label";
import getLabel from "../../../../utils/getLabel";
import { FlagTwoTone } from '@ant-design/icons';
import style from '../DocumentForm.module.css';

const explanation = [
  <span><FlagTwoTone twoToneColor={'#45a321'}/> Public</span>,
  <span><FlagTwoTone twoToneColor={'#c8b800'}/> Team</span>,
  <span><FlagTwoTone twoToneColor={'#ed4600'}/> Private</span>,
];

const BaseForm = ({values, setFieldValue, action, ...props}) => {
  const dates = values['dates'] ? values['dates'] : [{date_from: '', date_to: ''}];

  const renderDatesEditForm = () => (
    <FieldArray
      name={'dates'}
      render={(arrayHelpers) => (
        <React.Fragment>
          {
            dates.map((date, idx) => (
              <Row key={idx} gutter={10}>
                <Col span={6}>
                  <FormItem name={`dates[${idx}].date_from`}>
                    <Input name={`dates[${idx}].date_from`} placeholder={'Date from'} style={{width: '100%'}}
                           disabled={action==='view'} className={style.FormInput}/>
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem name={`dates[${idx}].date_to`}>
                    <Input name={`dates[${idx}].date_to`} placeholder={'Date to'} style={{width: '100%'}}
                           disabled={action==='view'} className={style.FormInput}/>
                  </FormItem>
                </Col>
                <Col span={10}>
                  <Input name={`dates[${idx}].event`} placeholder={'Event'} style={{width: '100%'}}
                         disabled={action==='view'} className={style.FormInput}/>
                </Col>
                <Col span={2}>
                  {
                    action !== 'view' ?
                      <Button
                        type={'secondary'}
                        width={'100%'}
                        onClick={() => {
                          arrayHelpers.remove(idx)
                        }}
                      >
                        <CloseOutlined/>
                      </Button> :
                      ''
                  }
                </Col>
              </Row>
            ))
          }
          {
            action !== 'view' ?
              <Button
                type={'secondary'}
                onClick={() => onAdd(arrayHelpers)}
              >
                Add
              </Button> :
              ''
          }
        </React.Fragment>
      )}
    />
  );

  const renderDatesViewForm = () => (
    dates.map((date, idx) => (
      <Row key={idx} gutter={10}>
        <Col span={24}>
          <span className={style.ViewField}>
            {date['date_from']}
            {date['date_to'] && ` - ${date['date_to']}`}
            {date['event'] && ` (${date['event']})`}
          </span>
        </Col>
      </Row>
  )));

  const onAdd = (arrayHelpers) => {
    const lastDate = dates.slice(-1)[0];
    if (lastDate['date_from'] !== '') {
      arrayHelpers.push({date_from: '', date_to: ''})
    }
  };

  return (
    <Row gutter={10}>
      <Col md={12} xs={24}>
        <FormItem label="Type" name={'record_type'} required={true}>
          <Radio.Group name={'record_type'} defaultValue="default" buttonStyle="solid" disabled={action === 'view'}>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="team">Team</Radio.Button>
            <Radio.Button value="individual">Individual</Radio.Button>
          </Radio.Group>
        </FormItem>
      </Col>
      <Col md={12} xs={24}>
        <label style={{height: '32px', display: 'inline-flex', alignItems: 'center'}}>Visible to</label>
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
      <Col md={24} xs={24}>
        <ZoteroSearch
          action={action}
          values={values}
          setFieldValue={setFieldValue}
        />
      </Col>
      <Divider style={{margin: '12px 0'}} />
      <Col md={12} xs={24}>
        <FormItem label={getLabel('title', values)} name={'title'} required={true}>
          { action !== 'view' ?
            <Input name={'title'} disabled={action === 'view'} className={style.FormInput}/> :
            <Input.TextArea name={'title'} disabled={action === 'view'} className={style.FormInput} autoSize={true}/>
          }
        </FormItem>
      </Col>
      <Col md={12} xs={24}>
        <FormItem label={getLabel('item_type', values)} name={'item_type'}>
          <Input name={'item_type'} disabled={action==='view'} className={style.FormInput}/>
        </FormItem>
      </Col>
      <Col md={24} xs={24}>
        <div style={{marginBottom: '10px'}}>
          <Label label={getLabel('dates', values)} />
          { action !== 'view' ? renderDatesEditForm() : renderDatesViewForm()}
        </div>
      </Col>
      <Col md={24} xs={24}>
        <FormItem label={getLabel('abstract', values)} name={'abstract'}>
          <FormattedTextArea name={'abstract'} disabled={action === 'view'} />
        </FormItem>
      </Col>
      <Col md={24} xs={24}>
        <FormItem label={getLabel('summary', values)} name={'summary'}>
          <FormattedTextArea name={'summary'} disabled={action === 'view'} />
        </FormItem>
      </Col>
      <Col md={24} xs={24}>
        <FormItem label={getLabel('additional_research', values)} name={'additional_research'}>
          <FormattedTextArea name={'additional_research'} disabled={action === 'view'} />
        </FormItem>
      </Col>
      <Col span={24}>
        <TagAssigner
          action={action}
          field={'keywords'}
          label={getLabel('keywords', values)}
          color={'warning'}
        />
      </Col>
    </Row>
  )
};

export default BaseForm;
