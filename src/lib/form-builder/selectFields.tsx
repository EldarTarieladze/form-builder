import { Box, Paper, Typography, Button, TextField, MenuItem, FormControl, InputLabel, Select } from "@material-ui/core";
import { ObjectSchema } from "./types";
import React, { useEffect, useState } from "react";
import { RenderForm } from "./renderForm";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

type Props = {
  // schema: ObjectSchema,
  saveChange: any;
  fields: any;
  indx: any;
};
const useStyles = makeStyles((theme: Theme) =>
createStyles({
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}),
);
export const SelectFields = ({ fields, indx, saveChange }: Props) => {
  const [selectValue, setSelectValue] = useState(fields.options[0].value);
  const classes = useStyles();

  useEffect(() => {
    saveChange(fields, indx, selectValue)
  }, [])
  const formRender = (fields: any, indx: any) => {
    return (
      <>
        <InputLabel id="demo-simple-select-outlined-label">{fields.label}</InputLabel>
        <Select
        value={selectValue}
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label={fields.label}
          onChange={(e) => {
            setSelectValue(e.target.value)
            saveChange(fields, indx, e.target.value)
          }}
        >

          {fields.options.map((opt: any) =>{
            return(
              <MenuItem value={opt.value}>{opt.label}</MenuItem>
            )

          })}
        </Select>
      </>
    );
  };

  return <>{formRender(fields, indx)}</>;
};
