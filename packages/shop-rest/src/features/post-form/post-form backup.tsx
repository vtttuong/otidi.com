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
import { SelectCat } from "assets/icons/SelectCat";

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
import SelectModel from "../select-category/select-model";

export const unitOptions = [
  { index: 0, key: "unit", value: "VND", label: "VND" },
  { index: 1, key: "unit", value: "USD", label: "USD" },
];

export const postType = [
  {
    index: 0,
    key: "type",
    value: "sell",
    label: <FormattedMessage id="sell" />,
  },
  {
    index: 1,
    key: "type",
    value: "buy",
    label: <FormattedMessage id="buy" />,
  },
];

export const postStatus = [
  {
    index: 0,
    key: "postStatus",
    value: "new",
    label: <FormattedMessage id="newStatus" />,
  },
  {
    index: 1,
    key: "postStatus",
    value: "old_not_repaired",
    label: <FormattedMessage id="oldNotRepaired" />,
  },
  {
    index: 2,
    key: "postStatus",
    value: "old_and_repaired",
    label: <FormattedMessage id="oldRepaired" />,
  },
];

const TextArea = dynamic(() => import("../../components/text-area/text-area"), {
  ssr: false,
});

// const Step1 = (props) => {
//   if (props.currentStep !== 1) {
//     return <div></div>;
//   }

//   const { state, dispatch } = useContext(PostFormContext);
//   const [first, setFirst] = useState(true);

//   useEffect(() => {
//     if (!first) {
//       dispatch({
//         type: "HANDLE_ON_SELECT_CHANGE",
//         payload: { value: null, field: "modelName" },
//       });

//       dispatch({
//         type: "HANDLE_ON_SELECT_CHANGE",
//         payload: { value: 0, field: "modelId" },
//       });
//     }
//     setFirst(false);
//   }, [state.brandId]);

//   console.log(state);

//   return (
//     <div>
//       <Row>
//         <Col xs={12} sm={12} md={12} lg={12}>
//           <Heading>
//             <FormattedMessage
//               id="selectBrand"
//               defaultMessage="Choose a posting category"
//             />
//           </Heading>
//         </Col>
//       </Row>

//       <Row>
//         <Col xs={12} sm={4} md={4} lg={4}>
//           <Label>
//             <FormattedMessage id="brand" defaultMessage="Select Brand" />
//             <Require>*</Require>
//           </Label>
//           <SelectBrand
//             options={props.brands.map((b) => ({
//               key: b.id,
//               value: b.id,
//               label: b.name,
//             }))}
//           />
//         </Col>

//         <Col xs={12} sm={8} md={8} lg={8}>
//           <Label>
//             <FormattedMessage id="model" defaultMessage="Select Model" />
//             <Require>*</Require>
//           </Label>

//           <ButtonCategory
//             className={"button-select-category"}
//             onClick={() => {
//               if (state.brandId !== undefined) {
//                 openModal({
//                   show: true,
//                   overlayClassName: "quick-view-overlay",
//                   closeOnClickOutside: true,
//                   component: SelectModel,
//                   closeComponent: "",
//                   config: {
//                     enableResizing: false,
//                     disableDragging: true,
//                     className: "quick-view-modal",
//                     width: "320px",
//                     height: "auto",
//                   },
//                   componentProps: { brands: props.brands },
//                 });
//               }
//             }}
//           >
//             {state.modelName ? state.modelName : <SelectCat />}
//             {!state.modelName || state.modelName === "" ? (
//               <Error>
//                 <FormattedMessage id={"errorModel"} />
//               </Error>
//             ) : null}
//           </ButtonCategory>
//         </Col>
//       </Row>

//       {/* <Row>
//         <Col xs={12} sm={12} md={12} lg={12}>
//           <Heading>
//             <FormattedMessage id="postType" defaultMessage="Type of post" />
//           </Heading>
//           <div style={{ minWidth: "100%" }}>
//             <Select
//               instanceId="type-of-post"
//               classNamePrefix="filter"
//               styles={CustomStyles}
//               options={postType}
//               defaultValue={postType[0]}
//               value={postType[state.indexOptionType]}
//               onChange={(data) => {
//                 dispatch({
//                   type: "HANDLE_ON_SELECT_CHANGE",
//                   payload: { value: data.value, field: "type" },
//                 });
//                 dispatch({
//                   type: "HANDLE_ON_SELECT_CHANGE",
//                   payload: { value: data.index, field: "indexOptionType" },
//                 });
//               }}
//             />
//           </div>
//         </Col>
//       </Row> */}
//     </div>
//   );
// };

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
        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="inputPrice" />
            <Require>*</Require>
          </Label>
          <InputPrice>
            <NumberFormat
              className="inputPrice"
              label="Price"
              name="price"
              thousandSeparator={true}
              onValueChange={(data) => {
                dispatch({
                  type: "HANDLE_ON_SELECT_CHANGE",
                  payload: { value: data.floatValue, field: "price" },
                });
              }}
              background="#F7F7F7"
              height="48px"
              placeholder="Enter price"
              value={state.price}
              autoComplete={"off"}
            />
          </InputPrice>
        </Col>

        <Col xs={6} sm={6} md={6} lg={6}>
          <Label>
            <FormattedMessage id="inputUnit" />
          </Label>
          <div style={{ minWidth: "100%" }}>
            <Select
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
        {(state.files !== "" &&
          state.files.length >= 0 &&
          state.files.length <= 2) ||
        props.errorImage !== "" ? (
          <Error>
            <FormattedMessage id="errorImage" />
          </Error>
        ) : null}
      </Row>
    </div>
  );
};

