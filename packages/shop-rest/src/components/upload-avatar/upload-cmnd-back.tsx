import React, { useState } from "react";
import { ImageCrop } from "components/image-crop/image-crop";
import { AvatarModal } from "components/avatar-modal/avatar-modal";
import { ProfileImageDiv, MainDiv } from "./upload-avatar.style";
import defaultImage from "assets/images/user.jpg";
import { FormattedMessage } from "react-intl";
import { Button } from "../button/button";
import { Camera } from "assets/icons/camera";
import { getCookie } from "utils/session";

export const verifyFile = (file, acceptedFileExtensions) => {
  const { name } = file;

  var filExtenion = name.substring(name.lastIndexOf(".") + 1);

  if (acceptedFileExtensions.includes(filExtenion)) {
    return true;
  }

  return false;
};

const UploadCMNDBack: React.FC<{}> = () => {
  const initialState = {
    userProfileImage: null,
    selectedFile: null,
    editor: null,
  };

  let imageEditor = null;
  const [imageData, setImageData] = useState(initialState);
  const [showModal, setShowModal] = useState(false);

  const setEditorRef = (editor) => {
    imageEditor = editor;
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onImageCrop = () => {
    if (imageEditor !== null) {
      const url = imageEditor.getImageScaledToCanvas().toDataURL();
      setImageData({
        ...imageData,
        userProfileImage: url,
      });
    }
    toggleModal();
  };

  const onImageFileChangeHandler = (e) => {
    const file = e.target.files[0];
    const acceptedFileExtensions = ["png", "jpg", "jpeg", "gif"];

    if (file !== undefined && verifyFile(file, acceptedFileExtensions)) {
      setImageData({
        ...imageData,
        selectedFile: file,
      });
      setShowModal(true);
    }
  };

  const renderProfileImage = () => {
    let avata = getCookie("userBackId");
    const profileImage = imageData.userProfileImage
      ? imageData.userProfileImage
      : avata;

    return <img className="front-image" src={profileImage} alt="user-logo" />;
  };

  return (
    <ProfileImageDiv>
      <MainDiv>
        {renderProfileImage()}

        <br />
        <label
          className="label-upload-back"
          title="Select image"
          style={{
            padding: "0px",
            justifyContent: "center",
            display: "flex",
            cursor: "pointer",
          }}
        >
          <input
            hidden
            type="file"
            name="backId"
            accept="image/png, image/jpeg, image/jpg"
            onChange={onImageFileChangeHandler}
          />
          <Camera width={25} height={25} style={{ marginRight: "10px" }} />{" "}
          <span>
            <FormattedMessage id="backId" />
          </span>
        </label>

        <AvatarModal show={showModal} onClose={toggleModal} title="Crop">
          <ImageCrop
            imagefile={imageData.selectedFile}
            setEditorRef={setEditorRef}
            onImageCrop={onImageCrop}
          />
        </AvatarModal>
      </MainDiv>
    </ProfileImageDiv>
  );
};

export default UploadCMNDBack;
