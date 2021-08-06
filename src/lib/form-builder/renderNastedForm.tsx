import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
} from "@material-ui/core";
import { log } from "console";
import { StringDecoder } from "node:string_decoder";
import { getConstantValue } from "typescript";
import { ObjectSchema } from "./types";
import React, { useEffect, useState } from "react";
import { RenderForm } from "./renderForm";
type Props = {
  // schema: ObjectSchema,
  index: any;
  element: ObjectSchema;
  handleAdd: any
  handleDetele: any
  saveChange: any
};

export const RenderNastedForm = ({ element, index, handleAdd, handleDetele, saveChange }: Props) => {
  const [country, setCountry] = useState("");

  const nestedFormContent = (item: any, itemIndex: any) => {
    return (
      <>
        <Paper
          style={{
            marginTop: 7,
            padding: 20,
            display: "flex",
            flexDirection: "column",
          }}
          variant="outlined"
        >
          <Typography variant="h5" gutterBottom>
            {item.label}
          </Typography>
          {item.properties.map((nestedObj: any, nestedIndex: any) => {
             return (
              <>
              <RenderForm
                      element={nestedObj}
                      index={itemIndex + "-" + nestedIndex}
                      handleAdd={handleAdd}
                      handleDetele={handleDetele}
                      saveChange={saveChange}
                    />
              </>
            );
          })}
        </Paper>
      </>
    );
  };

  return <>{nestedFormContent(element, index)}</>;
};
