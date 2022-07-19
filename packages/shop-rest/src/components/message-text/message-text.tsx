import { Avatar } from "components/avatar/avatar";
import { useRouter } from "next/router";
import React, {
  ReactElement,
  CSSProperties,
  useState,
  useRef,
  useEffect,
} from "react";
import { FormattedMessage } from "react-intl";

interface props {
  isRight: boolean;
  position: string;
  data: any;
  endMessage: boolean;
  src?: string;
  key?: number;
  user_id?: number;
  clickAvatar?: () => void;
  refEndMessage?: any;
}

interface state {
  active: boolean;
}

export const MessageText = ({
  position,
  data,
  clickAvatar,
  endMessage,
  user_id,
  src,
  isRight,
  refEndMessage,
}) => {
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  const on = () => {
    setActive(!active);
  };

  useEffect(() => {
    document.addEventListener("keydown", onClickOutSide, true);
    document.addEventListener("click", onClickOutSide, true);
    return () => {
      document.removeEventListener("keydown", onClickOutSide, true);
      document.removeEventListener("click", onClickOutSide, true);
    };
  });

  const onClickOutSide = (e) => {
    if (ref && !ref.current.contains(e.target)) {
      if (active) {
        on();
      }
    }
  };

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
          height: 40,
          alignSelf: "flex-end",
          marginRight: 5,
          cursor: "pointer",
          // marginBottom: "1"
        }}
        onClick={src && src.length ? clickAvatar : () => {}}
      >
        {src && src.length != 0 && (
          <Avatar width={40} height={40} radius="50%" src={src} />
        )}
      </div>
      <div
        ref={ref}
        className={`text-message-wrapper text-message-wrapper-${
          isRight ? "right" : "left"
        }`}
      >
        <div
          onClick={on.bind(this)}
          className={
            !isRight
              ? `text-message position-${position}-left`
              : `text-message position-${position}-right`
          }
        >
          <p>{data.message}</p>
        </div>
        <i className={`seen seen-${position} ${active ? "active" : ""}`}>
          {data.read_at ? `Seen at ${data.read_at}` : "Not seen"}
        </i>
      </div>
    </div>
  );
};
