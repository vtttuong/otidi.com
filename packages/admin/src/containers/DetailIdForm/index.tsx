import { CoinIcon } from "assets/icons/CoinIcon";
import { Star } from "assets/icons/Star";
import Button, { KIND } from "components/Button/Button";
import DrawerBox from "components/DrawerBox/DrawerBox";
import { Col, Row } from "components/FlexBox/FlexBox";
import { FormFields, FormLabel } from "components/FormFields/FormFields";
import Image from "components/Image/Image";
import Input from "components/Input/Input";
import { useDrawerDispatch, useDrawerState } from "context/DrawerContext";
import { Consumer } from "context/updateContext";
import moment from "moment";
import React, { useCallback, useState } from "react";
import { useAlert } from "react-alert";
import { Scrollbars } from "react-custom-scrollbars";
import { useForm } from "react-hook-form";
import { verifyId } from "service/use-users";
import {
  BoxAvatar,
  ButtonGroup,
  DrawerTitle,
  DrawerTitleWrapper,
  FieldDetails,
  Form,
} from "../DrawerItems/DrawerItems.style";

type Props = any;
// const urlServer = process.env.REACT_APP_LARAVEL_API_URL + "/storage/";
const UserIdForm: React.FC<Props> = (props) => {
  const data = useDrawerState("data");

  const [defaultName, setName] = useState(data.name);
  const dispatch = useDrawerDispatch();
  const alert = useAlert();
  const closeDrawer = useCallback(() => dispatch({ type: "CLOSE_DRAWER" }), [
    dispatch,
  ]);

  const { register } = useForm();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  React.useEffect(() => {
    register({ name: "category" });
  }, [register]);

  const onVerify = async (on) => {
    setLoading(true);
    const { result } = await verifyId(data.id);
    if (result) {
      on();
      closeDrawer();
      alert.success("Update success!");
    }
    setLoading(false);
  };

  return (
    <Consumer>
      {({ getUser }) => (
        <>
          <DrawerTitleWrapper>
            <DrawerTitle>Detail user</DrawerTitle>
          </DrawerTitleWrapper>

          <Form style={{ height: "100%" }}>
            <Scrollbars
              autoHide
              renderView={(props) => (
                <div
                  {...props}
                  style={{ ...props.style, overflowX: "hidden" }}
                />
              )}
              renderTrackHorizontal={(props) => (
                <div
                  {...props}
                  style={{ display: "none" }}
                  className="track-horizontal"
                />
              )}
            >
              <Row>
                <Col lg={4}>
                  <FieldDetails>Detail for user</FieldDetails>
                </Col>

                <Col lg={8}>
                  <DrawerBox>
                    <FormFields>
                      <FormLabel>User</FormLabel>
                      <BoxAvatar>
                        <Image
                          url={data.avatar}
                          style={{ objectFit: "cover" }}
                        />
                        <div className="rating">
                          <h4>Rating</h4>
                          <span>
                            {parseFloat(data.rating).toFixed(1)} <Star />
                          </span>
                        </div>
                        <div className="rating">
                          <h4>Point</h4>
                          <span>
                            {5453} <CoinIcon />
                          </span>
                        </div>
                      </BoxAvatar>
                    </FormFields>
                    <FormFields>
                      <FormLabel>User Name</FormLabel>
                      <Input
                        inputRef={register}
                        name="name"
                        value={defaultName}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </FormFields>
                    <FormFields>
                      <FormLabel>Birthday</FormLabel>
                      <Input
                        inputRef={register}
                        name="birthday"
                        value={data.birthday}
                      />
                    </FormFields>
                    <FormFields>
                      <FormLabel>Email</FormLabel>
                      <Input
                        inputRef={register}
                        name="email"
                        value={data.email}
                      />
                    </FormFields>
                    <FormFields>
                      <FormLabel>Phone number</FormLabel>
                      <Input
                        inputRef={register}
                        name="phone"
                        value={data.phone_number}
                      />
                    </FormFields>

                    <FormFields>
                      <FormLabel>Verified email</FormLabel>
                      <Input
                        inputRef={register}
                        name="vE"
                        value={moment(data.email_verified_at).format(
                          "YYYY-MM-DD hh:mm:ss"
                        )}
                      />
                    </FormFields>
                    <FormFields>
                      <FormLabel>Verifed phone</FormLabel>
                      <Input
                        inputRef={register}
                        name="vE"
                        value={moment(data.phone_verified_at).format(
                          "YYYY-MM-DD hh:mm:ss"
                        )}
                      />
                    </FormFields>
                    <FormFields>
                      <FormLabel>Front Id</FormLabel>
                      <BoxAvatar className="id">
                        <Image
                          className="id"
                          url={data.identity_card?.img_front_url}
                        />
                      </BoxAvatar>
                    </FormFields>
                    <FormFields>
                      <FormLabel>Back Id</FormLabel>
                      <BoxAvatar className="id">
                        <Image
                          className="id"
                          url={data.identity_card?.img_back_url}
                        />
                      </BoxAvatar>
                    </FormFields>
                  </DrawerBox>
                </Col>
              </Row>
            </Scrollbars>

            <ButtonGroup>
              <Button
                kind={KIND.minimal}
                onClick={closeDrawer}
                overrides={{
                  BaseButton: {
                    style: ({ $theme }) => ({
                      width: "50%",
                      borderTopLeftRadius: "3px",
                      borderTopRightRadius: "3px",
                      borderBottomRightRadius: "3px",
                      borderBottomLeftRadius: "3px",
                      marginRight: "15px",
                      color: $theme.colors.red400,
                    }),
                  },
                }}
              >
                Cancel
              </Button>

              <Button
                onClick={() => onVerify(getUser)}
                isLoading={loading}
                type="button"
                overrides={{
                  BaseButton: {
                    style: ({ $theme }) => ({
                      width: "50%",
                      borderTopLeftRadius: "3px",
                      borderTopRightRadius: "3px",
                      borderBottomRightRadius: "3px",
                      borderBottomLeftRadius: "3px",
                    }),
                  },
                }}
              >
                Verify
              </Button>
            </ButtonGroup>
          </Form>
        </>
      )}
    </Consumer>
  );
};

export default UserIdForm;
