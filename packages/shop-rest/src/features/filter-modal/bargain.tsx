import { Button } from "components/button/button";
import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
import { Col, Row } from "react-styled-flexboxgrid";
import { Container, Heading, Wrapper } from "./form.style";
import { createChat, sendBargin, sendMessage } from "utils/api/chat";
import { useRouter } from "next/router";
import { Money } from "assets/icons/Money";
import { numberWithCommas } from "utils/formatNumber";

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
  deviceType,
  titleId,
  data,
}) => {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [show, setShow] = React.useState("1,000");
  const router = useRouter();

  const handleChange = (event: any) => {
    setShow(event.value);
    if (event.floatValue > 1000) {
      setError(false);
    } else setError(true);
  };

  const onBarg = async () => {
    const content = `Toi Tra Gia: ${numberWithCommas(show)}  VND`;
    const { result } = await sendBargin(data.token, content, data.postId);
    if (result) {
      // const chat: any = await response.json();
      // const message = await sendMessage(data.token, content, chat.id);
      // if (message?.id) {
      //   router.push({
      //     pathname: "/message",
      //     query: { uuid: chat.uuid },
      //   });
      // }
    }
    setLoading(false);
  };
  return (
    <Wrapper>
      <Container>
        <Heading>
          <span style={{ marginRight: 10 }}>
            <FormattedMessage id="bargainId" defaultMessage={titleId} />
          </span>
          <Money />
        </Heading>
        <form style={{ marginBottom: 30 }}>
          <Row className="bargain">
            <Col xs={12} sm={12} md={12} lg={12}>
              <NumberFormat
                className="inputPrice"
                label="Price"
                name="price"
                thousandSeparator={true}
                onValueChange={(e) => handleChange(e)}
                background="#F7F7F7"
                height="48px"
                placeholder="Enter price"
                value={show}
                autoComplete={"off"}
              />
              {error ? (
                <p style={{ textAlign: "left", color: "red" }}>
                  {"Bargain must > 1.000  VND!"}
                </p>
              ) : null}
            </Col>
          </Row>
        </form>

        <Button
          variant="primary"
          size="big"
          disabled={error}
          style={{ width: "100%" }}
          loading={loading}
          onClick={() => {
            setLoading(true);
            onBarg();
          }}
        >
          <FormattedMessage id="applyFilter" />
        </Button>
      </Container>
    </Wrapper>
  );
};
export default bargainModal;
