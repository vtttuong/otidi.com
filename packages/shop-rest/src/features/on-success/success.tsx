import { Success } from "assets/icons/Success";
import React from "react";
import { ContainerCategory } from "./success.styles";
import { FormattedMessage } from "react-intl";
import Link from "next/link";
import { closeModal } from "@redq/reuse-modal";

type SuccessProps = {
  textId: string;
  href: string;
  btnId?: string;
};

const SuccessModel: React.FC<SuccessProps> = ({ textId, href, btnId }) => {
  return (
    <>
      <ContainerCategory>
        <div className="checkmark-circle">
          <div className="background"></div>
          <div className="checkmark draw"></div>
        </div>
        <ContainerCategory className={"text"}>
          <FormattedMessage id={textId} />
        </ContainerCategory>
        <Link href={href ? href : "/"}>
          <span onClick={closeModal} className="homebtn">
            <FormattedMessage id={btnId ? btnId : "backHomeBtn"} />
          </span>
        </Link>
      </ContainerCategory>
    </>
  );
};
export default SuccessModel;
