import { TextField, TextFieldProps } from "@material-ui/core";
import { FieldHookConfig, useField } from "formik";
import React from "react";

// Custom TextField crated to work with Formik
// Display error using helperText prop
const AccountEditCustomTextField: React.FC<
  { type?: string } & TextFieldProps & FieldHookConfig<{}>
> = ({ type, label, ...props }) => {
  const [field, meta] = useField<{}>(props);

  const errorText = props.helperText && meta.touched ? props.helperText : "";

  return (
    <TextField
      {...field}
      type={type}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

export default AccountEditCustomTextField;
