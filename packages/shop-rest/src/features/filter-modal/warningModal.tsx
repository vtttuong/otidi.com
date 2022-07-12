import { Warning } from "assets/icons/Warning";
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
const bargainModal: React.FC<ManagePostProps> = ({ titleId }) => {
  return (
    <Wrapper>
      <Container className="warning-modal">
        <Warning width="30px" height="30px" />
        <Heading>
          <span style={{ marginRight: 10 }}>
            <FormattedMessage id={titleId} defaultMessage={titleId} />
          </span>
        </Heading>
      </Container>
    </Wrapper>
  );
};
export default bargainModal;
