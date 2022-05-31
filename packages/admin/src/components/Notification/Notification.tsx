import { css } from "@emotion/core";
import Button from "components/Button/Button";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Body, ClearAll, Footer, Header, Heading } from "./Notification.style";
import NotificationCard from "./NotificationCard";

export default function Notification({
  data,
  read,
  readAll,
  feedBtnClick,
  loading,
}: any) {
  const override = css`
    display: block;
    margin: 150px 150px;
    border-color: #009e7f;
  `;
  return (
    <div>
      <Header>
        <Heading>Notification</Heading>
        <ClearAll onClick={readAll}>Mark as read all</ClearAll>
      </Header>
      {data.length ? (
        <Body className="notification-wrapper">
          {data.map((item, index) => (
            <NotificationCard
              onRead={() => read(item.id)}
              key={index}
              {...item}
            />
          ))}
        </Body>
      ) : (
        <Body className="notification-wrapper">
          <ClipLoader color={"black"} loading={true} size={35} css={override} />
        </Body>
      )}

      <Footer>
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
