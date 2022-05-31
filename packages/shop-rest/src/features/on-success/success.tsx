import {Success} from 'assets/icons/Success';
import React from "react";
import {ContainerCategory} from "./success.styles";
import {FormattedMessage} from "react-intl";
import Link from 'next/link';

type SuccessProps = {
  textId: string;
  href: string;
};

const SuccessModel: React.FC<SuccessProps> = ({
  textId, href
}) => { 

  return (
    <>
      <ContainerCategory>
        <div className="checkmark-circle">
        <div className="background"></div>
          <div className="checkmark draw"></div>
          </div>
        <ContainerCategory className={'text'}>
          <FormattedMessage id={textId} />
        </ContainerCategory>
        <Link href={href ? href : '/'}>
          <a>
            <FormattedMessage id="backHomeBtn" />
          </a></Link>
      </ContainerCategory>
    </>
  );
  }
export default SuccessModel;