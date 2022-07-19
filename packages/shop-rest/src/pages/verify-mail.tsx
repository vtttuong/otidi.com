import { Modal } from "@redq/reuse-modal";
import { AuthContext } from "contexts/auth/auth.context";
import AuthenticationForm from "features/authentication-form";
import Footer from "layouts/footer";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styled from "styled-components";
import { getCookie } from "utils/session";

const Heading = styled.p`
  font-size: 21px;
  font-weight: 700;
  color: #0d1136;
  line-height: 1.2;
  padding: 20px;
  width: 100%;
  text-align: center;
`;

const HelpPageWrapper = styled.div`
  background-color: #f7f7f7;
  position: relative;
  padding: 100px 0 60px 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 989px) {
    padding-top: 70px;
  }
`;

export const HelpPageContainer = styled.div`
  background-color: transparent;
  padding: 0;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  @media (min-width: 990px) {
    width: 670px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 900px) {
    // width: 500px;
  }
`;
export function Welcome() {
  return <Heading>{"Please login to experience the best !!!"}</Heading>;
}

export default function VerifyMail(props) {
  const { authDispatch } = React.useContext<any>(AuthContext);
  console.log(AuthContext);

  useEffect(() => {
    authDispatch({
      type: "VERIFYEMAIL",
    });
  }, []);

  return (
    <Modal>
      <HelpPageWrapper>
        <HelpPageContainer>
          <AuthenticationForm />
        </HelpPageContainer>
        <Footer />
      </HelpPageWrapper>
    </Modal>
  );
}

// export async function getServerSideProps(context) {
//   const token = getCookie("access_token", context);

//   console.log("token", token);

//   if (token === null) {
//     context.res.writeHead(302, { Location: "/login" });
//     context.res.end();
//   }
//   return {
//     props: { token: token },
//   };
// }
