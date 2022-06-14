import { css } from "@emotion/core";
import Button from "components/Button/Button";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import NoItem from "./NoItem";
import { Body, ClearAll, Footer, Header, Heading } from "./Notification.style";
import NotificationCard from "./NotificationCard";

export default function Notification({
  data,
  read,
  unread,
  readAll,
  feedBtnClick,
  loading,
}: any) {
  const override = css`
    display: block;
    margin: 150px 150px;
    border-color: #009e7f;
  `;

  const isNoItem = data && data.length === 0;

  return (
    <div>
      <Header>
        <Heading>Notification</Heading>
        <ClearAll style={isNoItem ? { display: "none" } : {}} onClick={readAll}>
          Mark as read all
        </ClearAll>
      </Header>
      {data ? (
        data.length ? (
          <Body className="notification-wrapper">
            {data.map((item, index) => (
              <NotificationCard
                onRead={() => read(item.id)}
                onUnread={() => unread(item.id)}
                key={index}
                {...item}
              />
            ))}
          </Body>
        ) : (
          <NoItem />
        )
      ) : (
        <Body className="notification-wrapper">
          <ClipLoader color={"black"} loading={true} size={35} css={override} />
        </Body>
      )}

      <Footer style={isNoItem ? { display: "none" } : {}}>
        <Button
          variant="primary"
          size="big"
          style={{
            fontWeight: 600,
            width: "100%",
            background: "#fff",
            color: "#009e7f",
          }}
          onClick={feedBtnClick}
          isLoading={loading}
        >
          More Feeds
        </Button>
      </Footer>
    </div>
  );
}
