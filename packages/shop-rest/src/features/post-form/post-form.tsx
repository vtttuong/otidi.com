import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "components/button/button";
import SelectBrand from "components/drop-op/drop-op";
import { Input } from "components/forms/input";
import { Label } from "components/forms/label";
import Uploader from "components/upload/upload";
import QuickForm from "features/quick-form";
import FormAdditional from "features/post-form/form-additional";
import SuccessModel from "features/on-success/success";
import Select from "react-select";

import { observer } from "mobx-react";
import dynamic from "next/dynamic";
import { FormattedMessage } from "react-intl";
import FormWrapper, {
  BackButton,
  ButtonCategory,
  Col,
  Container,
  FormTitle,
  FormTitleWrapper,
  Heading,
  NoteSmallText,
  NoteText,
  Row,
  SubmitBtnWrapper,
  CustomStyles,
  InputPrice,
  Error,
  Require,
} from "./post-form.style";
import { openModal } from "@redq/reuse-modal";
import { PostFormContext } from "contexts/post-form/post-form.context";
import { LongArrowLeft } from "assets/icons/LongArrowLeft";
import NumberFormat from "react-number-format";
import { getCookie } from "utils/session";
import { unitOptions } from "./options";
import ErrorModel from "features/on-error/error";
import { useRouter } from "next/router";

const TextArea = dynamic(() => import("../../components/text-area/text-area"), {
  ssr: false,
});

const Step1 = (props) => {
  const { state, dispatch } = useContext(PostFormContext);
  if (props.currentStep !== 1) {
    return <div></div>;
  }

  return (
    <div>
      <Heading>
        <FormattedMessage id="noteStep2" defaultMessage="Note" />
      </Heading>

      <NoteText>
        <FormattedMessage
          id="noteDescriptionStep2"
          defaultMessage="Enter a title to attract more news views"
          values={{ inside: 5, outside: 10 }}
        />
      </NoteText>

      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Label>
            <FormattedMessage id="inputTitle" />
            <Require>*</Require>
          </Label>

          <Input
            type="text"
            label="Title"
            name="title"
            placeholder="Enter Title"
            value={state.title}
            onChange={(e) => {
              dispatch({
                type: "HANDLE_ON_SELECT_CHANGE",
                payload: { value: e.target.value, field: "title" },
              });
            }}
            backgroundColor="#F7F7F7"
            height="48px"
          />
        </Col>
      </Row>

      <Row>
        <Col xs={8} sm={8} md={8} lg={8}>
          <Label>
            <FormattedMessage id="originalPrice" />
          </Label>
          <InputPrice>
            <NumberFormat
              className="inputPrice"
              label="Price"
              name="price"
              allowNegative={false}
              thousandSeparator={true}
              onValueChange={(data) => {
                dispatch({
                  type: "HANDLE_ON_SELECT_CHANGE",
                  payload: { value: data.floatValue, field: "originalPrice" },
                });
              }}
              background="#F7F7F7"
              height="48px"
              placeholder="Enter original price"
              value={state.originalPrice}
              autoComplete={"off"}
            />
          </InputPrice>
        </Col>

        <Col xs={4} sm={4} md={4} lg={4}>
          <Label>
            <FormattedMessage id="inputUnit" />
          </Label>
          <div style={{ minWidth: "100%" }}>
            <Select
              isDisabled={true}
              instanceId="input-unit"
              classNamePrefix="filter"
              styles={CustomStyles}
              options={unitOptions}
              defaultValue={unitOptions[0]}
              value={unitOptions[state.indexOptionUnit]}
              onChange={(data) => {
                dispatch({
                  type: "HANDLE_ON_SELECT_CHANGE",
                  payload: { value: data.value, field: "unit" },
                });
                dispatch({
                  type: "HANDLE_ON_SELECT_CHANGE",
                  payload: { value: data.index, field: "indexOptionUnit" },
                });
              }}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={8} sm={8} md={8} lg={8}>
          <Label>
            <FormattedMessage id="discountPrice" />
            <Require>*</Require>
          </Label>
          <InputPrice>
            <NumberFormat
              className="inputPrice"
              label="Price"
              name="price"
              allowNegative={false}
              thousandSeparator={true}
              onValueChange={(data) => {
                dispatch({
                  type: "HANDLE_ON_SELECT_CHANGE",
                  payload: { value: data.floatValue, field: "discountPrice" },
                });
              }}
              background="#F7F7F7"
              height="48px"
              placeholder="Enter discount price"
              value={state.discountPrice}
              autoComplete={"off"}
            />
          </InputPrice>
        </Col>

        <Col xs={4} sm={4} md={4} lg={4}>
          <Label>
            <FormattedMessage id="inputUnit" />
          </Label>
          <div style={{ minWidth: "100%" }}>
            <Select
              isDisabled={true}
              instanceId="input-unit"
              classNamePrefix="filter"
              styles={CustomStyles}
              options={unitOptions}
              defaultValue={unitOptions[0]}
              value={unitOptions[state.indexOptionUnit]}
              onChange={(data) => {
                dispatch({
                  type: "HANDLE_ON_SELECT_CHANGE",
                  payload: { value: data.value, field: "unit" },
                });
                dispatch({
                  type: "HANDLE_ON_SELECT_CHANGE",
                  payload: { value: data.index, field: "indexOptionUnit" },
                });
              }}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={8} sm={8} md={8} lg={8}>
          <Label>
            <FormattedMessage id="priceAfterTax" />
            <Require>*</Require>
          </Label>
          <InputPrice>
            <NumberFormat
              className="inputPrice"
              label="Price"
              name="price"
              allowNegative={false}
              thousandSeparator={true}
              onValueChange={(data) => {
                dispatch({
                  type: "HANDLE_ON_SELECT_CHANGE",
                  payload: { value: data.floatValue, field: "priceAfterTax" },
                });
              }}
              background="#F7F7F7"
              height="48px"
              placeholder="Enter price after tax"
              value={state.priceAfterTax}
              autoComplete={"off"}
            />
          </InputPrice>
        </Col>

        <Col xs={4} sm={4} md={4} lg={4}>
          <Label>
            <FormattedMessage id="inputUnit" />
          </Label>
          <div style={{ minWidth: "100%" }}>
            <Select
              isDisabled={true}
              instanceId="input-unit"
              classNamePrefix="filter"
              styles={CustomStyles}
              options={unitOptions}
              defaultValue={unitOptions[0]}
              value={unitOptions[state.indexOptionUnit]}
              onChange={(data) => {
                dispatch({
                  type: "HANDLE_ON_SELECT_CHANGE",
                  payload: { value: data.value, field: "unit" },
                });
                dispatch({
                  type: "HANDLE_ON_SELECT_CHANGE",
                  payload: { value: data.index, field: "indexOptionUnit" },
                });
              }}
            />
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Label>
            <FormattedMessage id="description" />
            <Require>*</Require>
          </Label>
          <NoteSmallText>
            <FormattedMessage
              id="noteLabelDescription"
              defaultMessage="Introduce the post you need to sell/buy fully and clearly to attract more people (size, specifications, colors, etc)"
              values={{ inside: 5, outside: 10 }}
            />
          </NoteSmallText>
          <TextArea />
        </Col>
      </Row>
    </div>
  );
};

