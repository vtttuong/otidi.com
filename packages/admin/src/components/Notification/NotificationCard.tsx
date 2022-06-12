import React from "react";
import {
  ButtonRead,
  Details,
  Dot,
  Message,
  Time,
  Title,
  TitleWrapper,
} from "./Notification.style";

export default function NotificationCard({
  id,
  title,
  time,
  unit,
  message,
  readAt,
  onRead,
  onUnread,
}) {
  const [read_at, setRead] = React.useState("");
  React.useEffect(() => {
    setRead(readAt);
  }, [readAt]);

  return (
    <Message className={!read_at ? "unread" : ""}>
      <TitleWrapper>
        <Title>{title}</Title>
        <Dot />
        <Time>{time + " " + unit}</Time>
      </TitleWrapper>
      <Details>{message}</Details>
      {!read_at ? (
        <ButtonRead
          onClick={() => {
            onRead(id);
            setRead("now");
          }}
        >
          Mark read
        </ButtonRead>
      ) : (
        <ButtonRead
          onClick={() => {
            onUnread(id);
            setRead(null);
          }}
        >
          Unread
        </ButtonRead>
      )}
    </Message>
  );
}
