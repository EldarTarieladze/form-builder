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
  Checkbox
} from "@material-ui/core";
import { log } from "console";
import { StringDecoder } from "node:string_decoder";
import { getConstantValue } from "typescript";
import { ObjectSchema } from "./types";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

type Props = {
  // schema: ObjectSchema,
  jsonData: ObjectSchema;
  onSubmit: (values: any) => void;
};

export const FormBuilder = ({ jsonData, onSubmit }: Props) => {
  const [data, setData] = useState("");
  const func = (value: string, property: string): void => {
    setData(value);
    console.log(value, property);
  };
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const onsub = (): void => {
    console.log(data);
  };
  const content = () => {
    return jsonData.properties.map((element) => {
      if (element.type == "string" || element.type == "number") {
        return (
          <>
            <TextField
              name={element.name}
              type={element.type}
              id="outlined-basic"
              label={element.label}
              variant="outlined"
              onChange={(e) => {
                func(e.target.value, e.target.name);
              }}
            ></TextField>
          </>
        );
      } else if (element.type == "enum") {
        return (
          <>
            <FormControl variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                {element.label}
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Age"
              >
                {element.options.map((opt) => {
                  return (
                    <>
                      <MenuItem value={opt.value}>{opt.label}</MenuItem>
                    </>
                  );
                })}
              </Select>
            </FormControl>
          </>
        );
      } else if (element.type == "array") {
        return (
          <>
            <Paper variant="outlined" style={{ marginTop: "20px" }}>
              <Box style={{ margin: "10px" }}>
                <Typography variant="h5" gutterBottom>
                  {element.label}
                </Typography>
                <Paper variant="outlined" style={{ marginBottom: "20px" }}>
                  <Box
                    p={2}
                    display="flex"
                    flexDirection="column"
                    component="form"
                  >
                    {element.item.properties.map((it) => {
                      if (it.type == "string" || it.type == "number") {
                        return (
                          <>
                            <TextField
                              name={it.name}
                              type={it.type}
                              required={it.required}
                              id="outlined-basic"
                              label={element.label}
                              variant="outlined"
                              onChange={(e) => {
                                func(e.target.value, e.target.name);
                              }}
                            ></TextField>
                          </>
                        );
                      }
                    })}
                  </Box>
                </Paper>
                <Button
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    width: "100px",
                  }}
                  variant="outlined"
                >
                  Add
                </Button>
              </Box>
            </Paper>
          </>
        );
      } else if(element.type == "boolean"){
            return(
              <>
                <Typography variant="h6" gutterBottom>
                <Checkbox
                value={true}
                inputProps={{ 'aria-label': 'Checkbox A' }}
                />{element.label}
                </Typography>
              </>
            )
      }else if(element.type == "object"){
        return(
          <>
          {
            element.properties.map((prop: any, i: any) => {
              if(prop.type == "object"){
                prop.properties.map((pp: any, ind: any) => {
                  console.log(pp)
                })
              }
              })
            })
          </>
        )
      }
    });
    return (
      <>
        {/* {jsonData.properties.map((item) => {
          return (
            <>
              {item.type == "enum" ? (
                <>
                  <FormControl variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">
                      {item.label}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      label="Age"
                    >
                      {item.options.map((opt) => {
                        return(
                          <>
                            <MenuItem value={opt.value}>{opt.label}</MenuItem>
                          </>
                        )
                      })}

                    </Select>
                  </FormControl>
                </>
              ) : (
                <>
                  <TextField
                    name={item.name}
                    type={item.type}
                    id="outlined-basic"
                    label={item.label}
                    variant="outlined"
                    onChange={(e) => {
                      func(e.target.value, e.target.name);
                    }}
                  ></TextField>
                </>
              )}
            </>
          );
        })} */}
      </>
    );
  };

  const App = () => {};

  return (
    <Paper>
      <Box
        p={2}
        display="flex"
        flexDirection="column"
        component="form"
        onSubmit={(event) => {
          onsub();
        }}
      >
        <Typography variant="h5" gutterBottom>
          {jsonData.label}
        </Typography>
        {content()}
        {/* Code here */}
        <Button
          style={{marginTop: "20px"}}
          variant="contained"
          color="primary"
          onClick={() => {
            onsub();
          }}
        >
          Submitt
        </Button>
      </Box>
    </Paper>
  );
};
