import React, { useEffect, useState, useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { FormattedMessage } from "react-intl";
import {
  Text,
  TextHighlighted,
  Container,
  ThumbsContainer,
  Thumb,
  ThumbInner,
  Img,
} from "./upload.style";
import { UploadIcon } from "assets/icons/UploadIcon";
import { PostFormContext } from "../../contexts/post-form/post-form.context";

type Props = {
  onChange: any;
  intlUploadText: any;
  imagefiles?: any;
};

const Uploader: React.FC<Props> = ({
  onChange,
  intlUploadText,
  imagefiles,
}: any) => {
  const [files, setFiles] = useState(imagefiles ? imagefiles : []);
  const { state, dispatch } = useContext(PostFormContext);
  const listObjectURL = [];
  const ACCEPTED_SIZE = 512 * 1000;

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: true,
    onDrop: useCallback(
      (acceptedFiles) => {
        // acceptedFiles = acceptedFiles.filter(
        //   (file) => file.size <= ACCEPTED_SIZE
        // );

        // Trường hợp muốn add ảnh liên tục mà không bị mất ảnh cũ

        // setFiles([
        //   ...files,
        //   ...acceptedFiles.map((file) =>
        //     Object.assign(file, {
        //       preview: URL.createObjectURL(file),
        //     })
        //   ),
        // ]);

        //revoke url from the previous files
        setFiles([...acceptedFiles]);
        onChange(acceptedFiles);

        dispatch({
          type: "HANDLE_ON_SELECT_CHANGE",
          payload: { value: acceptedFiles, field: "files" },
        });
      },
      [onChange]
    ),
  });

  const removeUploadedImage = (index: number) => {
    const images = [
      ...state.files.slice(0, index),
      ...state.files.slice(index + 1),
    ];

    dispatch({
      type: "HANDLE_ON_SELECT_CHANGE",
      payload: { value: images, field: "files" },
    });
  };

  const thumbs =
    state.files &&
    state.files !== "" &&
    state.files.map((file, index) => {
      const objectURL = file.url ? file.url : URL.createObjectURL(file);
      listObjectURL.push(objectURL);
      const newFile = {
        ...file,
        preview: objectURL,
      };
      return (
        <Thumb key={newFile.name}>
          <ThumbInner>
            <Img
              style={{ objectFit: "cover" }}
              src={newFile.url ? newFile.url : newFile.preview}
              alt={newFile.url}
            />

            <span onClick={() => removeUploadedImage(index)} className="remove">
              x
            </span>
          </ThumbInner>
        </Thumb>
      );
    });

  useEffect(() => {
    return () => {
      //avoid memory leaks
      listObjectURL.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  return (
    <section className="container uploader" style={{ padding: 0, border: 0 }}>
      <Container {...getRootProps()}>
        <input {...getInputProps()} />
        <UploadIcon />
        <Text>
          {intlUploadText ? (
            <FormattedMessage id={intlUploadText} />
          ) : (
            <>
              <TextHighlighted>Drag/Upload</TextHighlighted> your file here
            </>
          )}
        </Text>
      </Container>
      {thumbs && <ThumbsContainer>{thumbs}</ThumbsContainer>}
    </section>
  );
};

export default Uploader;
