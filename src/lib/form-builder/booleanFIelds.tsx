import { Box, Paper, Typography, Checkbox } from "@material-ui/core";
import { ObjectSchema } from "./types";
import React, { useEffect, useState } from "react";
import { RenderForm } from "./renderForm";
type Props = {
  // schema: ObjectSchema,
  saveChange: any;
  element: any;
  index: any;
};

export const CheckBoxFields = ({ element, index, saveChange }: Props) => {
  const [booleanValue, setbooleanValue] = useState(false)

  const formRender = (fields: any, indx: any) => {
    return (
      <>
        <Typography variant="h6" gutterBottom>
            <Checkbox
              checked={fields.value ? fields.value : booleanValue}
                onChange={(e) =>{
                  console.log(e.target.checked)
                  setbooleanValue(e.target.checked)
                  saveChange(fields, indx, e.target.checked)
                }}
            />
            {fields.label}
          </Typography>
      </>
    );
  };

  return <>{formRender(element, index)}</>;
};
