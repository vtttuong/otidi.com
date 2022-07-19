import * as fs from "fs";

const srcToFile = async (src, fileName) => {
  let result = null;
  await fetch(src)
    .then(async (response) => {
      const contentType = response.headers.get("content-type");
      const blob = await response.blob();
      const file = new File([blob], fileName, { type: contentType });
      // Access File Here
      result = file;
    })
    .catch((error) => {
      return null;
    });

  return result;
};

export default srcToFile;
