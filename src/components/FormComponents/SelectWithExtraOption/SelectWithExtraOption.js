import React, {useState, useEffect} from "react";
import {FormItem} from 'formik-antd'
import {Button, Tag, Select, Input, Drawer} from "antd";
import style from './SelectWithExtraOption.module.css';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import {Field} from "formik";
import PeopleForm from "../../../views/people/PeopleForm/PeopleForm";
import PlaceForm from "../../../views/places/PlaceForm/PlaceForm";
import OrganisationForm from "../../../views/organisations/OrganisationForm/OrganisationForm";
import EventForm from "../../../views/events/EventForm/EventForm";

const { Option } = Select;

const SelectWithExtraOption = ({label, formAction, field, serviceClass, placeholder, valueField, labelField, color, subForm, recordName, ...rest}) => {
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState(undefined);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [action, setAction] = useState('create');
  const [title, setTitle] = useState('Create');

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = (search) => {
    serviceClass.list(search).then((response) => {
      setOptions(response.data)
    })
  };

  const onSearch = (searchValue) => {
    fetchData(searchValue);
  };

  const onChange = (value) => {
    setSelectedValue(value);
  };

  const onAssign = (form) => {
    let values;
    values = form.values[field];

    if (values) {
      if (!values.some(value => value.key === selectedValue.key)) {
        values.push(selectedValue)
      }
    } else {
      values = [selectedValue]
    }

    form.setFieldValue(field, values);
    setSelectedValue(undefined);
  };

  const onDrawerOpen = (action) => {
    setAction(action);

    if (action === 'create') {
      setTitle(`Create ${recordName}`);
      setDrawerOpen(true);
    }

    if (action === 'edit' && selectedValue) {
      setTitle(`Edit ${recordName}`);
      setDrawerOpen(true);
    }
  };

  const onDrawerClose = () => {
    setDrawerOpen(false);
  };

  const renderAssignedValues = (form) => {
    let values;
    if (form.values[field]) {
      values = form.values[field];
    }

    const onRemoveValue = (e, value) => {
      e.preventDefault();
      const values = [...form.values[field]];
      const newValues = values.filter(v => v.key !== value.key);
      form.setFieldValue(field, newValues);
    };

    if (values) {
      return (
        values.map((value, idx) => (
          <Tag
            key={idx}
            closable={formAction !== 'view'}
            color={color}
            onClose={(e) => onRemoveValue(e, value)}
          >
            {formAction === 'view' ?
              <span
                className={style.Clickable}
                onClick={
                  () => {
                    setTitle(`View ${recordName}`);
                    setAction(formAction);
                    setSelectedValue({key: value.value});
                    setDrawerOpen(true);
                  }}
              >{value.label}</span> :
            <span>{value.label}</span>
          }
          </Tag>
        ))
      )
    }
  };

  const afterFormSubmit = (response) => {
    setSelectedValue({value: response[valueField], label: response[labelField], key: response[valueField]});
    fetchData();
    setDrawerOpen(false);
  };

  const renderSubForm = () => {
    switch (field) {
      case 'people':
        return (
          <PeopleForm
            action={action}
            formType={'drawer'}
            recordID={selectedValue ? selectedValue.key : undefined}
            onClose={afterFormSubmit}
          />
        );
      case 'places':
        return (
          <PlaceForm
            action={action}
            formType={'drawer'}
            recordID={selectedValue ? selectedValue.key : undefined}
            onClose={afterFormSubmit}
          />
        );
      case 'organisations':
        return (
          <OrganisationForm
            action={action}
            formType={'drawer'}
            recordID={selectedValue ? selectedValue.key : undefined}
            onClose={afterFormSubmit}
          />
        );
      case 'events':
        return (
          <EventForm
            action={action}
            formType={'drawer'}
            recordID={selectedValue ? selectedValue.key : undefined}
            onClose={afterFormSubmit}
          />
        );
      default:
        break;
    }
  };

  const renderViewForm = () => (
    <FormItem name={field} label={label}>
      <Field name={field}>
        {
          ({form}) => (
            <div className={style.TagsDisabled}>
              {renderAssignedValues(form)}
            </div>
          )
        }
      </Field>
    </FormItem>
  );


  const renderEditForm = () => (
    <FormItem name={field} label={label}>
      <Field name={field}>
        {
          ({ field, form, meta }) => (
            <React.Fragment>
              <Input.Group compact style={{ width: "100%" }}>
                <Select
                  allowClear={true}
                  showSearch={true}
                  placeholder={placeholder}
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={false}
                  style={{ width: "calc(100% - 168px)" }}
                  value={selectedValue}
                  labelInValue={true}
                >
                  {
                    options.map((option) => (
                      <Option key={option[valueField]} value={option[valueField]}>{option[labelField]}</Option>
                    ))
                  }
                </Select>
                <Button
                  disabled={!selectedValue}
                  type={'default'}
                  onClick={() => onAssign(form)}
                >
                  Assign
                </Button>
                <Button
                  type={'default'}
                  onClick={() => onDrawerOpen('create')}
                  style={{alignItems: 'center'}}
                >
                  <PlusOutlined/>
                </Button>
                <Button
                  disabled={!selectedValue}
                  type={'default'}
                  onClick={() => onDrawerOpen('edit')}
                  style={{alignItems: 'center'}}
                >
                  <EditOutlined/>
                </Button>
              </Input.Group>
              <div className={style.Tags}>
                {renderAssignedValues(form)}
              </div>
            </React.Fragment>
          )
        }
      </Field>
    </FormItem>
  );

  return (
    <React.Fragment>
      { formAction !== 'view' ? renderEditForm() : renderViewForm()}
      <Drawer
        title={title}
        width={'50%'}
        destroyOnClose={true}
        onClose={(e) => onDrawerClose()}
        visible={drawerOpen}
      >
        {renderSubForm()}
      </Drawer>
    </React.Fragment>
  )
};

export default SelectWithExtraOption;
