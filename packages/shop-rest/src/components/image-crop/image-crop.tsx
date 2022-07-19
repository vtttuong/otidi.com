import React, { useState, Fragment } from "react";
import AvatarEditor from "react-avatar-editor";
import { Button } from "components/button-avatar/button";
import { MainEditor } from "./image-crop.style";

export const ImageCrop = (props) => {
  const { imagefile, setEditorRef, onImageCrop, width, height } = props;

  const [scaleValue, setScaleValue] = useState(1);

  const onScaleChange = (e) => {
    const value = parseFloat(e.target.value);
    setScaleValue(value);
  };

  return (
    <>
      <div className="editor" style={{ textAlign: "center" }}>
        <AvatarEditor
          image={imagefile}
          border={5}
          scale={scaleValue}
          rotate={0}
          ref={setEditorRef}
          height={height}
          width={width}
        />
      </div>

      <MainEditor>
        <div>
          <input
            type="range"
            value={scaleValue}
            min="1"
            max="10"
            className="actions"
            onChange={(e) => onScaleChange(e)}
          />
        </div>
        <div>
          <Button onClick={onImageCrop} title="Crop" />
        </div>
      </MainEditor>
    </>
  );
};
