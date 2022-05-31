import { LongArrowLeft } from "assets/icons/LongArrowLeft";
import { Button } from "components/button/button";
import CarouselWithCustomDots from "components/multi-carousel/multi-carousel";
import { useLocale } from "contexts/language/language.provider";
import Router, { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { getCookie } from "utils/session";
// import { useAlert } from "react-alert";
import {
  BackButton,
  ProductDetailsWrapper,
  ProductPreview
} from "./product-details-one.style";

type ProductDetailsProps = {
  product: any;
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const Save: React.FunctionComponent<ProductDetailsProps> = ({
  product,
  deviceType,
}) => {
  const { isRtl } = useLocale();
  const [followed, setFollowed] = React.useState("");
  const [errorSave, setErrorSave] = React.useState("");
  const [successSave, setSuccessSave] = React.useState(false);
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }, []);

  const onSave = async () => {
    try {
      setSuccessSave(!successSave);
      const token = getCookie("access_token");

      if (token == undefined) {
        router.push("/login");
      } else {
        const options = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        };
        if (successSave == false) {
          const res = await fetch(
            process.env.NEXT_PUBLIC_LARAVEL_API_URL +
            `/api/client/v1/posts/${product.id}/save`,
            options
          );
          if (res.ok == false) {
            setErrorSave("errorSave");
          } else {
            const data = await res.json();
            setSuccessSave(true);
          }
        } else {
          const res = await fetch(
            process.env.NEXT_PUBLIC_LARAVEL_API_URL +
            `/api/client/v1/posts/${product.id}/unsave`,
            options
          );
          if (res.ok == false) {
            setErrorSave("errorSave");
          } else {
            const data = await res.json();
            setSuccessSave(false);
          }
        }
      }
    } catch (e) {
      alert(e);
    }
  };


  return (
    <>
      <ProductDetailsWrapper className="product-card" dir="ltr">
        {
          <ProductPreview>
            <BackButton>
              <Button
                type="button"
                size="small"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #f1f1f1",
                  color: "#77798c",
                }}
                onClick={Router.back}
              >
                <LongArrowLeft style={{ marginRight: 5 }} />
                <FormattedMessage id="backBtn" defaultMessage="Back" />
              </Button>
            </BackButton>

            <CarouselWithCustomDots
              items={product.gallery}
              deviceType={deviceType}
            />
          </ProductPreview>
        }
      </ProductDetailsWrapper>
    </>
  );
};

export default Save;
