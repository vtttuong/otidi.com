import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { SidebarWrapper, SidebarWrapperTwo } from "./sidebar.style";
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
import { SquareCheck } from "assets/icons/SquareCheck";
import { Bookmarks } from "assets/icons/Bookmarks";

type SidebarProps = {
  setActiveTab?: Dispatch<SetStateAction<string>>;
  setActive?: () => void;
  balance?: number;
  dataPost?: any;
};

const SidebarCategory: React.FC<SidebarProps> = ({
  setActiveTab,
  setActive,
  balance,
  dataPost,
}) => {
  const [show, setShow] = useState(false);
  const [pushN, setPush] = useState([]);
  React.useEffect(() => {
    dataPost?.posts.map((d) => (d.advertise == true ? pushN.push(d) : null));
    setPush(pushN);
  }, [dataPost]);

  return (
    <>
      <SidebarWrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            borderBottom: "1px solid #e1e1e1",
          }}
        >
          <img
            src="https://trangdangtin.com/htdocs/templates/eshopper/images/icon-usd-active.png"
            width={40}
            height={40}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 10,
            }}
          >
            <div
              style={{
                color: "#009E7F",
                marginLeft: 20,
                marginBottom: 5,
                fontSize: 35,
                fontWeight: 800,
                position: "relative",
                top: -5,
              }}
            >
              {balance}
            </div>
          </div>
        </div>
        <div style={{ padding: "10px 0px" }}>
          <div style={{ display: "flex", marginTop: 10 }}>
            <div style={{ marginRight: 5, width: 18 }}>
              <PencilSquare />
            </div>
            <div>
              <FormattedMessage id="post" defaultMessage="Post" />:{" "}
              <span style={{ color: "#009E7F" }}>
                {dataPost?.posts?.length}
              </span>{" "}
              <FormattedMessage id="times" defaultMessage="Times" />
            </div>
          </div>
          <div style={{ display: "flex", marginTop: 10 }}>
            <div style={{ marginRight: 5, width: 18 }}>
              <ArrowUpRight />
            </div>
            <div>
              <FormattedMessage id="push" defaultMessage="Push" />:{" "}
              <span style={{ color: "#009E7F" }}>
                {dataPost?.pushing_posts?.length}
              </span>{" "}
              <FormattedMessage id="times" defaultMessage="Times" />
            </div>
          </div>
          <div style={{ display: "flex", marginTop: 10 }}>
            <div style={{ marginRight: 5, color: "#F68421", width: 18 }}>
              <Lightning />
            </div>
            <div>
              <FormattedMessage id="waitingPosts" defaultMessage="Vip posts" />:{" "}
              <span style={{ color: "#009E7F" }}>
                {dataPost?.waiting_approve_posts.length}
              </span>{" "}
              <FormattedMessage id="times" defaultMessage="Times" />
            </div>
          </div>
          <div style={{ display: "flex", marginTop: 10 }}>
            <div style={{ marginRight: 5, color: "#BE382D", width: 18 }}>
              <Lightning />
            </div>
            <div>
              <FormattedMessage id="soldPosts" defaultMessage="Sold" />:{" "}
              <span style={{ color: "#009E7F" }}>
                {dataPost?.sold_posts.length}
              </span>{" "}
              <FormattedMessage id="times" defaultMessage="Times" />
            </div>
          </div>
        </div>{" "}
      </SidebarWrapper>

      <SidebarWrapperTwo>
        <div
          style={{
            padding: "10px 10px",
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #e1e1e1",
            borderTop: "3px solid #009E7F",
          }}
        >
          <div style={{ display: "flex" }}>
            <div className="div-icon" style={{ marginRight: 5, width: 18 }}>
              <MenuButton />
            </div>
            <div>
              <FormattedMessage
                id="postManagement"
                defaultMessage="Post Management"
              />{" "}
            </div>
          </div>
          <div onClick={() => setShow(!show)}>
            <span style={{ padding: 5, cursor: "pointer" }}>
              {!show ? <ChevronDown /> : <ChevronUp />}
            </span>
          </div>
        </div>
        {show && (
          <div>
            <div style={{ backgroundColor: "#F8F8F8", padding: "5px 10px" }}>
              <div
                className="row-manage"
                onClick={() => {
                  setActiveTab("postingPosts");
                  setActive();
                }}
              >
                <div style={{ color: "#1BC24E" }} className="div-icon">
                  <CheckMark width="15px" height="15px" color="green" />
                </div>
                <div>
                  <FormattedMessage
                    id="postingPosts"
                    defaultMessage="Posting Posts"
                  />{" "}
                  <span style={{ color: "#009E7F" }}>
                    ({dataPost?.active_posts.length})
                  </span>{" "}
                </div>
              </div>
            </div>
            <div style={{ padding: "5px 10px" }}>
              <div
                className="row-manage"
                onClick={() => {
                  setActiveTab("waitingPosts");
                  setActive();
                }}
              >
                <div style={{ color: "#00B4FF" }} className="div-icon">
                  <Hourglass color="#0000ff" width="15px" height="15px" />
                </div>
                <div>
                  <FormattedMessage
                    id="waitingPosts"
                    defaultMessage="Waiting Posts"
                  />{" "}
                  <span style={{ color: "#009E7F" }}>
                    ({dataPost?.waiting_approve_posts.length})
                  </span>{" "}
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: "#F8F8F8", padding: "5px 10px" }}>
              <div
                className="row-manage"
                onClick={() => {
                  setActiveTab("drafts");
                  setActive();
                }}
              >
                <div style={{ color: "#1BC24E" }} className="div-icon">
                  <Clipboard color="gray" />
                </div>
                <div>
                  <FormattedMessage id="draftPosts" defaultMessage="Drafts" />{" "}
                  <span style={{ color: "#009E7F" }}>(0)</span>{" "}
                </div>
              </div>
            </div>
            <div style={{ padding: "5px 10px" }}>
              <div
                className="row-manage"
                onClick={() => {
                  setActiveTab("outOfDatePosts");
                  setActive();
                }}
              >
                <div style={{ color: "#F27E61" }} className="div-icon">
                  <Warning color={"#fcba03"} />
                </div>
                <div>
                  <FormattedMessage
                    id="outOfDatePosts"
                    defaultMessage="Out of date"
                  />{" "}
                  <span style={{ color: "#009E7F" }}>(0)</span>{" "}
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: "#F8F8F8", padding: "5px 10px" }}>
              <div
                className="row-manage"
                onClick={() => {
                  setActiveTab("notPassedPosts");
                  setActive();
                }}
              >
                <div style={{ color: "#009E7F" }} className="div-icon">
                  <Ban color="red" />
                </div>
                <div>
                  <FormattedMessage
                    id="notPassedPosts"
                    defaultMessage="Not PassedPosts"
                  />{" "}
                  <span style={{ color: "#009E7F" }}>(0)</span>{" "}
                </div>
              </div>
            </div>
            <div style={{ padding: "5px 10px" }}>
              <div
                className="row-manage"
                onClick={() => {
                  setActiveTab("hiddenNews");
                  setActive();
                }}
              >
                <div style={{ color: "#B7CBB7" }} className="div-icon">
                  <EyeSlash color="#949494" />
                </div>
                <div>
                  <FormattedMessage
                    id="hiddenPosts"
                    defaultMessage="Hidden Posts"
                  />{" "}
                  <span style={{ color: "#009E7F" }}>(0)</span>{" "}
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: "#F8F8F8", padding: "5px 10px" }}>
              <div
                className="row-manage"
                onClick={() => {
                  setActiveTab("seenNews");
                  setActive();
                }}
              >
                <div style={{ color: "#FF70AF" }} className="div-icon">
                  <SquareCheck color="#fb00ff" />
                </div>
                <div>
                  <FormattedMessage id="seenPosts" defaultMessage="Seen News" />{" "}
                  <span style={{ color: "#009E7F" }}>(0)</span>{" "}
                </div>
              </div>
            </div>
            <div style={{ padding: "5px 10px" }}>
              <div
                className="row-manage"
                onClick={() => {
                  setActiveTab("savedNews");
                  setActive();
                }}
              >
                <div style={{ color: "#1BC24E" }} className="div-icon">
                  <Bookmarks color="#00d9ff" />
                </div>
                <div>
                  <FormattedMessage
                    id="savedPosts"
                    defaultMessage="Saved News"
                  />
                  <span style={{ color: "#009E7F" }}>(0)</span>{" "}
                </div>
              </div>
            </div>
          </div>
        )}
      </SidebarWrapperTwo>
    </>
  );
};

export default SidebarCategory;