// const Step4 = (props) => {
//   if (props.currentStep !== 4) {
//     return null;
//   }

//   return (
//     <div>
//       <Row>
//         <Col xs={12} sm={12} md={12} lg={12}>
//           <Label>
//             <FormattedMessage id="location" />
//           </Label>
//           <QuickForm initialValues={[]} />
//         </Col>
//       </Row>
//     </div>
//   );
// };

const Step3 = (props) => {
  if (props.currentStep !== 3) {
    return null;
  }

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
        <Button
          type="button"
          onClick={props.handleSubmit}
          size="big"
          loading={props.loading}
          style={{ width: "100%" }}
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
  categoryTypes: any;
  brands: any;
};
const PostForm: React.FC<Props> = ({
  deviceType,
  title,
  categoryTypes,
  brands,
}) => {
  const { state, dispatch } = useContext(PostFormContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [errorStep, setErrorStep] = useState("");
  const [errorImage, setErrorImage] = useState("");
  const [loading, setLoading] = useState(false);

  const _next = () => {
    // if (currentStep == 1) {
    //   if (state.brandId && state.modelName && state.modelId) {
    //     let newStep = currentStep;
    //     newStep = newStep + 1;
    //     setCurrentStep(newStep);
    //     setErrorStep("");
    //   } else {
    //     setErrorStep("error");
    //   }
    // }
    if (currentStep === 1) {
      if (
        state.title &&
        state.price &&
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
      if (state.files != "" && state.files.length >= 2) {
        let newStep = currentStep;
        newStep = newStep + 1;
        setCurrentStep(newStep);
        setErrorStep("");
      } else {
        setErrorImage("error");
      }
    }
    // if (currentStep == 4) {
    //   if (state.address != "") {
    //     let newStep = currentStep;
    //     newStep = newStep + 1;
    //     setCurrentStep(newStep);
    //     setErrorStep("");
    //   } else {
    //     setErrorStep("error");
    //   }
    // }
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
    if (currentStep < 4) {
      return (
        <SubmitBtnWrapper>
          <Button
            type="button"
            size="big"
            onClick={_next}
            style={{ width: "100%" }}
          >
            <FormattedMessage id="nextBtn" defaultMessage="Next" />
          </Button>
          {errorStep ? (
            <Error className="errorStep1">
              <FormattedMessage id="ErrorStep" />
            </Error>
          ) : null}
        </SubmitBtnWrapper>
      );
    }
    return null;
  };

  const onSubmit = async () => {
    setLoading(true);

    const token = getCookie("access_token");
    var formData = new FormData();

    formData.set("title", state.title);
    formData.set("description", state.description);
    formData.set("price", state.price);
    formData.set("unit", state.unit);
    formData.set("category_id", state.categoryId);
    formData.set("address", state.address);
    formData.set("type", state.type);
    formData.set("latitude", state.latitude);
    formData.set("longitude", state.longitude);

    if (Object.keys(state.files).length > 1) {
      state.files.forEach((file) => {
        formData.append("files[]", file);
      });
    } else {
      formData.append("files[]", state.files);
    }
    Object.keys(state.additionalInfo).forEach((key) =>
      formData.append(`additional_info[${key}]`, state.additionalInfo[key])
    );

    const configs = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": `multipart/form-data;`,
      },
    };

    axios
      .post(
        process.env.NEXT_PUBLIC_LARAVEL_API_URL + `/api/client/v1/posts`,
        formData,
        configs
      )
      .then((response) => {
        if (response.status === 201) {
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
        } else {
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
            componentProps: { textId: "createPostFailed" },
          });
        }
        setLoading(false);
      })
      .catch((error) => {
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

          {/* <Step1
            currentStep={currentStep}
            brands={brands}
            categoryTypes={categoryTypes}
          /> */}
          <Step1 currentStep={currentStep} />

          <Step2
            currentStep={currentStep}
            handleUploader={handleUploader}
            errorImage={errorImage}
          />
          {/* <Step4 currentStep={currentStep} /> */}
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
