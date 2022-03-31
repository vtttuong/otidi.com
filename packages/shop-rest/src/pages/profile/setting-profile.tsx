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
  const [isAlertId, setisAlertId] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingId, setLoadingId] = useState(false);

  setTimeout(() => {
    setisAlert(false);
    setisAlertId(false);
  }, 3000);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());

    if (formDataObj.frontId && formDataObj.backId) {
      if (
        formDataObj.frontId["name"] === "" ||
        formDataObj.backId["name"] === ""
      ) {
        return;
      }
      setLoadingId(true);
      const newForm = new FormData();
      newForm.set("left_side_image", formDataObj.frontId);
      newForm.set("right_side_image", formDataObj.backId);
      const configs = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": `multipart/form-data;`,
        },
      };
      axios
        .post(
          process.env.NEXT_PUBLIC_LARAVEL_API_URL + "/api/client/v1/identify",
          newForm,
          configs
        )
        .then((response) => {
          setLoadingId(false);

          if (response.status === 200 || response.status === 201) {
            setisAlertId(true);
            setCookie("userFrontId", response.data.left_side_url);
            setCookie("userBackId", response.data.right_side_url);
            return;
          }
        });
      return;
    }
    setLoadingUpdate(true);
    const newForm = new FormData();

    newForm.set("facebook", formDataObj.facebook);
    newForm.set("skype", formDataObj.skype);
    newForm.set("name", formDataObj.name);
    newForm.set("phone_number", formDataObj.phone);
    newForm.set("address", formDataObj.address);
    newForm.set("birthday", formDataObj.birthday);
    newForm.set("sex", formDataObj.sex);
    newForm.set("website", formDataObj.website);
    newForm.set("avatar_url", formDataObj.profileImg);
    const configs = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": `multipart/form-data;`,
      },
    };

    axios
      .post(
        process.env.NEXT_PUBLIC_LARAVEL_API_URL + "/api/client/v1/me/profile",
        newForm,
        configs
      )
      .then((response) => {
        setLoadingUpdate(false);

        if (response.status === 200) {
          setisAlert(true);
          setCookie("userAvatar", response.data.avatar_url);
          setDataUser(response.data);
          return;
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
                loadingUpdate={loadingUpdate}
                loadingId={loadingId}
                token={token}
              />
            </ContentContainer>
          </ContainBody>
          {isAlertId ? (
            <Notice status="success" content="Updated identify !" />
          ) : null}
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
      data: data,
      token: token,
    }, // will be passed to the page component as props
  };
}

export default ProfilePage;
