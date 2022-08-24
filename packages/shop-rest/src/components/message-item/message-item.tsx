import { Avatar } from "components/avatar/avatar";
import React, { ReactElement, CSSProperties } from "react";
import { FormattedMessage } from "react-intl";
import { CircleFill } from "assets/icons/CircleFill";
import { formatRelativeTime } from "utils/formatRelativeTime";
import { AVATAR_PLACEHOLDER } from "utils/constant";

interface props {
  isOnline?: boolean;
  //   onChange: (val: string) => void;
  active?: boolean;
  onChange: (val: number) => void;
  onClick?: (val: number) => void;
  selected: number;
  id: number;
  lastMessageAt?: any;
  user: any;
  post: any;
  createdAt: string;
}

export class MessageItem extends React.Component<props> {
  constructor(props: props) {
    super(props);
  }
  on = (id) => {
    this.props.onChange(id);
    this.props.onClick(id);
  };

  render() {
    const { lastMessageAt, selected, id, user, post, createdAt } = this.props;
    const relativeTime = formatRelativeTime(lastMessageAt);

    return (
      <div
        onClick={() => this.on(id)}
        className={`wrap-item ${selected == id ? "selected-item" : ""}`}
      >
        <div className="left">
          <div className="avatar-left">
            <Avatar radius="25px" src={user.avatar || AVATAR_PLACEHOLDER} />

            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 5,
                display: "flex",
              }}
            >
              {lastMessageAt ? null : (
                <CircleFill
                  style={{ fontSize: 14, color: "#008000" }}
                  width={14}
                />
              )}
            </div>
          </div>
          <div className="wrap-middle-item">
            <div className="name">
              <p className="username">{user.name} </p>
              <p className="time">
                {relativeTime.time}
                <FormattedMessage id={relativeTime.unit} />
              </p>
            </div>
            {/* <div className="title text-ellipsis">{post.name}</div> */}
          </div>
        </div>

        <div className="avatar-right">
          <Avatar radius="5px" src={post.main_image_url} />
        </div>
      </div>
    );
  }
}
