import { Input } from "components/forms/input";
import { Option } from "components/option/option";
import { AuthContext } from "contexts/auth/auth.context";
import { Require } from "features/post-form/post-form.style";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Col, Row } from "react-styled-flexboxgrid";
import { LOGIN } from "site-settings/site-navigation";
import { getCookie } from "utils/session";
import { Button, Container, Heading, Wrapper } from "./form.style";

const lists = [
  {
    id: 1,
    title: "Lừa đảo",
    value: "cheat",
  },
  {
    id: 2,
    title: "Tin trùng lặp",
    value: "duplicate",
  },
  {
    id: 3,
    title: "Spam",
    value: "spam",
  },
  {
    id: 4,
    title: "Thông tin sai thực tế",
    value: "unrealistic",
  },
];

type ManagePostProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  data?: any[];
  error?: any;
  onReport?: (e: any, f: any) => void;
};
const ReportModal: React.FC<ManagePostProps> = ({
  deviceType,
  onReport,
  error,
}) => {
  const { authDispatch } = useContext<any>(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const [choose, setChoose] = React.useState(lists[0].value);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [errorS, setError] = useState(null);
  const router = useRouter();

  const handleChange = (event: any) => {
    setError(null);
    let data = event.target ? event.target.value : "";
    setPhoneNumber(data);
  };

  function changeChoose(list) {
    setError(null);
    let foundIndex = [];
    let index = foundIndex.indexOf(list.id);
    setChoose(list.value);
    if (index < 0) {
      foundIndex.push(list.id);
    } else {
      foundIndex.splice(index, 1);
    }
  }

  const onClickReport = async () => {
    setLoading(true);
    if (
      !choose ||
      !phoneNumber ||
      choose.trim().length === 0 ||
      phoneNumber.trim().length === 0
    ) {
      setError("ErrorStep");
      setLoading(false);
      return;
    }

    if (!/[0-9]{10}/g.test(phoneNumber)) {
      setError("invalidPhone");
      setLoading(false);
      return;
    }
    await onReport(choose, phoneNumber);
    setLoading(false);
  };

  return (
    <Wrapper>
      <Container>
        <Heading>
          <FormattedMessage id="reportContent" />
        </Heading>
        <form style={{ marginBottom: 30 }}>
          {lists.map(function (list) {
            return (
              <Option
                key={list.id}
                title={list.title}
                onClick={() => changeChoose(list)}
                checked={choose == list.value}
              />
            );
          })}
          <Row className="report">
            <Col xs={12} sm={12} md={12} lg={12}>
              <label htmlFor="phone_number_report">
                Enter phone number to report
                <Require>*</Require>
              </label>
              <Input
                id="phone_number_report"
                rows={4}
                cols={50}
                value={phoneNumber}
                style={{ border: "1px solid #009e7f", marginTop: 10 }}
                onChange={handleChange}
              />
              {errorS ? (
                <p style={{ textAlign: "left", color: "red" }}>
                  <FormattedMessage id={errorS} />
                </p>
              ) : null}
            </Col>
          </Row>
        </form>

        <Button
          variant="primary"
          size="big"
          style={{ width: "100%" }}
          loading={loading}
          onClick={onClickReport}
        >
          <FormattedMessage id="report" />
        </Button>
      </Container>
    </Wrapper>
  );
};
export default ReportModal;
