import React, { ReactElement, CSSProperties, ReactText } from "react";
import { FormattedMessage } from "react-intl";

interface props {
  data: {
    key: number | string | ReactText;
    title: string;
    icon: JSX.Element;
    number?: number;
  }[];
  active: string;
  onChange: (val: string) => void;
}

interface state {}

export class TabPanel extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
  }
  on = (e) => {
    this.props.onChange(e.target.id);
  };
  render() {
    const { data, active } = this.props;
    return (
      <ul
        // onClick={this.on}
        style={{ width: "100%" }}
        className="tab-panel tab-profile tab-voucher"
        id="myTab"
        role="tablist"
      >
        {data.map((item) => (
          <li
            key={item.key}
            style={{
              textAlign: "center",
            }}
            role="presentation"
          >
            <div
              className={
                active && active === item.key
                  ? "tabpanel-item-active"
                  : "tabpanel-item"
              }
              id={item.key.toString()}
              onClick={this.on}
              data-toggle="tab"
              ref="#home"
              role="tab"
              aria-controls="home"
              aria-selected="true"
              style={{
                textDecoration: "none",
              }}
            >
              {item.icon ? item.icon : null}{" "}
              <FormattedMessage id={item.key} defaultMessage="All" />
              <span>
                {"  "}({item.number})
              </span>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}
