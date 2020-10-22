import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/shadingCard.css'
const MainChart = ({ scrollTop }) => {
  const [currentScrollClass, setCurrentScrollClass] = useState(['toHide', 'toHide'])
  let documentHeight = document.body.clientHeight;
  useEffect(() => {
    switch(true){
      case(scrollTop>documentHeight/10*1.6):
        setCurrentScrollClass(['toShow','toShow']);

        break;
      case(scrollTop>documentHeight/10*0.5):
        setCurrentScrollClass(['toShow','toHide']);
        break;
      default:
        setCurrentScrollClass(['toHide','toHide']);
        break;
    };
  }, [scrollTop, documentHeight])
  return(
    <div id='data'>
    <div className={currentScrollClass[0]}>
    <div className='navbarRoom'></div>
    <Row>
      <Col>
      <h2>图表使用echarts~</h2>
      <p>采集到的两方面数据存储及可视化。</p>
      <p>电力包括各时间尺度用电量、功率因数、变电站位置。
      公交包括车站位置、班次、充电桩、车型及相关参数等</p>
      </Col>
    </Row>
    </div>
    <div className={currentScrollClass[1]}>
    <Row>
      <Col md={1}></Col>
      <Col className="shadingCard" md={5}>
          <div id="circle"></div>
          <h2>电力</h2>
          <p>某区域内一定时间内用电负荷状态数据展示及分析。</p>
          <div className="content">
            <Link to="/data/power">电力</Link>
          </div>
      </Col>
      <Col className="shadingCard" md={5}>
          <div id="triangle"></div>
          <h2>公交</h2>
          <p>某区域内公交线路分布及班次安排，配套EV信息。</p>
          <div className="content">
            <Link to="/data/transportation">公交</Link>
          </div>
      </Col>
      <Col md={1}></Col>


    </Row>

    </div>
    </div>


  )
};

export default MainChart;