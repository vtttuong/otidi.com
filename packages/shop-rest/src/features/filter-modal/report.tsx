import { Option } from "components/option/option";
import { AuthContext } from "contexts/auth/auth.context";
import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { Col, Row } from "react-styled-flexboxgrid";
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
    title: "Sai danh muc",
    value: "wrong_category",
  },
  {
    id: 5,
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
  const [choose, setChoose] = React.useState("");
  const [report, setReport] = React.useState("");

  const handleChange = (event: any) => {
    let data = event.target ? event.target.value : "";
    setReport(data);
  };

  function changeChoose(list) {
    let foundIndex = [];
    let index = foundIndex.indexOf(list.id);
    setChoose(list.value);
    if (index < 0) {
      foundIndex.push(list.id);
    } else {
      foundIndex.splice(index, 1);
    }
  }

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
              <textarea
                placeholder={"Your report!"}
                rows={4}
                cols={50}
                value={report}
                style={{ border: "1px solid #009e7f", marginTop: 10 }}
                onChange={handleChange}
              />
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
          style={{ width: "100%" }}
          loading={loading}
          onClick={() => onReport(choose, report)}
        >
          <FormattedMessage id="applyFilter" />
        </Button>
      </Container>
    </Wrapper>
  );
};
export default ReportModal;
