import React from 'react';
import { FormItem, Input } from "formik-antd";
import formStyle from "../../../views/documents/DocumentForm/DocumentForm.module.css"
import style from "./FormTextArea.module.css";

const FormTextArea = ({field, action, label, required, help, disabled, placeholder, rows, ...props}) => {
  return (
    <FormItem
      name={field}
      label={label}
      className={style.FormItem}
      required={required}
      help={help}
    >
      <Input.TextArea
        className={formStyle.FormInput}
        name={field}
        disabled={action === 'view'}
        placeholder={placeholder}
        autoSize={action === 'view'}
        rows={rows ? rows : 3}
      />
    </FormItem>
  )
};

export default FormTextArea;
