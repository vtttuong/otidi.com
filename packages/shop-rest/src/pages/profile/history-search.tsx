import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "@redq/reuse-modal";
import { SEO } from "components/seo";
import Footer from "layouts/footer";
import AccordionHistory from "components/accordion/accordion-history";
import { FormattedMessage } from "react-intl";
import { getCookie } from "utils/session";
import { getSearchText } from "utils/api/searches";
import Router from "next/router";

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
    width: 870px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 989px) {
    padding: 30px;
  }
`;
const onDelete = () => {
  alert(1);
};

const history = ({ texts, token }) => {
  return (
    <Modal>
      <SEO
        title="History search - SecondhandShop"
        description="History search details"
      />
      <HelpPageWrapper>
        <HelpPageContainer>
          <AccordionHistory token={token} texts={texts} />
        </HelpPageContainer>

        <Footer />
      </HelpPageWrapper>
    </Modal>
  );
};
export default history;

export async function getServerSideProps(context) {
  const token = getCookie("access_token", context);

  if (token === null) {
    if (context.req) {
      context.res.writeHead(302, { Location: "/login" });
      context.res.end();
    } else {
      Router.push("/login");
    }
  }

  const texts = await getSearchText(token);

  return {
    props: {
      texts: texts,
      token: token,
    }, // will be passed to the page component as props
  };
}
