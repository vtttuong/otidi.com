import { Box, BoxContent, BoxTitle, BoxTitleWrapper } from 'components/Box/Box';
import Chart from 'components/Charts/Chart';
import { Col } from 'components/FlexBox/FlexBox';
import Select from 'components/Select/Select';
import React from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

const LineChart = ({
  widgetTitle,
  series,
  color,
  categories,
  seriesName = '',
  dateRange,
  onChangeDateRange,
  categoryOption,
  onChangeCategory,
  postStatistics
}: any) => {
  const options = {
    options: {
      chart: {
        type: 'line',
        dropShadow: {
          enabled: true,
          color: color,
          top: 18,
          left: 0,
          blur: 3.5,
          opacity: 0.15,
        },
        toolbar: {
          show: false,
        },
      },
      stroke: {
        width: 7,
        curve: 'smooth',
      },
      xaxis: {
        categories: categories,
        labels: {
          show: true,
        },
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          show: true,
          width: 5,
          tickWidth: 0,
          position: 'back',
          opacity: 1,
          stroke: {
            color: '#b6b6b6',
            width: 0,
            dashArray: 0,
          },
          fill: {
            type: 'solid',
            color: '#F2F3FC',
          },
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
          style: {
            color: '#161F6A',
            fontSize: '14px',
            fontFamily: "'Lato', sans-serif",
          },
        },
      },
      grid: {
        borderColor: '#F7F7F7',
      },
      colors: color,
      markers: {
        size: 0,
        opacity: 1,
        colors: color,
        strokeColor: '#fff',
        strokeWidth: 4,
        hover: {
          size: 8,
        },
      },
    },
    series: [
      {
        name: seriesName,
        data: series,
      },
    ],
  };
  
  const categorySelectOptions = [
    { value: 'vehicle', label: 'Vehicle' },
    { value: 'electronic', label: 'Electronic' },
    { value: 'technology', label: 'Technology' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'sport_relax', label: 'Sport & relax' },
    { value: 'office', label: 'Office' },
    { value: 'others', label: 'Others' },
  ];

  return (
    <Box>
      <BoxTitleWrapper>
        <BoxTitle title={widgetTitle} />

        {
          postStatistics ? (
            <Col md={3} lg={3} className="select-cat">
              <Select
                options={categorySelectOptions}
                labelKey="label"
                valueKey="value"
                placeholder="Category"
                value={categoryOption}
                searchable={false}
                onChange={onChangeCategory}
              />
            </Col>
          ) : (
            null
          )
        }
        
        <Col md={5} className="select-year">
          <div>
            <DateRangePicker
              onChange={onChangeDateRange}
              value={dateRange}
            />
          </div>
        </Col>
      </BoxTitleWrapper>

      <BoxContent style={{ display: 'block' }}>
        <Chart
          type={"area"}
          options={options.options}
          series={options.series}
          height="350"
          width="97%"
        />
      </BoxContent>
    </Box>
  );
};

export default LineChart;
