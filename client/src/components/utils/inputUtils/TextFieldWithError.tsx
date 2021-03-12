import { TextField, TextFieldProps } from "@material-ui/core";
import { FieldHookConfig, useField } from "formik";
import React from "react";

type TextFieldWithErrorProps = TextFieldProps & FieldHookConfig<{}>;

const TextFieldWithError: React.FC<TextFieldWithErrorProps> = ({
  label,
  type,
  variant,
  fullWidth,
  autoFocus,
  margin,
  size,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);

  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <TextField
      {...field}
      size={size}
      fullWidth={fullWidth}
      autoFocus={autoFocus}
      margin={margin}
      type={type}
      label={label}
      variant={variant}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

export default TextFieldWithError;
