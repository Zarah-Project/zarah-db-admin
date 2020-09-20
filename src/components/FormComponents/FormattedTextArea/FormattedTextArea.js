import React from "react";
import {Field} from "formik";
import SunEditor from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css';
import style from './FormattedTextArea.module.css';


const FormattedTextArea = ({name, disabled, action, ...props}) => {
  const options = {
    height : 'auto',
    minHeight : '100px',
    buttonList: [
      ['bold', 'underline', 'italic'],
      ['list', 'link'],
      ['outdent', 'indent'],
      ['undo', 'redo']
    ],
    defaultStyle: 'font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif; ' +
      'font-size: 14px; color: #5c6873;',
    resizingBar : false
  };

  return (
    <Field name={name} id={name}>
      {
        ({field, form, meta}) => {
          return (
            <div className={`${style.FormattedTextArea} ${meta.error ? style.Error : ''} ${disabled ? style.Disabled : ''}`}>
              <SunEditor
                setContents={field.value ? field.value : ''}
                onChange={(content) => {
                  form.setFieldValue(name, content);
                }}
                autoFocus={false}
                showToolbar={!disabled}
                disable={disabled}
                setOptions={options}
              />
            </div>
          )
        }
      }
    </Field>
  )
};

export default FormattedTextArea;
