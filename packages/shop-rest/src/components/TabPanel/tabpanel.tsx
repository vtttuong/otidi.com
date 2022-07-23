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
  on = (key) => {
    this.props.onChange(key);
  };
  render() {
    const { data, active } = this.props;

    return (
      <ul
        // onClick={this.on}
        style={{ width: "100%", overflow: "auto" }}
        className="tab-panel tab-profile tab-voucher"
        id="myTab"
        role="tablist"
      >
        {data.map((item) => (
          <li
            key={item.key}
            id={item.key.toString()}
            style={{
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.2s",
              height: "100%",
              flex: 1,
            }}
            role="presentation"
            onClick={() => this.on(item.key.toString())}
          >
            <div
              className={
                active && active === item.key
                  ? "tabpanel-item-active"
                  : "tabpanel-item"
              }
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
