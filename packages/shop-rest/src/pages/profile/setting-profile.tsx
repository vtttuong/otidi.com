import axios from "axios";
import Notice from "components/notice/notice";
import { SEO } from "components/seo";
import { ProfileProvider } from "contexts/profile/profile.provider";
import SettingsContent from "features/user-profile/settings/settings";
import {
  ContainBody,
  ContentContainer,
  PageWrapper,
} from "features/user-profile/user-profile.style";
import Footer from "layouts/footer";
import { NextPage } from "next";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { getSettingProfile } from "utils/api/profile";
import { getCookie, setCookie } from "utils/session";
type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  data: any;
  token: string;
};

const ProfilePage: NextPage<Props> = ({ data, token, deviceType }) => {
  const [dataUser, setDataUser] = useState(data);
  const [isAlert, setisAlert] = useState(false);
  const [idError, setIdError] = useState(null);
  const [infoError, setInfoError] = useState(null);
  const [isAlertId, setisAlertId] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingId, setLoadingId] = useState(false);

  setTimeout(() => {
    setisAlert(false);
    setisAlertId(false);
  }, 3000);

  const handleSubmit = async (e, location) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());
    setIdError(null);
    setInfoError(null);

    if (formDataObj.frontId && formDataObj.backId) {
      if (
        formDataObj.frontId["name"] !== "" ||
        formDataObj.backId["name"] !== ""
      ) {
        setLoadingId(true);
        const newForm = new FormData();
        newForm.set("image_front", formDataObj.frontId);
        newForm.set("image_back", formDataObj.backId);
        const configs = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": `multipart/form-data;`,
          },
        };
        axios
          .post(
            process.env.NEXT_PUBLIC_LARAVEL_API_URL_CLIENT +
              "/me/identity-card/verify",
            newForm,
            configs
          )
          .then((response) => response.data)
          .then((data) => {
            setLoadingId(false);

            if (data && data.success) {
              setisAlertId(true);
              setIdError(null);
              setCookie("userFrontId", data.data?.img_front_url);
              setCookie("userBackId", data.data?.img_back_url);
              return;
            } else if (data && !data.success) {
              const error = data.data;
              setIdError(
                error.image_back || error.image_front
                  ? "Please upload both of two sides of your identity"
                  : null
              );
            }
          })
          .catch((err) => {
            setIdError("Failed to upload identify card");
          });
        return;
      }
      return;
    }

    setLoadingUpdate(true);
    const newForm = new FormData();

    newForm.set("name", formDataObj.name);
    newForm.set("phone_number", formDataObj.phone);
    newForm.set("address", location?.address);
    newForm.set("latitude", location?.latitude);
    newForm.set("longitude", location?.longitude);
    newForm.set("avatar", formDataObj.profileImg);

    const configs = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": `multipart/form-data;`,
      },
    };

    axios
      .post(
        process.env.NEXT_PUBLIC_LARAVEL_API_URL_CLIENT + "/me",
        newForm,
        configs
      )
      .then((response) => {
        setLoadingUpdate(false);

        if (response.data && response.data.success) {
          setisAlert(true);
          setInfoError(null);
          setCookie("userAvatar", response.data.data[0]?.avatar);
          setDataUser(response.data.data[0]);
          return;
        } else if (response.data && !response.data.success) {
          const error = response.data.data;

          console.log(error);

          setInfoError({
            name: error.name
              ? "User name must have length greater than 0!"
              : null,
            phone_number: error.phone_number ? "Invalid phone number!" : null,
            address:
              error.address || error.latitude || error.longitude ? (
                <FormattedMessage
                  id="addressError"
                  defaultMessage={
                    "Please enter address then select your location!!!"
                  }
                />
              ) : null,
            avatar: error.avatar ? (
              <FormattedMessage
                id="avatarSizeError"
                defaultMessage={
                  "The avatar must not be greater than 512 kilobytes!!!"
                }
              />
            ) : null,
          });
        }
      });
  };

  return (
    <>
      <SEO title="Profile - 2HandApp" description="Profile Details" />
      <ProfileProvider initData={dataUser}>
        <PageWrapper>
          <ContainBody>
            <ContentContainer>
              <SettingsContent
                handleSubmit={handleSubmit}
                data={dataUser}
                deviceType={deviceType}
                alert={isAlert}
                error={infoError}
                loadingUpdate={loadingUpdate}
                loadingId={loadingId}
                token={token}
              />
            </ContentContainer>
          </ContainBody>
          {isAlertId ? (
            <Notice
              status="success"
              content={
                <FormattedMessage
                  id="updateSuccess"
                  defaultMessage="Updated Identity"
                />
              }
            />
          ) : null}

          {idError ? <Notice status="error" content={idError} /> : null}
          <Footer />
        </PageWrapper>
      </ProfileProvider>
    </>
  );
};

export async function getServerSideProps(context) {
  const token = getCookie("access_token", context);

  if (token === null) {
    // If `ctx.req` is available it means we are on the server.
    context.res.writeHead(302, { Location: "/login" });
    context.res.end();
  }
  const data = await getSettingProfile(token);

  return {
    props: {
      data: data || {},
      token: token,
    }, // will be passed to the page component as props
  };
}

export default ProfilePage;
