import React, {useState, useEffect} from "react";
import {FormItem, Select} from 'formik-antd'

const { Option } = Select;

const RemoteSelect = ({label, field, serviceClass, placeholder, valueField, labelField, color, subForm, recordName, ...rest}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = (search) => {
    serviceClass(search).then((response) => {
      setOptions(response.data)
    })
  };

  return (
    <React.Fragment>
      <FormItem name={field} label={label}>
        <Select
          name={field}
          allowClear={true}
          placeholder={placeholder}
          filterOption={false}
          style={{ width: "100%" }}
          labelInValue={false}
        >
          {
            options.map((option) => (
              <Option key={option[valueField]} value={option[valueField]}>{option[labelField]}</Option>
            ))
          }
        </Select>
      </FormItem>
    </React.Fragment>
  )
};

export default RemoteSelect;
