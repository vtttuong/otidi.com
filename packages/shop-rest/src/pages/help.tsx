import React from "react";
import styled from "styled-components";
import { Modal } from "@redq/reuse-modal";
import { SEO } from "components/seo";
import Footer from "layouts/footer";
import Accordion from "components/accordion/accordion";
import { getFaqs } from "utils/api/faqs";

const Heading = styled.h3`
  font-size: 21px;
  font-weight: 700;
  color: #0d1136;
  line-height: 1.2;
  margin-bottom: 25px;
  width: 100%;
  text-align: center;
`;

const HelpPageWrapper = styled.div`
  background-color: #f7f7f7;
  position: relative;
  padding: 130px 0 60px 0;
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
type FaqsProps = {
  faqs: any;
};
const Faqs: React.FC<FaqsProps> = ({ faqs }) => {
  return (
    <Modal>
      <SEO title="F.A.Q - Otodi.vn" description="F.A.Q Details" />
      <HelpPageWrapper>
        <HelpPageContainer>
          <Heading>F.A.Q</Heading>
          <Accordion items={faqs} />
        </HelpPageContainer>

        <Footer />
      </HelpPageWrapper>
    </Modal>
  );
};

export async function getServerSideProps(context) {
  const faqs = await getFaqs();
  return {
    props: {
      faqs: faqs,
    },
  };
}

export default Faqs;
