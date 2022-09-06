import React from "react";
import Router from "next/router";

interface props {
  width?: number;
  height?: number;
  src: string;
  radius?: string;
  clientId?: number;
  post?: any;
  type?: any;
}

interface state {}

export class Avatar extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
  }
  on = (e) => {
    // this.props.onChange(e.target.id);
  };
  render() {
    // const { active } = this.props;
    return (
      <img
        width={this.props.width ?? 50}
        height={this.props.height ?? 50}
        src={this.props.src}
        style={{
          borderRadius: this.props.radius ?? 25,
          cursor: "pointer",
          objectFit: "cover",
        }}
        alt="avatar"
        onClick={() => {
          if (this.props.type == "post") {
            Router.push("/posts/[id]", `/posts/${this.props.post.slug}`);
          } else if (this.props.type == "user") {
            Router.push("/profile/[id]", `/profile/${this.props.clientId}`);
          }
        }}
      />
    );
  }
}
