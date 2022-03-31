import { Grid } from "components/FlexBox/FlexBox";
import PostByCats from "feature/dashboard-postByCats";
import PostByYear from "feature/dashboard-postByYear";
import PostClassifyByYear from "feature/dashboard-postClassifyByYear";
import PostsDay from "feature/dashboard-postDay";
import RevenueDay from "feature/dashboard-revenueDay";
import RevenueYear from "feature/dashboard-revenueYear";
import UserPhase from "feature/dashboard-userPhase";
import UserTop from "feature/dashboard-userTop";
import UserYear from "feature/dashboard-userYear";
import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import stylede from "styled-components";

const AllTab = stylede.div`
  width: 100%;
  height: auto;
  .tab-all{
      div.select-cat{
     height:44px;
     >div{
      >div{

        height:44px
      }
     }
    position: relative;
    margin-left:10px;
     
  }
  div.select-year{
     height:44px;
    >div{
      margin-left:20px;
      // margin-top: -5px;
      >.react-daterange-picker {
        height: 44px;
        background: #eeeeee; 
        padding: 0 5px;
        font-family: lato;
        font-weight: 600;
        font-size: 14.5px;
        color: #20286f; 
        input{
           color: #20286f; 
        }
        >div{
          border:0
        }
      }
    }
    
  }
    div.select-cats{
    position: absolute;
    height:44px;
    top: 22px;
    left:10px;
    >div{
      >.react-daterange-picker {
         height: 44px;
        background: #eeeeee; 
        padding: 0 5px;
        font-family: lato;
        font-weight: 600;
        font-size: 14.5px;
        color: #20286f; 
        input{
           color: #20286f; 
        }
        >div{
          border:0
        }
      }
    }
  }
     div.style-select-absolute{
     
       position:relative;
       .style-select-absolute-child{
            position: absolute;
            top: 15px;
            right: 30px;
            z-index: 1;
            min-width: 200px;

           
       }
         .style-select-absolute-child2{
            position: absolute;
            top: 15px;
            left: unset;
            right: 15px;
            z-index: 100;
            min-width: 200px;

       }
      }
    >ul{
      border-bottom: 1px solid rgb(0, 197, 141);
      >li{
        color: rgb(22, 31, 106);
        font-weight: 600;
      }
      >.react-tabs__tab--selected{
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
            <Tab>Users</Tab>
          </TabList>

          <TabPanel>
            {/* <RevenueTotal/> */}
            <RevenueYear />
            <RevenueDay />
            {/* <RevenueCats/> */}
          </TabPanel>

          <TabPanel>
            <PostByYear year={year} setYear={setYear} />
            <PostClassifyByYear year={year} setYear={setYear} />
            <PostsDay />
            <PostByCats />
          </TabPanel>

          <TabPanel>
            <UserYear />
            <UserPhase />
            <UserTop />
          </TabPanel>
        </Tabs>
      </AllTab>
    </Grid>
  );
};

export default Dashboard;
