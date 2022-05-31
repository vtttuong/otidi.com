import { useStyletron, withStyle } from 'baseui';
import { Col as Column, Row } from 'components/FlexBox/FlexBox';
import GradiantGraphChart from 'components/Widgets/GradiantGraphChart/GradiantGraphChart';
import MapWidget from 'components/Widgets/MapWidget/MapWidget';
import React from 'react';
import DateRanges from 'components/DateRange';

const urlServer = process.env.REACT_APP_LARAVEL_API_URL + "/storage/";
  const Col = withStyle(Column, () => ({
    '@media only screen and (max-width: 574px)': {
      marginBottom: '30px',

      ':last-child': {
      marginBottom: 0,
    },
  },
}));


const RevenueCats = () => {
  const [css] = useStyletron();
  const mb30 = css({
    '@media only screen and (max-width: 990px)': {
      marginBottom: '16px',
    },
  });

  

  return (
     <Row>
        <Col md={5} lg={4}>
          <GradiantGraphChart
            colors={['#03D3B5']}
            series={[25, 30, 14, 30, 55, 60, 48]}
            labels={[
              '2019-05-12',
              '2019-05-13',
              '2019-05-14',
              '2019-05-15',
              '2019-05-16',
              '2019-05-17',
              '2019-05-18',
            ]}
            topRowTitle="Performance"
            bottomRowData={[
              {
                label: 'Last Week Profit',
                valueText: '+29.7%',
                value: 29.7,
                color: '#03D3B5',
              },
              {
                label: 'This Week Losses',
                valueText: '-53.4%',
                value: 53.4,
                color: '#FC747A',
              },
            ]}
          />
        </Col>

      <Col md={7} lg={8}  className="style-select-absolute">
         <Col className="style-select-absolute-child2 select-cats">
          <DateRanges/>
          </Col>
          <MapWidget
            data={[
              {
                name: 'Vehical',
                value: 69922,
                color: '#2170FF',
              },
              {
                name: 'Techology',
                value: 41953,
                color: '#29CAE4',
              },
              {
                name: 'Fashion',
                value: 23307,
                color: '#666D92',
              },
              {
                name: 'Food',
                value: 20200,
                color: '#03D3B5',
              },
            ]}
            totalText="Total Reneue"
          />
        </Col>
      </Row>

      
  );
};

export default RevenueCats;
