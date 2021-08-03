import {
  Box,
  Paper,
  Typography,
  Button
} from "@material-ui/core";
import { StringDecoder } from "node:string_decoder";
import { getConstantValue } from "typescript";
import { ObjectSchema } from "./types";
import React, { useEffect, useState } from "react";
import { RenderForm } from "./renderForm"
import { AnyARecord } from "dns";

type Props = {
  // schema: ObjectSchema,
  jsonData: ObjectSchema;
  onSubmit: (values: any) => void;
};

export const FormBuilder = ({ jsonData, onSubmit }: Props) => {
    const [watcher, setWatcher] = useState(false)

  const App = () => {};
  const handleAdd = (event: any) =>{
      jsonData.properties.map((element: any, elementIndex: any) => {
          if(elementIndex == event){
            element.item.push(element.item[0])
          }
      })
      setWatcher(!watcher)

  }

  useEffect(() => {
    formRender()
  },[watcher])

  const formRender = () => {
    return(
      <>
      {jsonData.properties.map((fields: any, index: any) => {
          return(
            <>
              <RenderForm
                element={fields}
                index={index}
                handleAdd={handleAdd}
              />
            </>
          )
        })}
      </>
    )

  }

  return (
    <Paper>
      <Box
        p={2}
        display="flex"
        flexDirection="column"
        component="form"
      >
        <Typography variant="h5" gutterBottom>
          {jsonData.label}
        </Typography>

        {
          jsonData.type == "object" ? (<>{formRender()}</>) : (<><div>invalidjson</div></>)
        }
        {/* Code here */}
        <Button
          style={{ marginTop: "20px" }}
          variant="contained"
          color="primary"
          onClick={() => {
            jsonData.properties.map((it: any) => {
                console.log(it)
            })
            onSubmit(jsonData);
          }}
        >
          Submitt
        </Button>
      </Box>
    </Paper>
  );
};
