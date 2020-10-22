import React, { useEffect, useState } from 'react';
import { Card, Row, Col} from 'react-bootstrap';
import '../css/slider.css';
const yedouBg = require("../img/yedou3.png");
const dateBg = require("../img/date.jpg");
const blackremuBg = require("../img/blackremu.jpg");
const hugBg = require("../img/g.jpg");
const aisiBg = require("../img/aisi.jpg");
let currentPage = 0
const Collections = ({ scrollTop }) => {
  const [currentScrollClass, setCurrentScrollClass] = useState(['toHide', 'toHide'])
  let documentHeight = document.body.clientHeight;

  useEffect(() => {
    switch(true){
      case(scrollTop>documentHeight/10*7):
        setCurrentScrollClass(['toShow','toShow']);
        break;
      case(scrollTop>documentHeight/10*6):
        setCurrentScrollClass(['toShow','toHide']);
        break;
      default:
        setCurrentScrollClass(['toHide','toHide']);
        break;
    };
  }, [scrollTop, documentHeight])

  const rightClicked = (e) => {
    e.preventDefault();
    ++currentPage;
    const pages = document.querySelectorAll('ul li');
    pages.forEach(p => p.style.left = -(currentPage%5*20)+'%');
  }

  const leftClicked = (e) => {
    e.preventDefault();
    currentPage = currentPage-1<0?4:currentPage-1;
    const pages = document.querySelectorAll('ul li');
    pages.forEach(p => p.style.left = -(currentPage%5*20)+'%');
  }

  useEffect(()=>{
    setInterval(()=>{
    ++currentPage;
    const pages = document.querySelectorAll('ul li');
    pages.forEach(p => p.style.left = -(currentPage%5*20)+'%');
  }
  ,10000)}, []);

  return(
    <div id='collections' className='mainSection'>
    <div className={currentScrollClass[0]}>
    <div className='navbarRoom'></div>
    <Row>
      <Col>
      <h2>我的收藏</h2>
      <p>经典模板网站、热门娱乐、工作收藏、资源站以及兴趣方面</p>
      <p>幻灯片展示，点击前往新标签页搜索外站页面。</p>
      </Col>
    </Row>
    <div className={currentScrollClass[1]}>
      <div id="slider">
        <a href="#collections" className="control_next" onClick={(e) => rightClicked(e)}>&gt;</a>
        <a href="#collections" className="control_prev" onClick={(e) => leftClicked(e)}>&lt;</a>
        <ul>
          <li>
            <Card>
            <Card.Img src={yedouBg} alt="Card image" />
            <Card.ImgOverlay>
              <Card.Title className='cardHead'>模板网站</Card.Title><br/>
              <Card.Text>包括前后端学习网站和特效模板。</Card.Text>
              <Card.Text>Codepen<a href='https://codepen.io/trending'>前往</a></Card.Text>
              <Card.Text>FullStack-React<a href='https://fullstackopen.com/zh/'>前往</a></Card.Text>
              <Card.Text>React-bootstrap<a href='https://react-bootstrap.github.io/'>前往</a></Card.Text>
            </Card.ImgOverlay>
          </Card>
          </li>
          <li>
          <Card>
            <Card.Img src={blackremuBg} alt="Card image" />
            <Card.ImgOverlay>
              <Card.Title>热门娱乐</Card.Title><br/>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer.
              </Card.Text>
              <Card.Text>Last updated 3 mins ago</Card.Text>
            </Card.ImgOverlay>
          </Card>
          </li>
          <li>
            <Card>
              <Card.Img src={aisiBg} alt="Card image" />
              <Card.ImgOverlay>
                <Card.Title>工作相关</Card.Title><br/>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
                </Card.Text>
                <Card.Text>Last updated 3 mins ago</Card.Text>
              </Card.ImgOverlay>
            </Card>
          </li>
          <li>
            <Card>
              <Card.Img src={dateBg} alt="Card image" />
              <Card.ImgOverlay>
                <Card.Title>其他资源</Card.Title><br/>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
                </Card.Text>
                <Card.Text>Last updated 3 mins ago</Card.Text>
              </Card.ImgOverlay>
            </Card>
          </li>
          <li>
            <Card>
              <Card.Img src={hugBg} alt="Card image" />
              <Card.ImgOverlay>
                <Card.Title>兴趣相关</Card.Title><br/>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
                </Card.Text>
                <Card.Text>Last updated 3 mins ago</Card.Text>
              </Card.ImgOverlay>
            </Card>
          </li>
        </ul>  
      </div>
      </div>
      <h2>ending~</h2>
      </div>

    </div>


  )
};

export default Collections;