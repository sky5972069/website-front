import React from 'react';
import { Row, Col } from 'react-bootstrap';
import '../css/astronaut.css';

import { gsap } from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";

const Headline = () => {
  window.onload = () => {
    let DEFAULT_TIMELINE = { 
      repeat: -1,
      yoyo: true
    }
    let DEFAULT_ANIM_PARAMS = {
      duration: 1,
      ease: "power2.inOut"
    }
  
    let mainTimeline = gsap.timeline(DEFAULT_TIMELINE);
    mainTimeline.to('.astronaut', { 
      duration: 0.5,
      ease:  "none",
      rotate: -5
    })
  
  
    // let duration = 1;
    // let ease = "power2.inOut";
    
    let rightHand = gsap.timeline(DEFAULT_TIMELINE);
    rightHand.to('.right-hand', {
      ...DEFAULT_ANIM_PARAMS,
      transformOrigin: "top left",
      rotate: -60,
      x: '1vw',
      y: '1.125vw',
      scaleY: 1.1,
    })
  
    let leftHand = gsap.timeline(DEFAULT_TIMELINE);
    leftHand.to('.left-hand', {
      ...DEFAULT_ANIM_PARAMS,
      transformOrigin: "top left",
      rotate: 35,
      x: '0.245vw',
      y: '-1.25vw'
    });
  
    let rightLeg = gsap.timeline(DEFAULT_TIMELINE);
    rightLeg.to('.right-leg', {
      ...DEFAULT_ANIM_PARAMS,
      transformOrigin: "top left",
      rotate: 50,
      y: '-1.67vw'
    })
  
    let leftLeg = gsap.timeline(DEFAULT_TIMELINE);
    leftLeg.to('.left-leg', {
      ...DEFAULT_ANIM_PARAMS,
      transformOrigin: "top left",
      rotate: -50,
      y: '1.67vw'
    })
    
    let leftLegTurn = gsap.timeline(DEFAULT_TIMELINE);
    
    leftLegTurn.to('.left-leg .lower-leg', {
      ...DEFAULT_ANIM_PARAMS,
      rotate: 40,
      x: '0.25vw',
      y: '0.3125vw'
    })
    
    let rightLegTurn = gsap.timeline(DEFAULT_TIMELINE);
    rightLegTurn.to('.right-leg .lower-leg', {
      ...DEFAULT_ANIM_PARAMS,
      rotate: 10,
      x: '-0.33vw',
      y: 0
    })
  
    let sheild = CSSRulePlugin.getRule(".head:before");
    let shieldAn = gsap.timeline(DEFAULT_TIMELINE);
    shieldAn.to(sheild, {
      ...DEFAULT_ANIM_PARAMS,
      right: '-0.33vw'
      
    })
  
    let backpack = gsap.timeline(DEFAULT_TIMELINE);
    backpack.set('.backpack', {
      zIndex: 4
    }).to('.backpack', {
      left: '2vw',
      ...DEFAULT_ANIM_PARAMS
    });
  
    let emblem = gsap.timeline(DEFAULT_TIMELINE);
    emblem.to('.emblem', {
      left: '3.87vw',
      ...DEFAULT_ANIM_PARAMS
    });
  
    let light = CSSRulePlugin.getRule(".backpack::before");
    let blink = gsap.timeline({
      repeat: -1
    })
    blink.to(light, {
      duration: 0.4,
      background: "#f36476"
    });
    
   
  }
  


  return (
    <>
    <div className='navbarRoom'></div>
      <Row>
        <Col>
          <div className='headline'>
            <h1>欢迎回到617的<br />
              React前端测试营地</h1>
            <p id="headlineText">这里有些React+Bootstrap+奇奇怪怪的东西，<br/>后端同样加入了测试行列！</p>
          </div>
        </Col>
        <Col>
          <div className='astronaut-container'>
            <div className="space">
              <div className="moon"></div>
              <div className="astronaut">
                <div className="head"> </div>
                <div className="neck"> </div> 
                <div className="body"> 
                  <div className="emblem"> </div>
                </div>
                <div className="backpack"> </div>
                <div className="right-hand hand"> </div>
                <div className="left-hand hand"> </div>
                <div className="right-leg leg">
                  <div className="upper-leg"></div>
                  <div className="lower-leg"></div>
                </div>
                <div className="left-leg leg">
                  <div className="upper-leg"></div>
                  <div className="lower-leg"></div>
                </div>
              </div>
            </div>
            <div className="landing"></div>
          </div>
        </Col>
        {/* <Col>
        <a className="arrow-wrap" href="#content">
          <span class="arrow"></span>
        </a>
        </Col> */}
      </Row>
    </>
  )
};

export default Headline;