import { Avatar } from "components/avatar/avatar";
import { useRouter } from "next/router";
import React, { ReactElement, CSSProperties } from "react";
import { FormattedMessage } from "react-intl";

interface props {
  isRight: boolean;
  position: string;
  data: string;
  endMessage: boolean;
  src?: string;
  key?: number;
  user_id?: number;
  clickAvatar?: () => void;
  refEndMessage?: any;
}

interface state {}

export class MessageText extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
  }

  render() {
    const {
      position,
      data,
      clickAvatar,
      endMessage,
      user_id,
      src,
      isRight,
      refEndMessage
    } = this.props;
    return (
      <div
        className={
          !isRight ? "wrap-item-message-left" : "wrap-item-message-right"
        }

        ref={refEndMessage}
      >
        <div
          style={{
            width: 40,
            alignSelf: "flex-end",
            marginRight: 5,
            cursor: "pointer",
          }}
          onClick={clickAvatar}
        >
          {src.length != 0 && (
            <Avatar width={40} height={40} radius="50%" src={src} />
          )}
        </div>
        <div
          className={
            !isRight
              ? `text-message position-${position}-left`
              : `text-message position-${position}-right`
          }
        >
          {data}
        </div>
      </div>
    );
  }
}
