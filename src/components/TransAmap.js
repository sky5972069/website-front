import React, { useState } from 'react';
import { Map, Markers } from 'react-amap';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { Card, Feed } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as yup from 'yup';

const addStationSchema = yup.object({
  longitude: yup.number().required(),
  latitude: yup.number().required(),
  capacity: yup.number().required(),
});

const stationMark = require('../img/station.png');


const TransAmap = () => {
  const[markers, setMarkers] = useState([{position:{longitude: 121.7, latitude: 31.1}}, {position:{longitude: 121.75, latitude: 30.9}}]);
  const plugins = [
    'MapType',
    'Scale',
    'OverView',
    // 'ControlBar', // v1.1.0 新增
    {
      name: 'ControlBar',
      options: {
        position:{
          bottom:'0px',
          right:'0px',
        }
      },
    },
    {
      name: 'ToolBar',
      options: {
        liteStyle: false,
        position:{
          top:'10px',
          left: '-10px',
        }
      },
    }
  ];
  const loadingStyle = {
    position: 'relative',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };
  const Loading = <div style={loadingStyle}>Loading Map...</div>;
  const addStation = (values) => {
    let newMarker = {position: {longitude: values.longitude, latitude: values.latitude}};
    setMarkers([...markers, newMarker]);
  };

  const renderMarkerLayout = () => {
    return <div className='markerIcon'></div>
  }

  const MarkerImg = () => (
    <img id='stationMark' alt='stationMark' src={stationMark} onMouseOver={(e)=>{e.target.style.cursor='pointer'}}
    onMouseDown ={mousedown} width="40px" height="40px"/>
  )

  function enterDroppable(elem) {
    elem.style.boxShadow = '0px 0px 5px #bbbbbb';
  }

  function leaveDroppable(elem) {
    elem.style.boxShadow = '';
  }


  const mousedown = function(event) {
    // (1) 准备移动：确保 absolute，并通过设置 z-index 以确保球在顶部
    console.log(1);
    let currentDroppable = null;
    // 将其从当前父元素中直接移动到 body 中
    // 以使其定位是相对于 body 的
    
    const newMarker = document.createElement('img');
    newMarker.src=stationMark;
    newMarker.onMouseOver=((e)=>{e.target.style.cursor='pointer'});
    newMarker.style.width='40px';
    newMarker.style.height = '40px';
    document.body.append(newMarker);
    newMarker.style.position = 'absolute';
    newMarker.style.zIndex = 1000;
    newMarker.style.cursor = 'pointer';
    console.log(newMarker);
    console.log(newMarker.offsetWidth);
    console.log(event.pageX);
    // 现在球的中心在 (pageX, pageY) 坐标上
    function moveAt(pageX, pageY) {
      newMarker.style.left = pageX - newMarker.offsetWidth / 2 + 'px';
      newMarker.style.top = pageY - newMarker.offsetHeight / 2 + 'px';
    }
  
    // 将我们绝对定位的球移到指针下方
    moveAt(event.pageX, event.pageY);
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    
      newMarker.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      newMarker.hidden = false;
    
      // mousemove 事件可能会在窗口外被触发（当球被拖出屏幕时）
      // 如果 clientX/clientY 在窗口外，那么 elementfromPoint 会返回 null
      if (!elemBelow) return;
    
      // 潜在的 droppable 的元素被使用 "droppable" 类进行标记（也可以是其他逻辑）
      let droppableBelow = elemBelow.closest('.droppable');
    
      if (currentDroppable !== droppableBelow) {
        // 我们正在飞入或飞出...
        // 注意：它们两个的值都可能为 null
        //   currentDroppable=null —— 如果我们在此事件之前，鼠标指针不是在一个 droppable 的元素上（例如空白处）
        //   droppableBelow=null —— 如果现在，在当前事件中，我们的鼠标指针不是在一个 droppable 的元素上
    
        if (currentDroppable) {
          // 处理“飞出” droppable 的元素时的处理逻辑（移除高亮）
          leaveDroppable(currentDroppable);
        }
        currentDroppable = droppableBelow;
        if (currentDroppable) {
          // 处理“飞入” droppable 的元素时的逻辑
          enterDroppable(currentDroppable);
        }
      }
    }
  
    // (2) 在 mousemove 事件上移动球
    document.addEventListener('mousemove', onMouseMove);
  
    // (3) 放下球，并移除不需要的处理程序
    newMarker.onmouseup = function(event) {
      document.removeEventListener('mousemove', onMouseMove);
      newMarker.hidden = true;
      let dropBelow = document.elementFromPoint(event.clientX, event.clientY).closest('.droppable');
      newMarker.hidden = false;
      if (dropBelow) {
        leaveDroppable(dropBelow)
      } else {
        newMarker.remove();
      }

      newMarker.onmouseup = null;
    };
    newMarker.ondragstart = function() {
      return false;
    }
  };


  return (
    <div className='amap'>
        <Card className='amapCard'>
          <Card.Content className='amapCardTitle'>
            <Card.Header>添加站点</Card.Header>
          </Card.Content>
          <Card.Content>
            <Feed>
              <Feed.Event>
                <Feed.Label id='markerLabel'>
                  <MarkerImg />
                </Feed.Label>
                <Feed.Content>
                  <Feed.Date content='1 day ago' />
                    <Formik
                      validationSchema={addStationSchema}
                      onSubmit={addStation}
                      initialValues={{
                        longitude: 121.6,
                        latitude: 31,
                        capacity: 10,
                      }}
                    >
                      {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        isValid,
                        errors,
                      }) => (
                      <Form noValidate onSubmit={handleSubmit} className='amapForm'>
                        <Form.Label column className='amapCardLabel'>经度</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type="float"
                            placeholder="..."
                            name="longitude"
                            value={values.longitude}
                            onChange={handleChange}
                            isInvalid={!!errors.longitude}
                          />
                          <Form.Control.Feedback type='invalid' tooltip>{errors.longitude}</Form.Control.Feedback>
                        </InputGroup>
                        <Form.Label column className='amapCardLabel'>纬度</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type="float"
                            placeholder="..."
                            name="latitude"
                            value={values.latitude}
                            onChange={handleChange}
                            isInvalid={!!errors.latitude}
                          />
                          <Form.Control.Feedback type='invalid' tooltip>{errors.latitude}</Form.Control.Feedback>
                        </InputGroup>
                        <Form.Label column className='amapCardLabel'>容量</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type="float"
                            placeholder="..."
                            name="capacity"
                            value={values.capacity}
                            onChange={handleChange}
                            isInvalid={!!errors.capacity}
                          />
                          <Form.Control.Feedback type='invalid' tooltip>{errors.capacity}</Form.Control.Feedback>
                        </InputGroup>
                        <Button type='submit'>添加</Button>
                      </Form>)}
                    </Formik>
                  
                </Feed.Content>
              </Feed.Event>
            </Feed>
          </Card.Content>
        </Card>
      <div id='gaodeMap' className='droppable' style={{width: '950px', height: '530px'}}>
        <Map amapkey='53afe5f7906c4ed3a53b25273f29cd59' plugins={plugins} loading={Loading}
          zoom={15}>
            <Markers
             markers={markers}
             render={renderMarkerLayout} />
          </Map>
      </div>
      {/* <p>Icons made by <a href="https://www.flaticon.com/free-icon/gas-station_1397882?term=station&page=4&position=61" title="turkkub">turkkub</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></p> */}
    </div>
    );
}

export default TransAmap;
