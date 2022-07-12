import { Success } from "assets/icons/Success";
import React from "react";
import { ContainerCategory } from "./error.styles";
import { FormattedMessage } from "react-intl";
import Link from "next/link";
import { closeModal } from "@redq/reuse-modal";
import { Error } from "assets/icons/Error";

type SuccessProps = {
  textId: string;
  href: string;
};

const SuccessModel: React.FC<SuccessProps> = ({ textId, href }) => {
  return (
    <>
      <ContainerCategory>
        <div className="checkmark-circle">
          <Error styles={{ width: "100px", height: "100px" }} />
        </div>
        <ContainerCategory className={"text"}>
          <FormattedMessage id={textId} />
        </ContainerCategory>
        {href ? (
          <Link href={href ? href : ""}>
            <span onClick={closeModal} className="cancelbtn">
              <FormattedMessage id="Cancel-Button" defaultMessage={"Cancel"} />
            </span>
          </Link>
        ) : (
          <div>
            <span onClick={closeModal} className="cancelbtn">
              <FormattedMessage id="Cancel-Button" defaultMessage={"Cancel"} />
            </span>
          </div>
        )}
      </ContainerCategory>
    </>
  );
};
export default SuccessModel;