const Step2 = (props) => {
  const { state, dispatch } = useContext(PostFormContext);
  if (props.currentStep !== 2) {
    return <div></div>;
  }

  console.log("STATE: ", state);

  return (
    <div>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Heading>
            <FormattedMessage
              id="rmPrescripttionUploadd"
              defaultMessage="Upload your image"
            />
          </Heading>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Uploader
            imagefiles={state.files}
            onChange={props.handleUploader}
            intlUploadText="rmUploadText"
          />
        </Col>
        {props.errorImage !== "" ? (
          <Error>
            <FormattedMessage id={props.errorImage} />
          </Error>
        ) : null}
      </Row>
    </div>
  );
};

const Step3 = (props) => {
  const { state, dispatch } = useContext(PostFormContext);
  const [errorSubmit, setErrorSubmit] = useState("");

  if (props.currentStep !== 3) {
    return null;
  }

  const onclickSubmit = () => {
    if (
      !state.modelId ||
      state.modelId === "" ||
      !state.additionalInfo.origin ||
      state.additionalInfo.origin === "" ||
      !state.additionalInfo.kilometers ||
      parseInt(state.additionalInfo.kilometers) <= 0
    ) {
      setErrorSubmit("Error");
    } else {
      setErrorSubmit("");
      props.handleSubmit();
    }
  };

  return (
    <div>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <Label>
            <FormattedMessage
              id="optionalInformation"
              defaultMessage="Optional Information >"
            />
          </Label>
          <NoteSmallText>
            <FormattedMessage
              id="noteOptionalInfo"
              defaultMessage="In order for others to see more complete information about the post, you can fill in some information below"
              values={{ inside: 5, outside: 10 }}
            />
          </NoteSmallText>
        </Col>
      </Row>

      <Row>{props.additionalForm}</Row>

      <SubmitBtnWrapper>
        {errorSubmit !== "" ? (
          <Error className="errorStep1">
            <FormattedMessage id="ErrorStep" />
          </Error>
        ) : null}
        <Button
          type="button"
          onClick={onclickSubmit}
          size="big"
          loading={props.loading}
          style={{ width: "100%", marginTop: "20px" }}
        >
          <FormattedMessage
            id="submitRequest"
            defaultMessage="Submit Request"
          />
        </Button>
      </SubmitBtnWrapper>
    </div>
  );
};

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  title?: string;
  brands: any;
};
const PostForm: React.FC<Props> = ({ deviceType, title, brands }) => {
  const { state, dispatch } = useContext(PostFormContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [errorStep, setErrorStep] = useState("");
  const [errorImage, setErrorImage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const ACCEPTED_SIZE = 512 * 1000;

  const _next = () => {
    if (currentStep === 1) {
      if (
        state.title &&
        state.discountPrice &&
        state.priceAfterTax &&
        state.unit &&
        state.description !== ""
      ) {
        let newStep = currentStep;
        newStep = newStep + 1;
        setCurrentStep(newStep);
        setErrorStep("");
      } else {
        setErrorStep("error");
      }
    }
    if (currentStep === 2) {
      if (!state.files || state.files === "" || state.files.length <= 3) {
        setErrorImage("errorImage.length");
        return;
      }

      let isOverSize = false;

      state.files.forEach((file) => {
        if (file.size > ACCEPTED_SIZE) {
          setErrorImage("errorImage.size");
          isOverSize = true;
          return;
        }
      });

      if (!isOverSize) {
        let newStep = currentStep;
        newStep = newStep + 1;
        setCurrentStep(newStep);
        setErrorStep("");
        setErrorImage("");
      }
    }
  };

  const _prev = () => {
    let newStep = currentStep;
    newStep = newStep - 1;
    setErrorStep("");
    setCurrentStep(newStep);
  };

  const previousButton = () => {
    if (currentStep !== 1) {
      return (
        <BackButton>
          <Button
            type="button"
            size="small"
            style={{
              background: "#ffffff",
              border: "1px solid #f1f1f1",
              color: "#77798c",
            }}
            onClick={_prev}
          >
            <LongArrowLeft style={{ marginRight: 5 }} />
            <FormattedMessage id="backBtn" defaultMessage="Back" />
          </Button>
        </BackButton>
      );
    }
    return null;
  };

  const nextButton = () => {
    if (currentStep < 3) {
      return (
        <SubmitBtnWrapper>
          {errorStep ? (
            <Error className="errorStep1">
              <FormattedMessage id="ErrorStep" />
            </Error>
          ) : null}

          <Button
            type="button"
            size="big"
            onClick={_next}
            style={{ width: "100%", marginTop: "20px" }}
          >
            <FormattedMessage id="nextBtn" defaultMessage="Next" />
          </Button>
        </SubmitBtnWrapper>
      );
    }
    return null;
  };

  const onSubmit = async () => {
    setLoading(true);

    const token = getCookie("access_token");

    var formdata = new FormData();
    formdata.append("title", state.title);
    formdata.append("description", state.description);
    formdata.append("brand_id", state.brandId);
    formdata.append("brand_model_id", state.modelId);
    formdata.append("original_price", state.originalPrice);
    formdata.append("discount_price", state.discountPrice);
    formdata.append("price_after_tax", state.priceAfterTax);

    Object.keys(state.additionalInfo).forEach((key) => {
      formdata.append(`detail[${key}]`, state.additionalInfo[key]);
    });

    state.files.forEach((file, index) => {
      formdata.append(`images[${index}][file]`, file);
      formdata.append(`images[${index}][is_main]`, index === 0 ? "1" : "0");
      formdata.append(`images[${index}][position]`, index);
    });

    const configs = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": `multipart/form-data;`,
      },
    };

    axios
      .post(
        process.env.NEXT_PUBLIC_LARAVEL_API_URL_CLIENT + `/posts`,
        formdata,
        configs
      )
      .then((response) => {
        console.log(response);

        if (
          (response.status === 200 || response.status === 201) &&
          response.data.success
        ) {
          openModal({
            show: true,
            overlayClassName: "quick-view-overlay",
            closeOnClickOutside: false,
            component: SuccessModel,
            closeComponent: "",
            config: {
              enableResizing: false,
              disableDragging: true,
              className: "quick-view-modal",
              width: "500px",
              height: "auto",
            },
            componentProps: { textId: "createPostSuccess" },
          });

          setTimeout(() => {
            router.push("/");
          }, 2000);
        } else {
          openModal({
            show: true,
            overlayClassName: "quick-view-overlay",
            closeOnClickOutside: true,
            component: ErrorModel,
            closeComponent: "",
            config: {
              enableResizing: false,
              disableDragging: true,
              className: "quick-view-modal",
              width: "500px",
              height: "auto",
            },
            componentProps: { textId: "createPostFailed" },
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        openModal({
          show: true,
          overlayClassName: "quick-view-overlay",
          closeOnClickOutside: true,
          component: ErrorModel,
          closeComponent: "",
          config: {
            enableResizing: false,
            disableDragging: true,
            className: "quick-view-modal",
            width: "500px",
            height: "auto",
          },
          componentProps: { textId: "createPostFailed" },
        });
      });
  };

  const handleUploader = (files) => {
    let fileCollection = [];
    files.map((file) => {
      fileCollection.push(file);
    });
    // setErrorImage("");
  };
  return (
    <form>
      <FormWrapper>
        <Container>
          {previousButton()}
          <FormTitleWrapper>
            <FormTitle>
              <FormattedMessage id={title} defaultMessage="Post news now !!!" />
            </FormTitle>
          </FormTitleWrapper>

          <Step1 currentStep={currentStep} />

          <Step2
            currentStep={currentStep}
            handleUploader={handleUploader}
            errorImage={errorImage}
          />
          <Step3
            currentStep={currentStep}
            loading={loading}
            handleSubmit={onSubmit}
            additionalForm={<FormAdditional brands={brands} />}
          />
          {nextButton()}
        </Container>
      </FormWrapper>
    </form>
  );
};

export default observer(PostForm);
