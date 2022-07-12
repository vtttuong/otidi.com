import { NotVerified } from "assets/icons/notVerified";
import { Verified } from "assets/icons/verified";
import { Button } from "components/button/button";
import Notice from "components/notice/notice";
import UploadAvatar from "components/upload-avatar/upload-avatar";
import UploadCMNDBack from "components/upload-avatar/upload-cmnd-back";
import UploadCMNDFront from "components/upload-avatar/upload-cmnd-front";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { updatePass } from "utils/api/profile";
import { searchAddress } from "utils/location";
import {
  ButtonCancle,
  Col,
  Row,
  SettingsForm,
  SettingsFormContent,
  ListLocations,
  LocationItem,
} from "./settings.style";

type SettingsContentProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  data?: any;
  error?: any;
  token?: string;
  alert?: boolean;
  loadingUpdate?: boolean;
  loadingId?: boolean;

  handleSubmit?: (e: any, location: object) => void;
};

const SettingsContent: React.FC<SettingsContentProps> = ({
  data,
  handleSubmit,
  token,
  error,
  alert,
  loadingUpdate,
  loadingId,
}) => {
  const [first, setFirst] = useState(true);
  const router = useRouter();
  const [changePass, setChangePass] = React.useState(false);
  const [verify, setVerify] = React.useState(false);
  const [vefifyAccount, setVefifyAccount] = React.useState(false);

  const [pass, setPass] = React.useState("");
  const [oldPass, setOldPass] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");
  const [loadingPass, setLoadingPass] = React.useState(false);

  const [errorContent, setErrorContent] = React.useState("");
  const [errorPass, setErrorPass] = React.useState(false);
  const [successPass, setSuccessPass] = React.useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({
    address: data.address,
    latitude: data.latitude,
    longitude: data.longitude,
  });
  const [popupLocationActive, setPopupLocationActive] = useState(false);
  const [textAddress, setTextAddress] = useState(data.address || "");

  // useEffect(() => {
  //   setSelectedLocation({
  //     address: data.address,
  //   latitude: data.latitude,
  //   longitude: data.longitude,
  //   });
  // }, [data.address]);

  const handleSubmitPassword = async () => {
    if (oldPass.length < 6 || pass.length < 6 || confirmPass.length < 6) {
      setErrorPass(true);
      setErrorContent("Password must longer 6 characters!");
    } else {
      setLoadingPass(true);
      setErrorPass(false);
      const data = await updatePass(token, oldPass, pass, confirmPass);
      console.log("DATA RESPONSE", data);

      if (data.error) {
        setErrorContent(
          "Update password failed. Try again"
          // data.error.password ? data.error.password : data.error.new_password
        );
        setErrorPass(true);
      } else if (!data.success) {
        setErrorContent(
          data.data.password ? data.data.password : data.data.new_password
        );
        setErrorPass(true);
      } else {
        setSuccessPass(true);
        setChangePass(false);
      }
      setLoadingPass(false);
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
    if (data.identity_verified_at) {
      setVefifyAccount(true);
    } else {
      setVefifyAccount(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!first) {
        setSelectedLocation(null);
        setPopupLocationActive(true);
        const data = await searchAddress(textAddress);
        setLocations(data);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [textAddress]);

  const onSelectLocation = (location) => {
    setPopupLocationActive(false);
    setTextAddress(location.address);
    setSelectedLocation(location);
  };

  return (
    <SettingsForm>
      <SettingsFormContent>
        <Form
          onSubmit={(e) => handleSubmit(e, selectedLocation)}
          style={{ width: "100%" }}
        >
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
                            <FormattedMessage
                              id="updateButtonText"
                              defaultMessage="Update"
                            />
                          </Button>

                          <Button
                            variant="cancel"
                            type="button"
                            onClick={() => setVerify(false)}
                            style={{ marginLeft: "10px" }}
                          >
                            <FormattedMessage
                              id="cancelButtonText"
                              defaultMessage="Cancel"
                            />
                          </Button>
                        </div>
                      </>
                    ) : null}
                  </Col>
                  <Col md={12}>
                    <Form.Label
                      style={{ display: "flex", margin: "30px 0 10px 0" }}
                    >
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
                          justifyContent: "center",
                          marginTop: "20px",
                        }}
                      >
                        <Button
                          type="button"
                          onClick={() => handleSubmitPassword()}
                          loading={loadingPass}
                        >
                          <FormattedMessage
                            id="updateButtonText"
                            defaultMessage="Update"
                          />
                        </Button>
                        <Button
                          variant="cancel"
                          type="button"
                          onClick={() => setChangePass(false)}
                          style={{ marginLeft: "10px" }}
                        >
                          <FormattedMessage
                            id="cancelButtonText"
                            defaultMessage="Cancel"
                          />
                        </Button>
                      </div>
                    </Form>
                  </Col>
                ) : null}
              </Row>
            </div>
            <div className="profile-right">
              <Row>
                <Col md={12} sm={6} xs={12}>
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
                    readOnly={true}
                    placeholder="email"
                    id="osdjfndjsksdm"
                  />
                </Col>
                <Col md={12} xs={12}>
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

                <Col md={12} xs={12}>
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
                    defaultValue={data.phone_number || ""}
                    placeholder="012122121"
                    id="jhgdsdsbhv"
                  />
                </Col>

                {/* <Form.Group as={Col} md={6} xs={12}>
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
                </Form.Group> */}
                {/* 
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
                </Form.Group> */}
                <Col md={12} xs={12}>
                  <Form.Label style={{ display: "flex" }}>
                    <FormattedMessage id="address" defaultMessage="Address" />
                  </Form.Label>

                  <Form.Control
                    placeholder="Address"
                    name="address"
                    value={textAddress}
                    id="uaosfjcvcns"
                    onChange={(e) => {
                      setFirst(false);
                      setTextAddress(e.target.value);
                    }}
                  />
                  {popupLocationActive && (
                    <ListLocations>
                      {locations.map((lo) => (
                        <LocationItem
                          key={lo.id}
                          onClick={() => onSelectLocation(lo)}
                        >
                          {lo.address}
                        </LocationItem>
                      ))}
                    </ListLocations>
                  )}
                </Col>
              </Row>
              {/* <Row>
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
              </Row> */}
            </div>
          </div>

          <Row className="btn-submit-profile">
            <Col xs={3} sm={3} md={3} lg={3}></Col>
            <Col xs={9} sm={9} md={9} lg={9}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: "10px",
                }}
              >
                <Button variant="primary" type="submit" loading={loadingUpdate}>
                  <FormattedMessage
                    id="updateButtonText"
                    defaultMessage="Update Information"
                  />
                </Button>

                <Link href="/">
                  <Button
                    disabled={loadingUpdate}
                    variant="cancel"
                    type="button"
                  >
                    <FormattedMessage
                      id="cancelButtonText"
                      defaultMessage="Update Information"
                    />
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Form>
        {errorPass ? <Notice status="error" content={errorContent} /> : null}
        {successPass ? (
          <Notice
            status="success"
            content={
              <FormattedMessage
                id="updateSuccess"
                defaultMessage="Updated Identity"
              />
            }
          />
        ) : null}
        {alert ? (
          <Notice
            status="success"
            content={
              <FormattedMessage
                id="updateSuccess"
                defaultMessage="Updated Identity"
              />
            }
          />
        ) : null}

        {error !== null ? (
          <>
            {error.address ? (
              <Notice status="error" content={error.address} />
            ) : null}
            {error.phone_number ? (
              <Notice status="error" content={error.phone_number} />
            ) : null}
            {error.name ? <Notice status="error" content={error.name} /> : null}
          </>
        ) : null}
      </SettingsFormContent>
    </SettingsForm>
  );
};

export default SettingsContent;
