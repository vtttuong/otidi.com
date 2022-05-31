import React from "react";
import styled from "styled-components";
import { Modal } from "@redq/reuse-modal";
import Footer from "layouts/footer";
import { getCookie } from "utils/session";
import { FormattedMessage } from "react-intl";
import Router from "next/router";

const Heading = styled.p`
  font-size: 15px;
  font-weight: 500;
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
  background-color: aliceblue;
  margin-top: 50px;
  padding: 0;
  border: 1px solid #009e7f;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  @media (min-width: 990px) {
    min-width: 50%;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 900px) {
    // width: 500px;
  }
`;
export function Welcome() {
  return (
    <Heading>
      <FormattedMessage id="resConfirmEmailSuccessFul" />
    </Heading>
  );
}

const baseUrl = process.env.NEXT_PUBLIC_LARAVEL_API_URL;

export default function Reset(data) {
  return (
    <Modal>
      <HelpPageWrapper>
        <HelpPageContainer>
          {data && Welcome()}
          {/* {Welcome()} */}
        </HelpPageContainer>
        <Footer />
      </HelpPageWrapper>
    </Modal>
  );
}

export async function getServerSideProps(context) {
  const token = getCookie("access_token", context);

  if (token === null) {
    if (context.req) {
      // If `ctx.req` is available it means we are on the server.
      context.res.writeHead(302, { Location: "/login" });
      context.res.end();
    } else {
      // This should only happen on client.
      Router.push("/login");
    }
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const url = `${baseUrl}/api/client/v1/me/verify-mail/${context.query.token}/confirm`;
  const res = await fetch(url, options);

  return {
    props: {
      data: await res.json(),
    }, // will be passed to the page component as props
  };
}
