import React from "react";
import { FormattedMessage } from "react-intl";
import { Container, Heading, Wrapper } from "./form.style";

type ManagePostProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  titleId?: string;
  data?: any;
};
const bargainModal: React.FC<ManagePostProps> = ({
  titleId,
}) => {

  return (
    <Wrapper>
      <Container className="warning-modal">
        <img src="https://www.flaticon.com/svg/static/icons/svg/595/595067.svg" />
        <Heading>
          <span style={{ marginRight: 10 }}><FormattedMessage id="warningApprove" defaultMessage={titleId} /></span>
        </Heading>
      </Container>
    </Wrapper>
  );
};
export default bargainModal;
