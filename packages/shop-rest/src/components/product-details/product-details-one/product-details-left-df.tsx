import { LongArrowLeft } from "assets/icons/LongArrowLeft";
import { Button } from "components/button/button";
import CarouselWithCustomDots from "components/multi-carousel/multi-carousel";
import Router from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";
// import { useAlert } from "react-alert";
import { BackButton, ProductPreview } from "./product-details-one.style";

const ProductDetailsLeftDf: React.FunctionComponent<{}> = ({}) => {
  const [product, setProduct] = React.useState<any>({
    image: "unnamed.png",
    gallery: [
      { id: 238, url: "unnamed.png", position: 1 },
      { id: 239, url: "unnamed.png", position: 2 },
      { id: 240, url: "unnamed.png", position: 3 },
    ],
  });

  return (
    <>
      <ProductPreview>
        <BackButton className="back">
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
          deviceType={"desktop"}
        />
      </ProductPreview>
    </>
  );
};

export default ProductDetailsLeftDf;
