import React from "react";
import { FormattedMessage } from "react-intl";

interface props {
  active: string;
  onChange: (val: string) => void;
}

export class Tabs extends React.Component<props> {
  constructor(props: props) {
    super(props);
  }
  on = (e) => {
    this.props.onChange(e.target.id);
  };
  render() {
    const { active } = this.props;

    return (
      <ul
        onClick={this.on}
        style={{ width: "100%", height: 50 }}
        className="nav nav-tabs"
        id="myTab"
        role="tablist"
      >
        <li
          key={"1"}
          style={{ width: "34%", textAlign: "center" }}
          className="nav-item"
          role="presentation"
        >
          <a
            style={{
              height: "50px",
              paddingTop: 15,
              fontWeight: 800,
              display: "flex",
              justifyContent: "center",
            }}
            className={`nav-link ${active === "all" ? "active" : ""}`}
            id="all"
            data-toggle="tab"
            href="#all"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            <FormattedMessage id="all" defaultMessage="All" />
          </a>
        </li>
        <li
          key={"2"}
          style={{ width: "33%", textAlign: "center" }}
          className="nav-item"
          role="presentation"
        >
          <a
            style={{
              height: "50px",
              paddingTop: 15,
              fontWeight: 800,
              display: "flex",
              justifyContent: "center",
            }}
            className={`nav-link ${active === "buy" ? "active" : ""}`}
            id="buy"
            data-toggle="tab"
            href="#buy"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            <FormattedMessage id="buy" defaultMessage="Buy" />
          </a>
        </li>
        <li
          key={"3"}
          style={{ width: "33%", textAlign: "center" }}
          className="nav-item"
          role="presentation"
        >
          <a
            style={{
              height: "50px",
              paddingTop: 15,
              fontWeight: 800,
              display: "flex",
              justifyContent: "center",
            }}
            className={`nav-link ${active === "sell" ? "active" : ""}`}
            id="sell"
            data-toggle="tab"
            href="#sell"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
          >
            <FormattedMessage id="sell" defaultMessage="Sell" />
          </a>
        </li>
      </ul>
    );
  }
}
