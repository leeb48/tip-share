import { TextField, TextFieldProps } from "@material-ui/core";
import { FieldHookConfig, useField } from "formik";
import React from "react";

type CommentTextFieldProps = { maxLength: number } & TextFieldProps &
  FieldHookConfig<{}>;

const CommentTextField: React.FC<CommentTextFieldProps> = ({
  maxLength,
  label,
  type,
  variant,
  size,
  helperText,
  ...props
}) => {
  const [field] = useField<{}>(props);

  return (
    <TextField
      {...field}
      size={size}
      fullWidth
      type={type}
      label={label}
      variant={variant}
      helperText={helperText}
      multiline
      rowsMax={Infinity}
      inputProps={{
        maxLength,
      }}
    />
  );
};

export default CommentTextField;
