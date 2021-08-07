import { Box, Paper, Typography, Button } from "@material-ui/core";
import { EndOfLineState, getConstantValue } from "typescript";
import { ObjectSchema } from "./types";
import React, { useEffect, useState } from "react";
import { RenderForm } from "./renderForm";
type Props = {
  // schema: ObjectSchema,
  jsonData: ObjectSchema;
  onSubmit: (values: any) => void;
};

export const FormBuilder = ({ jsonData, onSubmit }: Props) => {
  const [watcher, setWatcher] = useState(false);
  const App = () => {};
  const handleAdd = (index: any, eln: any) => {
    if (index.toString().includes("-")) {
      let JsonclearValue = JSON.parse(JSON.stringify(eln.item[0]));
      JsonclearValue.properties.map((item: any) => {
        item.value = "";
      });
      eln.item = [...eln.item, JsonclearValue];
    } else {
      let JsonclearValue = JSON.parse(JSON.stringify(eln.item[0]));
      JsonclearValue.properties.map((item: any) => {
        item.value = "";
      });
      eln.item = [...eln.item, JsonclearValue];
    }
    setWatcher(!watcher);
  };

  let newJSON: any = {};

  const checkNesteditemType = (item: any, previousItem: any, index: any) => {
    if (
      item.type === "string" ||
      item.type === "number" ||
      item.type === "enum" ||
      item.type == "boolean"
    ) {
      checkItemType(item, index, previousItem);
    } else if (item.type === "object") {
      previousItem[index] = {};

      previousItem[index][item["name"]] = {};
      item.properties.map((el: any, indexx: number) => {
        checkItemType(el, index, previousItem[index][item["name"]]);
      });
    } else if (item.type === "array") {
      previousItem[item["name"]] = [];
      item.item.map((el: any, index: number) => {
        checkItemType(el, index, previousItem[item["name"]]);
      });
    }
  };

  const checkItemType = (item: any, index: any, newItem: any) => {
    if (
      item.type == "string" ||
      item.type == "number" ||
      item.type == "enum" ||
      item.type == "boolean"
    ) {
      newItem[item["name"]] = {};
      if (item.type == "boolean") {
        newItem[item["name"]] = item.value == true ? "yes" : "no";
      } else {
        newItem[item["name"]] = item.value ? item.value : "null";
      }
    } else if (item.type === "object") {
      newItem[item["name"]] = {};
      item.properties.map((el: any, ind: any) => {
        checkNesteditemType(el, newItem[item["name"]], ind);
      });
    } else if (item.type === "array") {
      newItem[item["name"]] = [];
      item.item.map((el: any, indx: any) => {
        checkNesteditemType(el, newItem[item["name"]], indx);
      });
    }
  };

  const createJSON = () => {
    jsonData.properties.map((item: any, index: number) => {
      checkItemType(item, index, newJSON);
    });
  };

  const handleDetele = (index: any, eln: any) => {
    let arr2 = JSON.parse(JSON.stringify(eln.item));
    let arr = arr2.filter((value: any, i: any) => i !== index);
    eln.item = [...arr];
    setWatcher(!watcher);
  };
  const saveChange = (element: any, index: any, value: any) => {
    if (index.toString().includes("-")) {
      let arr = [...index.toString().split("-")];
      arr.shift();
      saveChange(
        jsonData.properties[index.toString().split("-")[0]],
        arr,
        value
      );
    } else if (
      element.type == "string" ||
      element.type == "number" ||
      element.type == "enum" ||
      element.type == "boolean"
    ) {
      element.value = value;
    } else if (element.type == "object") {
      let arr = [...index];
      arr.shift();
      saveChange(element.properties[index[0]], arr, value);
    } else if (element.type == "array") {
      let arr = [...index];
      arr.shift();
      saveChange(element.item[index[0]], arr, value);
    }

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
        onSubmit={(e) => {
          e.preventDefault();
          createJSON();
          onSubmit(newJSON);
        }}
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
          // onSubmit={(e) => {

          // }}
        >
          Submitt
        </Button>
      </Box>
    </Paper>
  );
};
