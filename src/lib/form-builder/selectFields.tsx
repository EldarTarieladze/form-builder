import { Box, Paper, Typography, Button, TextField } from "@material-ui/core";
import { ObjectSchema } from "./types";
import React, { useEffect, useState } from "react";
import { RenderForm } from "./renderForm";
type Props = {
  // schema: ObjectSchema,
  saveChange: any;
  fields: any;
  indx: any;
};

export const SelectFields = ({ fields, indx, saveChange }: Props) => {
  const [selectValue, setSelectValue] = useState("");

  const formRender = (fields: any, indx: any) => {
    return (
      <>
        <select
          style={{
            padding: 10,
            border: "1px solid lightgray",
            borderRadius: 5,
          }}
          value={fields.value ? fields.value : selectValue}
          onChange={(e) => {
            setSelectValue(e.target.value)
            saveChange(fields, indx, e.target.value)
          }}
        >
          {fields.options.map((opt: any) => {
            return (
              <>
                <option value={opt.value}>{opt.label}</option>
              </>
            );
          })}
        </select>
      </>
    );
  };

  return <>{formRender(fields, indx)}</>;
};
