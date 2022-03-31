import { Avatar } from "components/avatar/avatar";
import React, { ReactElement, CSSProperties } from "react";
import { FormattedMessage } from "react-intl";
import { CircleFill } from "assets/icons/CircleFill";
import { formatRelativeTime } from "utils/formatRelativeTime";

interface props {
  isOnline?: boolean;
  //   onChange: (val: string) => void;
  active?: boolean;
  onChange: (val: number) => void;
  onClick?: (val: number) => void;
  selected: string;
  uuid: string;
  lastSeenAt?: any;
  user: any;
  post: any;
  createdAt: string;
}

export class MessageItem extends React.Component<props> {
  constructor(props: props) {
    super(props);
  }
  on = (uuid) => {
    this.props.onChange(uuid);
    this.props.onClick(uuid);
  };

  render() {
    const { lastSeenAt, selected, uuid, user, post, createdAt } = this.props;
    const relativeTime = formatRelativeTime(createdAt);

    return (
      <div
        onClick={() => this.on(uuid)}
        className={`wrap-item ${selected === uuid ? "selected-item" : ""}`}
      >
        <div className="left">
          <div className="avatar-left">
            <Avatar radius="25px" src={user.avatar_img_url} />

            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 5,
                display: "flex",
              }}
            >
              {lastSeenAt ? null : (
                <CircleFill
                  style={{ fontSize: 14, color: "#008000" }}
                  width={14}
                />
              )}
            </div>
          </div>
          <div className="wrap-middle-item">
            <div className="name">
              <p>{user.name} </p>
              <span
                style={{
                  fontWeight: 400,
                  fontSize: 13,
                  position: "absolute",
                  right: 15,
                  top: 1,
                }}
              >
                {relativeTime.time}
                <FormattedMessage id={relativeTime.unit} />
              </span>
            </div>
            <div className="title text-ellipsis">{post.title}</div>
          </div>
        </div>

        <div className="avatar-right">
          <Avatar radius="5px" src={post.main_img_url} />
        </div>
      </div>
    );
  }
}
