import { styled } from "baseui";
import React from "react";

const Thumb = styled("div", ({ $theme }) => ({
  ...$theme.borders.borderEA,
  display: "flex",
  gap: "10px",
  borderRadius: "2px",
  marginBottom: "8px",
  marginRight: "8px",
  width: "100%",
  height: "auto",
  padding: "4px",
  boxSizing: "border-box",
  flexWrap: "wrap",
}));

const thumbInner = {
  display: "flex",
  overflow: "hidden",
  width: "150px",
  height: "150px",
};

const img = {
  display: "block",
  width: "100%",
  height: "auto",
  objectFit: "cover",
};

function UploaderForApprove({ onChange, images = [] }: any) {
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
              <img
                src={image.url}
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
                alt={image.url}
              />
            </div>
          ))}
        </Thumb>
      }
    </section>
  );
}

export default UploaderForApprove;
