import Button, {KIND} from "components/Button/Button";
import DrawerBox from "components/DrawerBox/DrawerBox";
import {Col, Row} from "components/FlexBox/FlexBox";
import {FormFields, FormLabel} from "components/FormFields/FormFields";
import Input from "components/Input/Input";
import {useDrawerDispatch} from "context/DrawerContext";
import {createUser} from "service/use-users";
import React, {useCallback, useState} from "react";
import {Scrollbars} from "react-custom-scrollbars";
import {useForm} from "react-hook-form";
import {useAlert} from "react-alert";
import {
  ButtonGroup,
  DrawerTitle,
  DrawerTitleWrapper,
  FieldDetails,
  Form,
} from "../DrawerItems/DrawerItems.style";

type Props = any;

const AddCampaing: React.FC<Props> = (props) => {
  const alert = useAlert();

  const dispatch = useDrawerDispatch();
  const closeDrawer = useCallback(() => dispatch({type: "CLOSE_DRAWER"}), [
    dispatch,
  ]);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleChangeInput = (e) => {
    const {value, name} = e.target;

    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const {register, handleSubmit} = useForm();

  React.useEffect(() => {
    register({name: "category"});
  }, [register]);

  const onSubmit = async () => {
    setLoading(true);

    const newUser = await createUser(email, name, password);
    console.log(newUser);

    if (newUser.isError) {
      alert.error("Create user failed");
    } else {
      const userCreated = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        rating: newUser.rating,
        avatar: newUser.avatar,
        phone_number: null,
        created_at: null,
        updated_at: null,
        address: null,
        balance: null,
        email_verified_at: null,
        phone_verified_at: null,
        identity_verified_at: null,
        identity_card: null,
      };

      dispatch({
        type: "SAVE_CREATED_USER",
        data: userCreated,
      });
      alert.success("Create user successfully");
    }

    setLoading(false);
    closeDrawer();
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Add User</DrawerTitle>
      </DrawerTitleWrapper>

      <Form style={{height: "100%"}} onSubmit={handleSubmit(onSubmit)}>
        <Scrollbars
          autoHide
          renderView={(props) => (
            <div {...props} style={{...props.style, overflowX: "hidden"}} />
          )}
          renderTrackHorizontal={(props) => (
            <div
              {...props}
              style={{display: "none"}}
              className="track-horizontal"
            />
          )}
        >
          <Row>
            <Col lg={4}>
              <FieldDetails>Add information of user from here</FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel> Name</FormLabel>
                  <Input
                    inputRef={register({required: true})}
                    name="name"
                    value={name}
                    onChange={handleChangeInput}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    inputRef={register({required: true})}
                    name="email"
                    value={email}
                    onChange={handleChangeInput}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>PassWord</FormLabel>
                  <Input
                    type="password"
                    inputRef={register({required: true})}
                    name="password"
                    value={password}
                    onChange={handleChangeInput}
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
                style: ({$theme}) => ({
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
            type="submit"
            isLoading={loading}
            overrides={{
              BaseButton: {
                style: ({$theme}) => ({
                  width: "50%",
                  borderTopLeftRadius: "3px",
                  borderTopRightRadius: "3px",
                  borderBottomRightRadius: "3px",
                  borderBottomLeftRadius: "3px",
                }),
              },
            }}
          >
            Create user
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default AddCampaing;
