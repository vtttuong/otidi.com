import { Option } from "components/option/option-push";
import { AuthContext } from "contexts/auth/auth.context";
import dynamic from "next/dynamic";
import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { Col, Row } from "react-styled-flexboxgrid";
import { Button, Container, Heading, Wrapper } from "./form.style";

type ManagePostProps = {
  data?: any[];
  error?: any;
  service?: any;
  id?: any;
  onUpdate?: (e: number, x: string) => void;
  loading?: boolean;
};
const PushUpdate: React.FC<ManagePostProps> = ({ onUpdate, id, loading }) => {
  const [datetime, setDatetime] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleChange = (ev) => {
    const dt = ev.target["value"];
    setDatetime(dt);
  };

  return (
    <Wrapper>
      <Container>
        <Heading>
          <FormattedMessage id="pushPost" defaultMessage={"Push  post"} />
        </Heading>
        <form style={{ marginBottom: 30 }}>
          <Row className="report">
            <Col xs={12} sm={12} md={12} lg={12}>
              <p style={{ margin: "20px 0" }}>Please choose when post pushed</p>
              <Row
                style={{
                  alignItems: "center",
                }}
              >
                <Col xs={12} sm={5}>
                  <span
                    style={{
                      display: "inline-block",
                      textAlign: "center",
                      padding: "7px",
                      background: "#009e7f",
                      color: "#fff",
                      margin: "5px 0",
                      borderRadius: "5px",
                    }}
                  >
                    {" "}
                    <FormattedMessage
                      id="chooseTime"
                      defaultMessage="Choose  Time"
                    />
                  </span>
                </Col>
                <Col xs={12} sm={7}>
                  <input
                    style={{
                      border: "1px solid #009e7f",
                      // padding: "3px 5px",
                      borderRadius: "5px",
                      height: "40px",
                    }}
                    name="time"
                    type="datetime-local"
                    onChange={handleChange}
                    value={(datetime || "").toString().substring(0, 16)}
                    // min="2022-7-08T22:22:55"
                  />
                </Col>
              </Row>
              {error ? (
                <p style={{ textAlign: "left", color: "red" }}>
                  Choose time before submit!
                </p>
              ) : null}
            </Col>
          </Row>
        </form>

        <Button
          variant="primary"
          size="big"
          type="submit"
          style={{ width: "100%" }}
          loading={loading}
          onClick={() => {
            //validate
            if (!datetime || datetime.length == 0) {
              setError(true);
              return;
            }
            onUpdate(id, datetime);
          }}
        >
          <FormattedMessage id="applyFilter" />
        </Button>
      </Container>
    </Wrapper>
  );
};
export default PushUpdate;
