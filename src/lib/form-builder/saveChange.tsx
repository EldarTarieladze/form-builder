export default function SaveChange(jsonData: any, element: any, index: any, value: any) {
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
      SaveChange(jsonData,element.properties[index[0]], arr, value);
    } else if (element.type == "array") {
      let arr = [...index];
      arr.shift();
      SaveChange(jsonData,element.item[index[0]], arr, value);
    }

  };
}
