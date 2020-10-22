import React, { useState } from 'react';

import { Menu } from 'semantic-ui-react';
import { Row, Col } from 'react-bootstrap';
import ReactEcharts from 'echarts-for-react';


let linesOption = {
    title: {
        text: '折线图堆叠'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
};

const PowerCharts = () => {
  const [activeItem, setActiveItem] = useState('电站分布');

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <div className='powerPage'>
      <Menu pointing secondary vertical>
        <Menu.Item
          name='电站分布'
          active={activeItem === '电站分布'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='变电站负荷'
          active={activeItem === '变电站负荷'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='有序充电'
          active={activeItem === '有序充电'}
          onClick={handleItemClick}
        />
      </Menu>
      {activeItem==='电站分布'?
      (<div className='powerCharts'>
        <Row>
          <Col>
          <ReactEcharts
            option={linesOption}
            style={{height:'220px',width:'100%'}}
          ></ReactEcharts>   
          </Col>
          <Col>
          <ReactEcharts
            option={linesOption}
            style={{height:'220px',width:'100%'}}
          ></ReactEcharts>   
          </Col>
        </Row>
        <Row>
          <Col>
          <ReactEcharts
            option={linesOption}
            style={{height:'220px',width:'100%'}}
          ></ReactEcharts>   
          </Col>
          <Col>
          <ReactEcharts
            option={linesOption}
            style={{height:'220px',width:'100%'}}
          ></ReactEcharts>   
          </Col>
        </Row>

      </div>):
      activeItem==='变电站负荷'?
      (<div className='powerCharts'>
      <ReactEcharts
        option={linesOption}
        style={{height:'220px',width:'100%'}}
      ></ReactEcharts>
    </div>):
      (<div></div>)
}
    </div>
  )
}



export default PowerCharts;
