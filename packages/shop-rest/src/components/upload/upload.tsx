import React, {useEffect, useState, useCallback, useContext} from 'react';
import { useDropzone } from 'react-dropzone';
import { FormattedMessage } from 'react-intl';
import {
  Text,
  TextHighlighted,
  Container,
  ThumbsContainer,
  Thumb,
  ThumbInner,
  Img,
} from './upload.style';
import { UploadIcon } from 'assets/icons/UploadIcon';
import {PostFormContext} from "../../contexts/post-form/post-form.context";

type Props = {
    onChange: any;
    intlUploadText: any;
    imagefiles?: any;
};

const Uploader: React.FC<Props> = ({ onChange, intlUploadText, imagefiles}: any) => {
    const [files, setFiles] = useState(imagefiles ? imagefiles : []);
    const { state, dispatch } = useContext(PostFormContext);
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        multiple: true,
        onDrop: useCallback(
        (acceptedFiles) => {
            // Trường hợp muốn add ảnh liên tục mà không bị mất ảnh cũ
            // setFiles(
            //     [
            //         ...files,
            //         ...acceptedFiles.map((file) =>
            //             Object.assign(file, {
            //                 preview: URL.createObjectURL(file),
            //             })
            //         )
            //     ]
            // );
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
            onChange(acceptedFiles);
            dispatch({
                type: 'HANDLE_ON_SELECT_CHANGE',
                payload: { value: acceptedFiles, field: 'files' },
            });
            },
            [onChange]
        ),
    });

    const thumbs = files.map((file) => (
            <Thumb key={file.id ? file.id : file.name}>
                <ThumbInner>
                <Img src={file.url ? file.url_img : file.preview} alt={file.url} />
                </ThumbInner>
            </Thumb>
        ))

    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            files.forEach((file) => URL.revokeObjectURL(file.url ? file.url_img : file.preview));
            },
        [files]
    );
    return (
        <section className="container uploader" style={{padding: 0, border:0}}>
            <Container {...getRootProps()}>
                <input {...getInputProps()} />
                <UploadIcon />
                <Text>
                    {intlUploadText ? (
                        <FormattedMessage id={intlUploadText} />) : (
                            <><TextHighlighted>Drag/Upload</TextHighlighted> your file here</>
                        )
                    }
                </Text>
            </Container>
            {thumbs && <ThumbsContainer>{thumbs}</ThumbsContainer>}
        </section>
    );
};

export default Uploader;
