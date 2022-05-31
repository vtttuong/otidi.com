import { NotVerified } from "assets/icons/notVerified";
import { Verified } from "assets/icons/verified";
import { Button } from "components/button/button";
import Notice from "components/notice/notice";
import UploadAvatar from "components/upload-avatar/upload-avatar";
import UploadCMNDBack from "components/upload-avatar/upload-cmnd-back";
import UploadCMNDFront from "components/upload-avatar/upload-cmnd-front";
import { useRouter } from "next/router";
import React from "react";
import { Form } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { updatePass } from "utils/api/profile";
import {
  ButtonCancle,
  Col,
  Row,
  SettingsForm,
  SettingsFormContent,
} from "./settings.style";

type SettingsContentProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  data?: any;
  token?: string;
  alert?: boolean;
  loadingUpdate?: boolean;
  loadingId?: boolean;

  handleSubmit?: (e: any) => void;
};

const SettingsContent: React.FC<SettingsContentProps> = ({
  data,
  handleSubmit,
  token,
  alert,
  loadingUpdate,
  loadingId,
}) => {
  const router = useRouter();
  const [changePass, setChangePass] = React.useState(false);
  const [verify, setVerify] = React.useState(false);
  const [vefifyAccount, setVefifyAccount] = React.useState(false);

  const [pass, setPass] = React.useState("");
  const [oldPass, setOldPass] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");
  const [errorContent, setErrorContent] = React.useState("");
  const [errorPass, setErrorPass] = React.useState(false);
  const [successPass, setSuccessPass] = React.useState(false);

  const handleSubmitPassword = async () => {
    if (oldPass.length < 6 || pass.length < 6 || confirmPass.length < 6) {
      setErrorPass(true);
      setErrorContent("Password must longer 6 character!");
    } else {
      setErrorPass(false);
      const data = await updatePass(token, oldPass, pass);
      if (data.error) {
        setErrorContent(
          data.error.password ? data.error.password : data.error.new_password
        );
        setErrorPass(true);
      } else {
        setSuccessPass(true);
        setChangePass(false);
      }
    }
    setTimeout(() => {
      setErrorPass(false);
      setSuccessPass(false);
    }, 2000);
  };
  React.useEffect(() => {
    verifyAc();
  }, []);
  const verifyAc = () => {
    if (data?.identify?.identified_at) {
      setVefifyAccount(true);
    } else {
      setVefifyAccount(false);
    }
  };

  return (
    <SettingsForm>
      <SettingsFormContent>
        <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <div className="box">
            <div className="profile-left">
              <Row>
                <Col xs={12} sm={5} md={5} lg={5} style={{ margin: "0 auto" }}>
                  <Form.File id="custom-file">
                    <UploadAvatar />
                  </Form.File>
                </Col>
              </Row>

              <Row style={{ alignItems: "flex-end", marginBottom: "20px" }}>
                <Form.Group as={Col} md={12} xs={12}>
                  <Col md={12}>
                    <Form.Label style={{ display: "flex", marginBottom: 15 }}>
                      {!vefifyAccount ? (
                        <div style={{ color: "#f3c700" }}>
                          <NotVerified
                            style={{
                              top: 5,
                              position: "relative",
                              marginRight: 10,
                            }}
                          />
                          <FormattedMessage
                            id="verifyAccountId"
                            defaultMessage="Xac thuc tai khoan"
                          />
                          <span
                            onClick={() => setVerify(!verify)}
                            style={{
                              marginLeft: 10,
                              color: "red",
                              cursor: "pointer",
                            }}
                          >
                            {"  "}[
                            <FormattedMessage id="require" />]
                          </span>
                        </div>
                      ) : (
                        <>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Verified
                              style={{ top: 0, position: "relative", left: 0 }}
                            />

                            <span
                              style={{
                                marginLeft: 10,
                                color: "#2c96e9",
                                cursor: "pointer",
                              }}
                            >
                              {"  "}
                              <FormattedMessage id="verifiedAccountId" />
                            </span>
                            <span
                              onClick={() => setVerify(!verify)}
                              style={{
                                marginLeft: 10,
                                color: "red",
                                cursor: "pointer",
                              }}
                            >
                              {"  "}[Thay đổi]
                            </span>
                          </div>
                        </>
                      )}
                    </Form.Label>
                    {verify ? (
                      <>
                        <Form.File id="custom-file-front">
                          <UploadCMNDFront />
                        </Form.File>
                        <Form.File id="custom-file-back">
                          <UploadCMNDBack />
                        </Form.File>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: 15,
                          }}
                        >
                          <Button
                            variant="primary"
                            type="submit"
                            loading={loadingId}
                          >
                            Upload
                          </Button>
                        </div>
                      </>
                    ) : null}
                  </Col>
                  <Col md={12}>
                    <Form.Label style={{ display: "flex" }}>
                      <FormattedMessage
                        id="passwordPlaceholder"
                        defaultMessage="Password"
                      />
                      <span
                        onClick={() => setChangePass(!changePass)}
                        style={{
                          marginLeft: 10,
                          color: "#009e7f",
                          cursor: "pointer",
                        }}
                      >
                        {"  "}[Thay đổi]
                      </span>
                    </Form.Label>
                    {!changePass ? (
                      <Form.Control
                        value={"************************"}
                        placeholder="pass"
                        onChange={() => {}}
                        id="hdgfhg"
                      />
                    ) : null}
                  </Col>
                </Form.Group>
                {changePass ? (
                  <Col md={12} xs={12}>
                    <Form style={{ width: "100%" }} className="change-pass">
                      <Form.Group as={Row}>
                        <Col md={12} xs={12}>
                          <Form.Control
                            type="password"
                            placeholder="Current password"
                            onChange={(e: any) => setOldPass(e.target.value)}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row}>
                        <Col md={12} xs={12}>
                          <Form.Control
                            type="password"
                            placeholder="New password"
                            onChange={(e: any) => setPass(e.target.value)}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row}>
                        <Col md={12} xs={12}>
                          <Form.Control
                            type="password"
                            placeholder="Confirm password"
                            onChange={(e: any) =>
                              setConfirmPass(e.target.value)
                            }
                          />
                        </Col>
                      </Form.Group>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <ButtonCancle
                          onClick={() => handleSubmitPassword()}
                          style={{
                            marginRight: "20px",
                            background: "#009e7f",
                            padding: "13px",
                          }}
                        >
                          <FormattedMessage
                            id="updateButtonText"
                            defaultMessage="Update "
                          />
                        </ButtonCancle>
                        <ButtonCancle onClick={() => setChangePass(false)}>
                          <FormattedMessage
                            id="cancle"
                            defaultMessage="Cancle "
                          />
                        </ButtonCancle>
                      </div>
                    </Form>
                  </Col>
                ) : null}
              </Row>
            </div>
            <div className="profile-right">
              <Row>
                <Form.Group as={Col} md={6} xs={12}>
                  <Col md={12}>
                    <Form.Label style={{ display: "flex" }}>
                      <FormattedMessage
                        id="profileEmailField"
                        defaultMessage="Email"
                      />
                      <span style={{ color: "red", marginLeft: 5 }}>
                        ({" "}
                        <FormattedMessage
                          id="notChange"
                          defaultMessage="Can't change"
                        />{" "}
                        )
                      </span>
                      {data.email_verified_at ? (
                        <b style={{ color: "#2c96e9" }}>
                          --- <FormattedMessage id="verified" />
                        </b>
                      ) : (
                        <b
                          onClick={() => router.push("/verify-mail")}
                          style={{ color: "#f3c700", cursor: "pointer" }}
                        >
                          --- <FormattedMessage id="notVerified" />{" "}
                        </b>
                      )}
                    </Form.Label>
                    <Form.Control
                      value={data.email}
                      onChange={() => {}}
                      placeholder="email"
                      id="osdjfndjsksdm"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Col} md={6} xs={12}>
                  <Col md={12}>
                    <Form.Label style={{ display: "flex" }}>
                      <FormattedMessage
                        id="usernameField"
                        defaultMessage="Username"
                      />
                    </Form.Label>
                    <Form.Control
                      defaultValue={data.name}
                      placeholder="name"
                      name="name"
                      id="ysifhbdhgxgd"
                    />
                  </Col>
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} md={6} xs={12}>
                  <Col md={12}>
                    <Form.Label style={{ display: "flex" }}>
                      <FormattedMessage
                        id="contactNumberTitle"
                        defaultMessage="Phone number"
                      />
                      {data.phone_verified_at ? (
                        <span>
                          {"---"}
                          <b style={{ color: "#2c96e9" }}>
                            {" "}
                            <FormattedMessage id="verified" />
                          </b>
                        </span>
                      ) : (
                        <span onClick={() => router.push("/update-phone")}>
                          {"---"}
                          <b style={{ color: "#f3c700", cursor: "pointer" }}>
                            <FormattedMessage id="notVerified" />
                          </b>
                        </span>
                      )}
                    </Form.Label>
                    <Form.Control
                      name="phone"
                      defaultValue={data.phone_number}
                      placeholder="012122121"
                      id="jhgdsdsbhv"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Col} md={6} xs={12}>
                  <Col md={12}>
                    <Form.Label style={{ display: "flex" }}>
                      <FormattedMessage id="sexField" defaultMessage="Sex" />
                    </Form.Label>

                    <Form.Group as={Row} style={{ marginBottom: 10 }}>
                      <Form.Check
                        id="male"
                        label={
                          <FormattedMessage
                            id="maleText"
                            defaultMessage="Male"
                          />
                        }
                        type="radio"
                        defaultChecked={data.sex == "male" ? true : false}
                        // defaultChecked
                        name="sex"
                        value="male"
                        style={{ marginRight: "10%" }}
                      />
                      <Form.Check
                        id="female"
                        label={
                          <FormattedMessage
                            id="femaleText"
                            defaultMessage="Female"
                          />
                        }
                        value="female"
                        defaultChecked={data.sex == "female" ? true : false}
                        type="radio"
                        name="sex"
                      />
                    </Form.Group>
                  </Col>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md={6} xs={12}>
                  <Col md={12}>
                    <Form.Label style={{ display: "flex" }}>
                      <FormattedMessage
                        id="birthdateField"
                        defaultMessage="Birthdate"
                      />
                    </Form.Label>

                    <Form.Control
                      type="date"
                      name="birthday"
                      defaultValue={data.birthday}
                      placeholder="Date of Birth"
                      id="isdonndndjsf"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Col} md={6} xs={12}>
                  <Col md={12}>
                    <Form.Label style={{ display: "flex" }}>
                      <FormattedMessage id="address" defaultMessage="Address" />
                    </Form.Label>

                    <Form.Control
                      defaultValue={data.address}
                      placeholder="Address"
                      name="address"
                      id="uaosfjcvcns"
                    />
                  </Col>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md={6} xs={12}>
                  <Col md={12}>
                    <Form.Label style={{ display: "flex" }}>
                      Facebook
                    </Form.Label>

                    <Form.Control
                      id="qdsdsd"
                      defaultValue={data.facebook}
                      placeholder="Url facebook"
                      name="facebook"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Col} md={6} xs={12}>
                  <Col md={12}>
                    <Form.Label style={{ display: "flex" }}>Skype</Form.Label>

                    <Form.Control
                      id="xvasdsa"
                      defaultValue={data.skype}
                      placeholder="Url skype"
                      name="skype"
                    />
                  </Col>
                </Form.Group>
              </Row>
            </div>
          </div>

          <Row className="btn-submit-profile">
            <Col xs={3} sm={3} md={3} lg={3}></Col>
            <Col xs={9} sm={9} md={9} lg={9}>
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <Button variant="primary" type="submit" loading={loadingUpdate}>
                  <FormattedMessage
                    id="updateButtonText"
                    defaultMessage="Update Information"
                  />
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
        {errorPass ? <Notice status="error" content={errorContent} /> : null}
        {successPass ? (
          <Notice status="success" content="Updated password !" />
        ) : null}
        {alert ? (
          <Notice status="success" content={"Update success !"} />
        ) : null}
      </SettingsFormContent>
    </SettingsForm>
  );
};

export default SettingsContent;
