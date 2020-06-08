import React, {useState} from "react";
import { Tag, Input } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import { PlusOutlined } from '@ant-design/icons';
import style from './TagAssigner.module.css';
import {FormItem} from "formik-antd";
import {Field} from "formik";

const TagAssigner = ({color, label, field, action, ...rest}) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleClose = (removedTag, form) => {
    const values = form.values[field] ? form.values[field] : [];
    form.setFieldValue(field, values.filter(v => v.keyword !== removedTag.keyword))
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = (form) => {
    const values = form.values[field] ? form.values[field] : [];

    if (inputValue && values.filter(v => v.keyword === inputValue).length === 0) {
      values.push({keyword: inputValue});
    }

    form.setFieldValue(field, values);

    setInputVisible(false);
    setInputValue('');
  };

  const renderTags = (form) => {
    const values = form.values[field];

    if (values) {
      return values.map((value, idx) => {
        return (
          <span key={idx} style={{ display: 'inline-block' }}>
            <Tag
              closable
              color={color}
              className={style.Tag}
              onClose={e => {
                e.preventDefault();
                handleClose(value, form);
              }}
            >
              {value.keyword}
            </Tag>
          </span>
        )
      })
    }
  };

  const renderEditForm = () => {
    return (
      <FormItem
        label={label}
        name={field}
        className={style.FormItem}
      >
        <Field name={field}>
          {
            ({ field, form, meta }) => {
              return (
                <div style={{ marginBottom: 16 }}>
                  <TweenOneGroup
                    enter={{
                      scale: 0.8,
                      opacity: 0,
                      type: 'from',
                      duration: 100,
                      onComplete: e => {
                        e.target.style = '';
                      },
                    }}
                    leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                    appear={false}
                  >
                    {renderTags(form)}
                  </TweenOneGroup>
                  {inputVisible && (
                    <Input
                      type="text"
                      size="small"
                      style={{ width: 78 }}
                      value={inputValue}
                      onChange={handleInputChange}
                      onBlur={() => handleInputConfirm(form)}
                      onPressEnter={() => handleInputConfirm(form)}
                    />
                  )}
                  {!inputVisible && (
                    <Tag onClick={showInput} className={style.Input}>
                      <PlusOutlined /> New Tag
                    </Tag>
                  )}
                </div>
              )}}
        </Field>
      </FormItem>
    )
  };

  const renderViewForm = () => {
    return (
      <FormItem
        label={label}
        name={field}
        className={style.FormItem}
      >
        <Field name={field}>
          {
            ({form}) => {
              const values = form.values[field];
              if (values) {
                return (
                  <span style={{marginLeft: '10px'}}>
                    {values.map(value => (value.keyword)).join(', ')}
                  </span>
                )
              } else {
                return ''
              }
            }
          }
        </Field>
      </FormItem>
    )
  };

  return (
    action !== 'view' ? renderEditForm() : renderViewForm()
  )
};

export default TagAssigner;

