import { styled } from "baseui";
import React from "react";

const Thumb = styled("div", ({ $theme }) => ({
  ...$theme.borders.borderEA,
  display: "inline-flex",
  borderRadius: "2px",
  marginBottom: "8px",
  marginRight: "8px",
  width: "100%",
  height: "100px",
  padding: "4px",
  boxSizing: "border-box",
}));

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

function UploaderForApprove({ onChange, images }: any) {
  const storageUrl = process.env.REACT_APP_LARAVEL_STORAGE_URL;

  return (
    <section className="container uploader">
      {
        <Thumb key={"container_uploaded_aprrove"}>
          {images.map((image) => (
            <div
              key={image.id}
              className={`previewImage_${image.id}`}
              style={thumbInner}
            >
              <img src={storageUrl + image.url} style={img} alt={image.name} />
            </div>
          ))}
        </Thumb>
      }
    </section>
  );
}

export default UploaderForApprove;
