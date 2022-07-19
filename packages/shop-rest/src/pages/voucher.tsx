import { Modal } from "@redq/reuse-modal";
import { CheckMark } from "assets/icons/CheckMark";
import { Hourglass } from "assets/icons/Hourglass";
import { Sold } from "assets/icons/Sold";
import { SEO } from "components/seo";
import { TabPanel } from "components/TabPanel/tabpanel";
import { ProfileProvider } from "contexts/profile/profile.provider";
import ContenHeader from "features/user-profile/contentHeader/contentHeaderVoucher";
import {
  ContainBody,
  ContentBox,
  ContentContainer,
  PageWrapper,
  TabContain,
} from "features/user-profile/user-profile.style";
import WrapVoucher from "features/wrap-card/wrap-card-voucher";
import Footer from "layouts/footer";
import { NextPage } from "next";
import Router from "next/router";
import { useState } from "react";
import { getPackage, getProfile } from "utils/api/profile";
import { getCookie } from "utils/session";
import Accordion from "components/accordion/accordion-voucher";
import { exchange, getAllVoucher, getMyVoucher } from "utils/api/voucher";
import Notice from "components/notice/notice";
import { isNull } from "util";
import WrapMy from "features/wrap-card/wrap-card-myvoucher";
import { siteMetadata } from "site-settings/site-metadata";
import React from "react";
import { getTasks } from "utils/api/tasks";

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  token: string;
  dataVoucher: any;
  service?: any;
};

const accordionData = [
  {
    id: 1,
    intlTitleId: "faqNo1Title",
    intlDetailsId: "faqNo1Desc",
    values: { number1: 7, number2: 2 },
    coin: 500,
  },
  {
    id: 2,
    intlTitleId: "faqNo2Title",
    intlDetailsId: "faqNo2Desc",
    coin: 200,
  },
  {
    id: 3,
    intlTitleId: "faqNo3Title",
    intlDetailsId: "faqNo3Desc",
    coin: 300,
  },
  {
    id: 4,
    intlTitleId: "faqNo4Title",
    intlDetailsId: "faqNo4Desc",
    coin: 500,
  },
];

const VoucherPage: NextPage<Props> = ({ token, dataVoucher }) => {
  const [activeTab, setActiveTab] = useState("allVoucher");
  const [data, setData] = useState([]);
  const [error, setError] = useState(0);
  const posting = [];

  const dataTab2 = [
    {
      key: "allVoucher",
      number: dataVoucher.allVouchers?.length || 0,
      title: "Tất cả ưu đãi",
      icon: <CheckMark width="15px" height="15px" color="green" />,
    },
    {
      key: "myVoucher",
      number: dataVoucher.myVouchers?.length || 0,
      title: "Ưu đãi của tôi",
      icon: <Hourglass color="#0000ff" width="15px" height="15px" />,
    },
    {
      key: "getPoin",
      number: dataVoucher.tasks?.length || 0,
      title: "Săn điểm",
      icon: <Sold />,
    },
  ];

  const onExchange = async (id) => {
    const result = await exchange(token, id);
    if (!result.ok) {
      setError(1);
    } else {
      setError(2);
      setActiveTab("myVoucher");
    }
    setTimeout(() => {
      setError(0);
    }, 2000);
  };
  const getProfiles = async () => {
    const data = await getProfile(token);
    setData(data);
  };

  React.useEffect(() => {
    getProfiles();
  }, [error]);
  return (
    <>
      <SEO title="voucher - 2hands" description="My voucher" />
      <ProfileProvider>
        <Modal>
          <PageWrapper className="voucher">
            <ContenHeader data={data} />
            <ContainBody className="voucher-container">
              <ContentContainer>
                <TabContain className="voucher">
                  <TabPanel
                    active={activeTab}
                    data={dataTab2}
                    onChange={(val) => {
                      setActiveTab(val);
                    }}
                  />
                </TabContain>
                <ContentBox className="voucher">
                  {activeTab === "allVoucher" ? (
                    <WrapVoucher
                      onExchange={onExchange}
                      token={token}
                      data={dataVoucher.allVouchers}
                    />
                  ) : null}

                  {activeTab === "myVoucher" ? (
                    <WrapMy token={token} data={dataVoucher.myVouchers} />
                  ) : null}
                  {activeTab === "getPoin" ? (
                    <Accordion token={token} items={dataVoucher.tasks} />
                  ) : null}
                </ContentBox>
              </ContentContainer>
            </ContainBody>
            {error == 1 ? (
              <Notice
                status={"errror"}
                content={"Không đủ điểm đổi thưởng !"}
              />
            ) : error == 2 ? (
              <Notice status={"success"} content={"Đổi thành công !"} />
            ) : null}
            <Footer />
          </PageWrapper>
        </Modal>
      </ProfileProvider>
    </>
  );
};

export async function getServerSideProps(context) {
  const token = getCookie("access_token", context);

  if (token === null) {
    // If `ctx.req` is available it means we are on the server.
    context.res.writeHead(302, { Location: "/login" });
    context.res.end();
  }

  const allVouchers = await getAllVoucher(token);
  const myVouchers = await getMyVoucher(token);
  const tasks = await getTasks(token);

  const data = {
    allVouchers: allVouchers,
    myVouchers: myVouchers,
    tasks: tasks,
  };

  return {
    props: {
      token: token,
      dataVoucher: data,
    }, // will be passed to the page component as props
  };
}

export default VoucherPage;
