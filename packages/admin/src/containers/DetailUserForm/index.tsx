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
import React, { useCallback, useState } from "react";
import { useAlert } from "react-alert";
import { Scrollbars } from "react-custom-scrollbars";
import { useForm } from "react-hook-form";
import { unDeleteUser, deleteUser } from "service/use-users";
import {
  ButtonGroup,
  DrawerTitle,
  DrawerTitleWrapper,
  FieldDetails,
  Form,
  BoxAvatar,
} from "../DrawerItems/DrawerItems.style";

type Props = any;
const urlServer = process.env.REACT_APP_LARAVEL_API_URL + "/storage/";
const UserDetailForm: React.FC<Props> = (props) => {
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

  const onBlock = async (on) => {
    setLoading(true);
    if (data.deleted_at != null) {
      await unDeleteUser(data.id);
    } else {
      await deleteUser(data.id);
    }
    on();
    setLoading(false);
    closeDrawer();
    alert.success("Update success!");
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
                        <Image url={urlServer + data.avatar_url} />
                        <div className="rating">
                          <h4>Rating</h4>
                          <span>
                            {parseFloat(data.rating).toFixed(1)} <Star />
                          </span>
                        </div>
                        <div className="rating">
                          <h4>Point</h4>
                          <span>
                            {data.cumulative_points} <CoinIcon />
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
                      <FormLabel>Facebook</FormLabel>
                      <Input
                        inputRef={register}
                        name="facebook"
                        value={data.facebook}
                      />
                    </FormFields>
                    <FormFields>
                      <FormLabel>Skype</FormLabel>
                      <Input
                        inputRef={register}
                        name="skype"
                        value={data.skype}
                      />
                    </FormFields>
                    <FormFields>
                      <FormLabel>Level</FormLabel>
                      <Input
                        inputRef={register}
                        name="level"
                        value={data.level?.name}
                      />
                    </FormFields>
                    <FormFields>
                      <FormLabel>Verifed email</FormLabel>
                      <Input
                        inputRef={register}
                        name="vE"
                        value={data.email_verified_at}
                      />
                    </FormFields>
                    <FormFields>
                      <FormLabel>Verifed phone</FormLabel>
                      <Input
                        inputRef={register}
                        name="vE"
                        value={data.phone_verified_at}
                      />
                    </FormFields>
                    <FormFields>
                      <FormLabel>Verifed Id</FormLabel>
                      <Input
                        inputRef={register}
                        name="vP"
                        value={data.identify?.identified_at || ""}
                      />
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
                type="button"
                onClick={() => onBlock(getUser)}
                isLoading={loading}
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
                {data.deleted_at ? "Unblock" : "Block"}
              </Button>
            </ButtonGroup>
          </Form>
        </>
      )}
    </Consumer>
  );
};

export default UserDetailForm;
