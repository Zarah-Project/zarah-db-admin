import React, {useState, useEffect} from "react";
import {Cascader, Input, Button, Tag, Tooltip} from "antd";
import style from './CascaderWithExtraOption.module.css';
import {FormItem} from "formik-antd";
import {ErrorMessage, Field} from "formik";
import metadata from "../../../services/metadata"

const CascaderWithExtraOption = ({label, action, category, placeholder, color, ...rest}) => {
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [otherVisible, setOtherVisible] = useState(false);
  const [otherValue, setOtherValue] = useState('');

  useEffect(() => {
    metadata.classifications({category__key: category}).then((response) => {
      setOptions(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (value, selected) => {
    const selectedOption = selected.slice(-1)[0];
    selectedOption.field_type === 'other' ? setOtherVisible(true) : setOtherVisible(false);
    setSelectedValue(value);
    setSelectedOption(selectedOption);
  };

  const onAssign = (form) => {
    let categoryValues;
    if (form.values['classifications']) {
      categoryValues = form.values['classifications'][category];
    }

    // Add other as text to the selectedOption
    if (selectedOption.field_type === 'other') {
      selectedOption['text'] = otherValue
    }

    if (categoryValues) {
      categoryValues.push(selectedOption)
    } else {
      categoryValues = [selectedOption]
    }

    form.setFieldValue(`classifications.${category}`, categoryValues);

    // Empty the stored values
    setSelectedValue([]);
    setOtherVisible(false);
    setOtherValue('');

    // Make selected options disabled
    toggleOption(selectedOption.field_id, true)
  };

  const toggleOption = (field_id, disabled) => {
    const newOptions = [...options];

    const searchSelected = (options) => {
      options.forEach((option) => {
        if (option.field_type === 'group') {
          searchSelected(option.children);
        } else {
          if (option.field_id === field_id) {
            option['disabled'] = disabled;
          }
        }
      });
      return options
    };

    searchSelected(newOptions);
    setOptions(newOptions);
  };

  const onOtherInputChange = (e) => {
    setOtherValue(e.target.value);
  };

  const renderAssignedValues = (form) => {
    let values;
    if (form.values['classifications']) {
      values = form.values['classifications'][category];
    }

    const onRemoveValue = (e, value) => {
      e.preventDefault();
      const values = [...form.values['classifications'][category]];
      const newValues = values.filter(v => v.field_id !== value.field_id);
      toggleOption(value.field_id, false);
      form.setFieldValue(`classifications.${category}`, newValues);
    };

    const renderText = (value) => {
      if (value.field_type === 'other') {
        const text = `${value['full_name']}: ${value['text']}`;
        return text.length > 40 ? `${text.substring(0, 40)}...` : text;
      } else {
        return value['full_name'].length > 40 ? `${value['full_name'].substring(0, 40)}...` : value['full_name']
      }
    };

    const renderTooltipText = (value) => {
      if (value.field_type === 'other') {
        return `${value['full_name']}: ${value['text']}`;
      } else {
        return value['full_name']
      }
    };

    if (values) {
      return (
        values.map((value, idx) => {
          const text = renderText(value);

          if (text.length > 40) {
            return (
              <Tooltip key={idx} title={renderTooltipText(value)}>
                <Tag closable={action !== 'view'} color={color} onClose={(e) => onRemoveValue(e, value)}>
                  { text }
                </Tag>
              </Tooltip>
            )
          } else {
            return (
              <Tag key={idx} closable={action !== 'view'} color={color} onClose={(e) => onRemoveValue(e, value)}>
                { text }
              </Tag>
            )
          }
        })
      )
    }
  };

  const renderViewForm = () => (
    <FormItem
      label={label}
      name={`classifications.${category}`}
      className={style.FormItem}
    >
      <Field name={`classifications.${category}`}>
        {
          ({form}) => (
            <div className={style.Tags}>
              {renderAssignedValues(form)}
            </div>
          )
        }
      </Field>
    </FormItem>
  );

  const renderEditForm = () => (
    <FormItem
      label={label}
      name={`classifications.${category}`}
      className={style.FormItem}
    >
      <Field name={`classifications.${category}`}>
        {
          ({ field, form, meta }) => {
            return (
              <React.Fragment>
                <Input.Group compact style={{ width: "100%" }}>
                  <Cascader
                    fieldNames={{ label: 'field', value: 'field_id', children: 'children' }}
                    options={options}
                    expandTrigger="hover"
                    placeholder={placeholder}
                    onChange={(value, selectedOptions) => onChange(value, selectedOptions)}
                    style={{ width: "calc(100% - 76px)" }}
                    value={selectedValue}
                    popupClassName={style.Popup}
                  />
                  <Button
                    disabled={selectedValue.length === 0}
                    type={'default'}
                    onClick={() => onAssign(form)}
                  >
                    Assign
                  </Button>
                </Input.Group>
                {
                  otherVisible &&
                  <div className={style.OtherValue}>
                    <Input.TextArea
                      value={otherValue}
                      onChange={onOtherInputChange}
                      rows={4}
                    />
                  </div>
                }
                <div className={style.Tags}>
                  {renderAssignedValues(form)}
                </div>
                <span className={style.ErrorMessage}>
                  <ErrorMessage name={`classifications.${category}`} />
                </span>
              </React.Fragment>
            )
          }
        }
      </Field>
    </FormItem>
  );

  return (
    action !== 'view' ? renderEditForm() : renderViewForm()
  )
};

export default CascaderWithExtraOption;
