import { Box, Paper, Typography, Button } from "@material-ui/core";
import { StringDecoder } from "node:string_decoder";
import { EndOfLineState, getConstantValue } from "typescript";
import { ObjectSchema } from "./types";
import React, { useEffect, useState } from "react";
import { RenderForm } from "./renderForm";
import { AnyARecord } from "dns";
import { ENOLINK } from "node:constants";
import testSchemaJson from "schemas/test.json";
import newJson from "./../../schemas/newJson.json"
type Props = {
  // schema: ObjectSchema,
  jsonData: ObjectSchema;
  onSubmit: (values: any) => void;
  newJson: any
};

export const FormBuilder = ({ jsonData, onSubmit, newJson }: Props) => {
  const [watcher, setWatcher] = useState(false);
  const App = () => {};
  const handleAdd = (index: any, eln: any) => {
    if (index.toString().includes("-")) {
      let tt = index.split("-");
      let x = eln.item[0]
      eln.item = [...eln.item, JSON.parse(JSON.stringify(eln.item[0]))]

    } else {
      let x = eln.item[0]
      eln.item = [...eln.item, JSON.parse(JSON.stringify(eln.item[0]))]
    }
    setWatcher(!watcher);
  };

  const handleDetele = (index: any, eln: any) => {
    console.log( "sada")
    let arr2 = JSON.parse(JSON.stringify(eln.item))
    let arr = arr2.filter((value:any, i:any) =>i !==index );
    console.log(arr)
    eln.item = [...arr]
    console.log(eln.item)
    setWatcher(!watcher);
  };
  let vv = false;
  const saveChange = (element: any, index: any, value: any) => {
    if (!vv) {
      vv = true;
      let arr = index.toString().split("-");
      arr.shift();
      let x = index.toString()
      saveChange(jsonData.properties[x[0]], arr, value);
    } else if (element.type == "string" || element.type == "number") {
      console.log(element)
      element.value = value;
      vv= false
    } else if (element.type == "object") {
      let arr = [...index]
      arr.shift();
      saveChange(element.properties[index[0]], arr, value);
    } else if (element.type == "array") {
      let arr = [...index]
      arr.shift();
      saveChange(element.item[index[0]], arr, value);
    }
    console.log(jsonData)
    // element.value = value;
  };

  useEffect(() => {
    formRender();
  }, [watcher]);

  const formRender = () => {
    return (
      <>
        {jsonData.properties.map((fields: any, index: any) => {
          return (
            <>
              <RenderForm
                element={fields}
                index={index}
                handleAdd={handleAdd}
                handleDetele={handleDetele}
                saveChange={saveChange}
              />
            </>
          );
        })}
      </>
    );
  };

  return (
    <Paper>
      <Box
        data-testid="root-form"
        p={2}
        display="flex"
        flexDirection="column"
        component="form"
      >
        <Typography variant="h5" gutterBottom>
          {jsonData.label}
        </Typography>

        {jsonData.type == "object" ? (
          <>{formRender()}</>
        ) : (
          <>
            <div>invalidjson</div>
          </>
        )}
        {/* Code here */}
        <Button
          style={{ marginTop: "20px" }}
          variant="contained"
          color="primary"
          type="submit"
          onClick={() => {
            onSubmit(jsonData);
          }}
        >
          Submitt
        </Button>
      </Box>
    </Paper>
  );
};
