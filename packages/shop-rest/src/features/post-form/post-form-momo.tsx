import { Input } from "components/forms/input";
import { Label } from "components/forms/label";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import {
  ButtonPayment,
  Col,
  Container,
  FormTitle,
  FormTitleWrapper,
  Require,
  Row,
} from "./post-form.style";

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  title?: string;
  initData?: any;
  price?: any;
  from?: string;
  categoryLabels?: any;
};
const numberMoney = [
  { key: "1", value: 500000, label: "50.000 VND" },
  { key: "2", value: 100000, label: "100.000 VND" },
  { key: "3", value: 200000, label: "200.000 VND" },
];

const PostForm: React.FC<Props> = ({ price, deviceType, title, from }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errorStep, setErrorStep] = useState("");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {}, []);

  const handleChange = (e) => {
    const { value, name } = e.target;
  };

  return (
    <form>
      <Container>
        <FormTitleWrapper>
          <FormTitle>
            <FormattedMessage
              id={"title"}
              defaultMessage="Payment MOMO Now !!!"
            />
          </FormTitle>
        </FormTitleWrapper>
        <Row>
          <Col xs={4} sm={4} md={4} lg={4}>
            <Label>
              <FormattedMessage id="priceNUmber" defaultMessage="Total" />
              <Require>*</Require>
            </Label>
            <span
              style={{
                background: "#f7f7f7",
                padding: "12px 31px 12px 15px",
                borderRadius: 5,
                border: "1px solid #efebebc9",
                marginTop: 5,
                display: "inherit",
              }}
            >
              {price} 50.000
            </span>
            {/* <SelectItem options={numberMoney} />  */}
          </Col>

          <Col xs={8} sm={8} md={8} lg={8}>
            <Label>
              <FormattedMessage
                id="inputTitleSdt"
                defaultMessage="Phone umber"
              />
              <Require>*</Require>
            </Label>

            <Input
              type="number"
              label="Title"
              name="title"
              placeholder="Enter Phone"
              value={"title"}
              onChange={handleChange}
              backgroundColor="#F7F7F7"
              height="48px"
            />
          </Col>
        </Row>
        <ButtonPayment onClick={() => {}}>
          <FormattedMessage id="nextBtnPay" defaultMessage="Payment" />
        </ButtonPayment>
      </Container>
    </form>
  );
};

export default observer(PostForm);
