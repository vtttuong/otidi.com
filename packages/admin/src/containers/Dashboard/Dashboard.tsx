import { Grid } from "components/FlexBox/FlexBox";
import AdvertiseYear from "feature/dashboard-advertiseYear";
import PostByYear from "feature/dashboard-postByYear";
import RevenueTotal from "feature/dashboard-revenueTotal";
import RevenueYear from "feature/dashboard-revenueYear";
import RevenueDay from "feature/dashboard-revenueDay";
import PostDay from "feature/dashboard-postDay";

import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import styled from "styled-components";

import AdvertiseDay from "feature/dashboard-advertiseDay";

const AllTab = styled.div`
  width: 100%;
  height: auto;
  .tab-all {
    div.select-cat {
      height: 44px;
      > div {
        > div {
          height: 44px;
        }
      }
      position: relative;
      margin-left: 10px;
    }
    div.select-year {
      height: 44px;
      > div {
        margin-left: 20px;
        // margin-top: -5px;
        > .react-daterange-picker {
          height: 44px;
          background: #eeeeee;
          padding: 0 5px;
          font-family: lato;
          font-weight: 600;
          font-size: 14.5px;
          color: #20286f;
          input {
            color: #20286f;
          }
          > div {
            border: 0;
          }
        }
      }
    }
    div.select-cats {
      position: absolute;
      height: 44px;
      top: 22px;
      left: 10px;
      > div {
        > .react-daterange-picker {
          height: 44px;
          background: #eeeeee;
          padding: 0 5px;
          font-family: lato;
          font-weight: 600;
          font-size: 14.5px;
          color: #20286f;
          input {
            color: #20286f;
          }
          > div {
            border: 0;
          }
        }
      }
    }
    div.style-select-absolute {
      position: relative;
      .style-select-absolute-child {
        position: absolute;
        top: 15px;
        right: 30px;
        z-index: 1;
        min-width: 200px;
      }
      .style-select-absolute-child2 {
        position: absolute;
        top: 15px;
        left: unset;
        right: 15px;
        z-index: 100;
        min-width: 200px;
      }
    }
    > ul {
      border-bottom: 1px solid rgb(0, 197, 141);
      > li {
        color: rgb(22, 31, 106);
        font-weight: 600;
      }
      > .react-tabs__tab--selected {
        border-color: rgb(0, 197, 141);
      }
    }
  }
`;

const Dashboard = () => {
  const [year, setYear] = useState(2020);

  return (
    <Grid fluid={true}>
      <AllTab className="3-tab">
        <Tabs className="tab-all">
          <TabList>
            <Tab>Revenue</Tab>
            <Tab>Posts</Tab>
            <Tab>Advertise</Tab>
          </TabList>

          <TabPanel>
            <RevenueTotal />
            <RevenueYear />
            <RevenueDay />
          </TabPanel>

          <TabPanel>
            <PostByYear />
            <PostDay />
          </TabPanel>

          <TabPanel>
            <AdvertiseYear />
            <AdvertiseDay />
          </TabPanel>
        </Tabs>
      </AllTab>
    </Grid>
  );
};

export default Dashboard;
