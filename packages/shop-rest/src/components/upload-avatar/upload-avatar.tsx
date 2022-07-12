import { Camera } from "assets/icons/camera";
import { AvatarModal } from "components/avatar-modal/avatar-modal";
import { ImageCrop } from "components/image-crop/image-crop";
import Image from "components/image/image";
import React, { useCallback, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { getCookie } from "utils/session";
import { MainDiv, ProfileImageDiv } from "./upload-avatar.style";

export const verifyFile = (file, acceptedFileExtensions) => {
  const { name } = file;

  var filExtenion = name.substring(name.lastIndexOf(".") + 1);

  if (acceptedFileExtensions.includes(filExtenion)) {
    return true;
  }

  return false;
};

const UploadAvatar: React.FC<{}> = () => {
  const initialState = {
    userProfileImage: null,
    selectedFile: null,
    editor: null,
  };

  let imageEditor = null;
  const [imageData, setImageData] = useState(initialState);
  const [showModal, setShowModal] = useState(false);
  const [avatarValue, setAvatarValue] = useState(null);

  const setEditorRef = (editor) => {
    imageEditor = editor;
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onImageCrop = () => {
    if (imageEditor !== null) {
      const img = imageEditor.getImageScaledToCanvas();
      const url = img.toDataURL();

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
    let avatar = getCookie("userAvatar");
    const profileImage = imageData.userProfileImage
      ? imageData.userProfileImage
      : avatar;

    return <img src={profileImage} alt="user-logo" />;
  };

  return (
    <ProfileImageDiv>
      <MainDiv>
        {renderProfileImage()}
        <br />
        <label
          className="label-upload"
          title="Select image"
          style={{ padding: "0px", justifyContent: "center", display: "flex" }}
        >
          <input
            hidden
            type="file"
            name="profileImg"
            accept="image/png, image/jpeg, image/jpg"
            onChange={onImageFileChangeHandler}
          />
          <Camera width={25} height={25} style={{ marginRight: "10px" }} />{" "}
          <span>
            <FormattedMessage
              id="uploadAvatarTitle"
              defaultMessage="Upload Avatars"
            />
          </span>
        </label>

        {/*<Button size='medium' style={{ width: '40%', marginLeft: 90 }} onClick ={onImageFileChangeHandler}>*/}
        {/*    <FormattedMessage id='saveImage' defaultMessage='Change' />*/}
        {/*</Button>*/}

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

export default UploadAvatar;
