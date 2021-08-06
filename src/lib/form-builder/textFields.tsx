import { Box, Paper, Typography, Button, TextField } from "@material-ui/core";
import { ObjectSchema } from "./types";
import React, { useEffect, useState } from "react";
import { RenderForm } from "./renderForm";
type Props = {
  // schema: ObjectSchema,
  saveChange: any;
  fields: any;
  element: any
  indx: any
};

export const TextFields = ({ fields, element , indx, saveChange }: Props) => {
  const [inputValue, setInputValue] = useState("");

  const formRender = (fields: any, element: any, indx: any) => {
    return (
      <>
        <TextField
          name={element.name}
          type={element.inputType ? element.inputType : element.type == "string" ? "text" : "number" }
          required={element.required}
          inputProps={{
            max: element.type == "string" ? element.minLength ? element.maxLength : false : element.maximum ? element.maximum : false,
            min: element.type == "string" ? element.minLength ? element.minLength : false : element.minimum ? element.minimum : false,
            pattern: element.pattern ? element.pattern : false
          }}
          id="outlined-basic"
          value={element.value ? element.value : inputValue}
          label={element.label}
          variant="outlined"
          onChange={(e) => {
            setInputValue(e.target.value);
            saveChange(fields,indx, e.target.value);
          }}
        ></TextField>
      </>
    );
  };

  return <>{formRender(fields, element, indx)}</>;
};
