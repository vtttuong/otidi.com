import React from "react";
import { useRouter } from "next/router";
import NoResultSvg from "./no-result.svg";
import {
  NoResultWrapper,
  ImageWrapper,
  ButtonWrapper,
} from "./no-result.style";
import { ArrowPrev } from "assets/icons/ArrowPrev";
import { Button } from "components/button/button";
import { FormattedMessage } from "react-intl";

type NoResultFoundProps = {
  id?: string;
};

const NoResultFound: React.FC<NoResultFoundProps> = ({ id }) => {
  const router = useRouter();
  // const { dispatch } = React.useContext(SearchContext);

  function onClickButton() {
    router.back();
  }
  return (
    <NoResultWrapper id={id}>
      <ImageWrapper>
        <img src={NoResultSvg} alt="No Result" />
      </ImageWrapper>

      <h3>
        <FormattedMessage
          id="noResultFound"
          defaultMessage="Sorry, No result found :("
        />
      </h3>

      <ButtonWrapper>
        <div onClick={onClickButton}>
          <Button>
            <ArrowPrev /> Go back
          </Button>
        </div>
      </ButtonWrapper>
    </NoResultWrapper>
  );
};

export default NoResultFound;
