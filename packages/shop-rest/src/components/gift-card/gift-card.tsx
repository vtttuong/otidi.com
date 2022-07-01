import React, { useEffect, useRef, useState } from "react";
import { Img } from "react-image";
import { FormattedMessage } from "react-intl";
import {
  CardContent,
  CardInfo,
  CopyButton,
  GiftCardImageWrapper,
  GiftCardWrapper,
  GiftCode,
} from "./gift-card.style";

type GiftCardProps = {
  image?: any;
  weight?: string;
  code?: any;
  onClick?: (e: any) => void;
  onChange?: (e: any) => void;
};

const GiftCard: React.FC<GiftCardProps> = ({
  image,
  weight,
  onClick,
  onChange,
  code,
  ...props
}) => {
  const [copyText, setCopyText] = useState({
    value: code,
    copied: false,
  });
  const codeRef = useRef(null);

  useEffect(() => {
    if (copyText.copied) {
      setTimeout(() => {
        setCopyText({
          ...copyText,
          copied: false,
        });
      }, 3500);
    }
  }, [copyText.copied]);

  return (
    <GiftCardWrapper {...props} className="post-card">
      <GiftCardImageWrapper>
        <Img src={image} className="gift-image" alt="gift image" />
      </GiftCardImageWrapper>
    </GiftCardWrapper>
  );
};

export default GiftCard;
