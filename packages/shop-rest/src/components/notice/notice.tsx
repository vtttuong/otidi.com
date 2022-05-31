import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { NoticeWrapper, SidebarWrapperTwo } from "./notice.style";
import { FormattedMessage } from "react-intl";
import { PencilSquare } from "assets/icons/PencilSquare";
import { ArrowUpRight } from "assets/icons/ArrowUpRight";
import { Lightning } from "assets/icons/Lightning";
import { MenuButton } from "assets/icons/MenuButton";
import { ChevronDown } from "assets/icons/ChevronDown";
import { ChevronUp } from "assets/icons/ChevronUp";
import { CheckMark } from "assets/icons/CheckMark";
import { Hourglass } from "assets/icons/Hourglass";
import { Clipboard } from "assets/icons/Clipboard";
import { Warning } from "assets/icons/Warning";
import { Ban } from "assets/icons/Ban";
import { EyeSlash } from "assets/icons/EyeSlash";
import { Error } from "assets/icons/Error";
import { Success } from "assets/icons/Success";

type NoticeProps = {
  status?: string;
  content?: any;
};

const Notice: React.FC<NoticeProps> = ({ status, content }) => {
  const [show, setShow] = useState(true);

  // setShow(true);
  setTimeout(function () {
    setShow(false);
  }, 3000);

  return (
    <>
      {show ? (
        <NoticeWrapper
          onClick={() => setShow(false)}
          className={status == "success" ? "notice-success" : "notice-error"}
        >
          {status == "success" ? <Success /> : <Error />}
          <span>{content}</span>
          <span className="btn-remove">x</span>
        </NoticeWrapper>
      ) : null}
    </>
  );
};

export default Notice;
