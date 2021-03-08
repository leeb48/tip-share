import { Checkbox, CheckboxProps, FormControlLabel } from "@material-ui/core";
import { FieldHookConfig, useField } from "formik";
import React from "react";

type Props = { label: string } & CheckboxProps & FieldHookConfig<{}>;

const NormalCheckbox: React.FC<Props> = ({ label, color, ...props }) => {
  const [field] = useField<{}>(props);

  return (
    <FormControlLabel
      {...field}
      control={<Checkbox color={color} />}
      label={label}
    />
  );
};

export default NormalCheckbox;
