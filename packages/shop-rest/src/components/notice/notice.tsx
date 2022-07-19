import React, { useState } from "react";
import { NoticeWrapper, SidebarWrapperTwo } from "./notice.style";

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
