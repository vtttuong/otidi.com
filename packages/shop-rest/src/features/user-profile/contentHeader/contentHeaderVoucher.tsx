import { UserAvatar } from "assets/icons/UserAvatar";
import Image from "components/image/image";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Col, ContentHeaderWrapper, Row } from "./contentHeader.style";

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  data: any;
  profileOther?: boolean;
  onRate?: any;
  onFollow?: any;
  token?: string;
  userId?: number;
  onChangeFollow?: (type: string) => void;
};

const ContenHeader: React.FC<Props> = ({ data }) => {
  return (
    <>
      <ContentHeaderWrapper className="voucher">
        <Row className="header-voucher">
          <Col className="col" xs={8}>
            <div style={{ padding: "15px 0px 15px 15px" }}>
              <div style={{ display: "flex" }}>
                <div>
                  <img
                    style={{
                      width: 70,
                      height: 70,
                      objectFit: "cover",
                    }}
                    src={data.avatar_img_url}
                    alt="img"
                  />
                </div>
                <div style={{ marginLeft: 10 }}>
                  <div
                    style={{
                      color: "#009E7F",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    {data.name}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "#656565",
                      marginTop: 5,
                      fontWeight: 700,
                    }}
                  >
                    {data.email}
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col xs={4} className="col">
            <div
              className="wrap-middle-header"
              style={{ justifyContent: "center" }}
            >
              <div className="wrap-header" style={{ cursor: "pointer" }}>
                <div className="coin-icon" style={{ color: "rgb(228 168 16)" }}>
                  <Image
                    url={
                      "https://www.flaticon.com/svg/static/icons/svg/550/550638.svg"
                    }
                    alt="coin"
                  />
                  <b style={{ fontSize: 16 }}>{data.cumulative_points}</b>
                </div>
                <div className="content-like">
                  <p
                    style={{ fontSize: 14, marginTop: 3, textAlign: "center" }}
                  >
                    <FormattedMessage id="score" defaultMessage="coin" />
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </ContentHeaderWrapper>
    </>
  );
};

export default ContenHeader;
