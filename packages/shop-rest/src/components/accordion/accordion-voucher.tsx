import { CoinIcon } from "assets/icons/CoinIcon";
import Image from "components/image/image";
import Spinner from "components/spinner";
import { useRouter } from "next/router";
import Collapse, { Panel } from "rc-collapse";
import React from "react";
import { FormattedMessage } from "react-intl";
import { getTasks } from "utils/api/tasks";
import AccordionWrapper from "./accordion.style";

type AccordionProps = {
  router?: any;
  className?: string;
  items: any[];
  id?: number;
  handleCategorySelection?: any;
  token?: string;
};

function expandIcon({ isActive }) {
  return (
    <i style={{ marginTop: -5 }}>
      {isActive ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="1.494"
          viewBox="0 0 12 1.494"
        >
          <path
            data-name="_ionicons_svg_ios-remove (4)"
            d="M138.753,240H128.247a.747.747,0,0,0,0,1.494h10.506a.747.747,0,1,0,0-1.494Z"
            transform="translate(-127.5 -240)"
            fill="currentColor"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
        >
          <path
            data-name="_ionicons_svg_ios-add (7)"
            d="M138.753,132.753h-4.506v-4.506a.747.747,0,1,0-1.494,0v4.506h-4.506a.747.747,0,0,0,0,1.494h4.506v4.506a.747.747,0,1,0,1.494,0v-4.506h4.506a.747.747,0,1,0,0-1.494Z"
            transform="translate(-127.5 -127.5)"
            fill="currentColor"
          />
        </svg>
      )}
    </i>
  );
}

const Accordion: React.FC<AccordionProps> = ({
  className,
  items = [],
  token,
}) => {
  const router = useRouter();

  return (
    <AccordionWrapper>
      <Collapse
        accordion={true}
        className={`accordion ${className}`.trim()}
        defaultActiveKey="active"
        expandIcon={expandIcon}
      >
        {items ? (
          items.length !== 0 &&
          items.map((item) => {
            return (
              <Panel
                header={
                  <div
                    style={{
                      width: "110%",
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 7,
                    }}
                  >
                    <div className="get-poin-box">
                      <CoinIcon width="17px" height="17px" />
                      <h4 style={{ marginLeft: "10px" }}>
                        <FormattedMessage id={item.type} />
                      </h4>
                    </div>
                  </div>
                }
                headerClass="accordion-title"
                key={item.id}
              >
                <p key={item.id}>{item.description}</p>
                {/* <b>{"Áp dụng " + item.max_number_excute + " lần / "}</b> */}
                <b>
                  <FormattedMessage
                    id="taskApplyText"
                    values={{ value: item.max_number_excute }}
                    defaultMessage="Apply {value} times"
                  />
                  {" / "}
                </b>
                <b>
                  <FormattedMessage id={item.per_unit} />
                </b>
                {/* <br /> */}
                <p style={{ position: "relative" }}>
                  <span style={{ color: "#009e7f", display: "block" }}>
                    {" + "}
                    {item.reward_point}
                  </span>
                  <span
                    style={{
                      // position: "absolute",
                      color: "#fff",
                      display: "block",
                      minWidth: 80,
                      fontSize: 13,
                      background: "#009e7f",
                      borderRadius: 5,
                      textAlign: "center",
                      marginTop: "20px",
                      cursor: "pointer",
                      // top: 30,
                      // left: -5,
                      padding: 2,
                    }}
                    onClick={() => router.push(item.redirect_link || "/")}
                  >
                    <FormattedMessage id="discover" defaultMessage="Discover" />
                  </span>
                </p>
              </Panel>
            );
          })
        ) : (
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "20vh",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spinner />
          </div>
        )}
      </Collapse>
    </AccordionWrapper>
  );
};

export default Accordion;
