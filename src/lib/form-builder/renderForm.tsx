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
import { RenderNastedForm } from "./renderNastedForm";
import { TextFields } from "./textFields";
import { SelectFields } from "./selectFields";
import { CheckBoxFields } from "./booleanFIelds";

type Props = {
  // schema: ObjectSchema,
  index: any;
  element: ObjectSchema;
  handleAdd: any;
  handleDetele: any;
  saveChange: any;
};

export const RenderForm = ({
  element,
  index,
  handleAdd,
  handleDetele,
  saveChange,
}: Props) => {
  const [inputfd, setInputfd] = useState("");
  const formContent = (fields: any, i: any) => {
    if (fields.type == "string" || fields.type == "number") {
      return (
        <>
          <TextFields
            element={fields}
            fields={fields}
            indx={i}
            saveChange={saveChange}
          />
        </>
      );
    } else if (fields.type == "object") {
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
              {element.label}
            </Typography>
            {fields.properties.map((element: any, indx: any) => {
              return (
                <>
                  {element.type !== "object" ? (
                    <>
                      <TextFields
                        element={element}
                        fields={fields}
                        indx={i + "-" + indx}
                        saveChange={saveChange}
                      />
                    </>
                  ) : (
                    <>
                      {/* {nestedFormContent(element, indx)} */}
                      <RenderNastedForm
                        element={element}
                        index={i + ";" + indx}
                        handleAdd={handleAdd}
                        handleDetele={handleDetele}
                        saveChange={saveChange}
                      />
                    </>
                  )}
                </>
              );
            })}
          </Paper>
        </>
      );
    } else if (fields.type == "boolean") {
      return (
        <>
          <CheckBoxFields element={fields} index={i} saveChange={saveChange} />
        </>
      );
    } else if (fields.type == "enum") {
      return (
        <>
          <FormControl variant="outlined">
            <SelectFields fields={fields} indx={i} saveChange={saveChange} />
          </FormControl>
        </>
      );
    } else if (fields.type == "array") {
      return (
        <Paper
          style={{ marginTop: "20px", padding: "20px" }}
          variant="outlined"
        >
          <Typography variant="h5" gutterBottom>
            {fields.label}
          </Typography>
          <Paper
            style={{ display: "flex", flexDirection: "column", padding: 20 }}
            variant="outlined"
          >
            {fields.item.map((nestedObject: any, nestedObjIndex: any) => {
              return (
                <>
                  {nestedObject.type !== "object" ? (
                    <>
                      <TextFields
                        fields={fields}
                        indx={i}
                        saveChange={saveChange}
                        element={nestedObject}
                      />
                    </>
                  ) : (
                    <>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <RenderNastedForm
                          element={nestedObject}
                          index={i + "-" + nestedObjIndex}
                          handleAdd={handleAdd}
                          handleDetele={handleDetele}
                          saveChange={saveChange}
                        />
                        <Button
                          style={{
                            marginTop: "20px",
                            width: "100px",
                            height: "50px",
                            marginLeft: 20,
                          }}
                          disabled={fields.item.length > 1 ? false : true}
                          variant="outlined"
                          onClick={() => {
                            handleDetele(nestedObjIndex, fields);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    </>
                  )}
                </>
              );
            })}
            <Button
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                marginTop: "20px",
                width: "100px",
              }}
              variant="outlined"
              onClick={() => {
                handleAdd(i, fields);
              }}
            >
              Add
            </Button>
          </Paper>
        </Paper>
      );
    } else {
      return (
        <>
          <Paper>
            <Box>
              <Typography variant="h5" gutterBottom>
                invalid type at properties[{index}].type={element.type}
              </Typography>
            </Box>
          </Paper>
        </>
      );
    }
  };

  return <>{formContent(element, index)}</>;
};
