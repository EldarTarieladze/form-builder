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
import { RenderNastedForm } from "./renderNastedForm"
type Props = {
  // schema: ObjectSchema,
  index: any;
  element: ObjectSchema;
  handleAdd: any;
};

export const RenderForm = ({ element, index, handleAdd }: Props) => {
  const [country, setCountry] = useState("");

  // const nestedFormContent = (item: any, itemIndex: any) => {
  //   return (
  //     <>
  //       <Paper
  //         style={{
  //           marginTop: 7,
  //           padding: 20,
  //           display: "flex",
  //           flexDirection: "column",
  //         }}
  //         variant="outlined"
  //       >
  //         <Typography variant="h5" gutterBottom>
  //           {item.label}
  //         </Typography>
  //         {item.properties.map((nestedObj: any, nestedIndex: any) => {
  //           console.log(nestedObj)
  //           return (
  //             <>
  //               {nestedObj.type !== "object" ? (
  //                 <>{formContent(nestedObj, nestedIndex)}</>
  //               ) : (
  //                 <>{nestedFormContent(nestedObj, nestedIndex)}
  //                 </>
  //               )}
  //             </>
  //           );
  //         })}
  //       </Paper>
  //     </>
  //   );
  // };
  const formContent = (fields: any, i: any) => {
    if (fields.type == "string" || fields.type == "number") {
      return (
        <>
          <TextField
            name={fields.name}
            type={fields.inputType ? fields.inputType : fields.type}
            required={fields.required}
            id="outlined-basic"
            label={fields.label}
            variant="outlined"
          ></TextField>
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
                      <TextField
                        name={element.name}
                        type={element.type}
                        required={element.required}
                        id="outlined-basic"
                        label={element.label}
                        variant="outlined"
                      ></TextField>
                    </>
                  ) : (
                    <>
                    {/* {nestedFormContent(element, indx)} */}
                        <RenderNastedForm
                          element={element}
                          index={indx}
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
          <Typography variant="h6" gutterBottom>
            <Checkbox />
            {fields.label}
          </Typography>
        </>
      );
    } else if (fields.type == "enum") {
      console.log(fields);

      return (
        <>
          <FormControl variant="outlined">
            {/* <InputLabel id="demo-simple-select-outlined-label">
              {fields.label}
            </InputLabel> */}
            <select>
              {fields.options.map((opt: any) => {
                return (
                  <>
                    <option value={opt.value}>{opt.label}</option>
                  </>
                );
              })}
            </select>
          </FormControl>
        </>
      );
    } else if (fields.type == "array") {
      fields.item.map((itm: any) => {
        console.log(itm);
      });
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
                    {/* {nestedFormContent(nestedObject, nestedObjIndex)} */}
                    <TextField
                        name={nestedObject.name}
                        type={nestedObject.type}
                        required={nestedObject.required}
                        id="outlined-basic"
                        label={nestedObject.label}
                        variant="outlined"
                      ></TextField>
                    </>
                  ) : (
                    <>
                    <RenderNastedForm
                          element={nestedObject}
                          index={nestedObjIndex}
                        />

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
                handleAdd(i);
              }}
            >
              Add
            </Button>
          </Paper>
        </Paper>
      );
    }
  };

  return <>{formContent(element, index)}</>;
};
