import { Option } from "components/option/option-push";
import { AuthContext } from "contexts/auth/auth.context";
import dynamic from "next/dynamic";
import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { Col, Row } from "react-styled-flexboxgrid";
import { Button, Container, Heading, Wrapper } from "./form.style";

type ManagePostProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  data?: any[];
  error?: any;
  service?: any;
  id?: any;
  onPush?: (e: any, f: any, x: any) => void;
  loading?: boolean;
};
const Push: React.FC<ManagePostProps> = ({
  deviceType,
  onPush,
  service,
  id,
  loading,
}) => {
  const [choose, setChoose] = React.useState("");
  const [datetime, setDatetime] = React.useState("");
  const [error, setError] = React.useState(false);

  function changeChoose(list) {
    let foundIndex = [];
    let index = foundIndex.indexOf(list.id);
    setChoose(list.id);
    if (index < 0) {
      foundIndex.push(list.id);
    } else {
      foundIndex.splice(index, 1);
    }
  }

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
          <div className="option-push">
            {service.map(function (list) {
              return (
                <Option
                  key={list.id}
                  title={list.name}
                  onClick={() => changeChoose(list)}
                  checked={choose == list.id}
                  price={list.price + " coin"}
                  source={list.source}
                  active={choose == list.id}
                />
              );
            })}
          </div>
          <Row className="report">
            <Col xs={12} sm={12} md={12} lg={12}>
              <p style={{ margin: "10px 0" }}>
                Please choose the type of news to accelerate
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 12px",
                  alignItems: "center",
                  gap: "10px",
                  height: "60px",
                }}
              >
                <span
                  style={{
                    textAlign: "center",
                    padding: "7px",
                    background: "#009e7f",
                    color: "#fff",
                    marginTop: "5px",
                    borderRadius: "5px",
                  }}
                >
                  {" "}
                  <FormattedMessage
                    id="chooseTime"
                    defaultMessage="Choose  Time"
                  />
                </span>
                <input
                  style={{
                    border: "1px solid #009e7f",
                    padding: "3px 5px",
                    borderRadius: "5px",
                    height: "100%",
                  }}
                  name="time"
                  type="datetime-local"
                  onChange={handleChange}
                  value={(datetime || "").toString().substring(0, 16)}
                  // min="2022-7-08T22:22:55"
                />
              </div>
              {error ? (
                <p style={{ textAlign: "left", color: "red" }}>
                  Check field require!
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
            if (
              !choose ||
              choose.length === 0 ||
              !datetime ||
              datetime.length == 0
            ) {
              setError(true);
              return;
            }
            onPush(id, choose, datetime);
          }}
        >
          <FormattedMessage id="applyFilter" />
        </Button>
      </Container>
    </Wrapper>
  );
};
export default Push;
