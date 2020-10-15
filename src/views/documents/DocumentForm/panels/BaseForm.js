import React from 'react';
import {Col, Divider, Row} from "antd";
import {FormItem, Input} from 'formik-antd';
import ZoteroSearch from "../../../../components/FormComponents/ZoteroSearch/ZoteroSearch";
import FormattedTextArea from "../../../../components/FormComponents/FormattedTextArea/FormattedTextArea";
import TagAssigner from "../../../../components/FormComponents/TagAssigner/TagAssigner";
import getLabel from "../../../../utils/getLabel";
import style from '../DocumentForm.module.css';

const BaseForm = ({values, setFieldValue, action, ...props}) => {
  return (
    <Row gutter={10}>
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
        <FormItem label={getLabel('zotero_author', values)} name={'zotero_author'}>
          <Input name={'zotero_author'} disabled={true} className={style.FormInput}/>
        </FormItem>
      </Col>
      <Col md={12} xs={24}>
        <FormItem label={getLabel('zotero_date', values)} name={'zotero_date'}>
          <Input name={'zotero_date'} disabled={true} className={style.FormInput}/>
        </FormItem>
      </Col>
      <Col md={12} xs={24}>
        <FormItem label={getLabel('zotero_language', values)} name={'zotero_language'}>
          <Input name={'zotero_language'} disabled={true} className={style.FormInput}/>
        </FormItem>
      </Col>
      <Col md={12} xs={24}>
        <FormItem label={getLabel('zotero_archive', values)} name={'zotero_archive'}>
          <Input name={'zotero_archive'} disabled={true} className={style.FormInput}/>
        </FormItem>
      </Col>
      <Col md={12} xs={24}>
        <FormItem label={getLabel('zotero_loc_archive', values)} name={'zotero_loc_archive'}>
          <Input name={'zotero_loc_archive'} disabled={true} className={style.FormInput}/>
        </FormItem>
      </Col>
      <Col md={24} xs={24}>
        <FormItem label={getLabel('abstract', values)} name={'abstract'}>
          <FormattedTextArea name={'abstract'} disabled={action === 'view'} />
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
