import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/forum.css';
const Forum = ({ scrollTop }) => {
  const [currentScrollClass, setCurrentScrollClass] = useState(['toHide', 'toHide'])
  let documentHeight = document.body.clientHeight;

  useEffect(() => {
    switch(true){
      case(scrollTop>documentHeight/10*3.6):
        setCurrentScrollClass(['toShow','toShow']);
        break;
      case(scrollTop>documentHeight/10*2.5):
        setCurrentScrollClass(['toShow','toHide']);
        break;
      default:
        setCurrentScrollClass(['toHide','toHide']);
        break;
    };
  }, [scrollTop,documentHeight])

  return(
    <div id='forum' className='mainSection'>
      <div className={currentScrollClass[0]}>
        <div className='navbarRoom'></div>
        <Row>
          <Col>
          <h2>论坛模块</h2>
          <p>用户登录后可以发表、查看、点赞、评论博客。</p>
          <p>用户间可以私聊。</p>
          </Col>
        </Row>
        </div>
      <div className={currentScrollClass[1]}>
      <Row>
        <Col>
        <div className="forum">
            <figure className="forum_figure">
                <img src="https://source.unsplash.com/qXMpNtNp1uE/300x510" alt="dog here" className="forum_picture" />
                <figcaption className="card_caption">
                    <h2 className="forum_title">Blogs</h2>
                    <p className="forum_snippet">617 and 219 publish blogs.</p>
                    <Link to="/blogs" className="forum_button">Read more</Link>
                </figcaption>
            </figure>
        </div>
        </Col>
        <Col>
        <div className="forum">
            <figure className="forum_figure">
                <img src="https://source.unsplash.com/71u2fOofI-U/300x510" alt="forum" className="card__image" />
                <figcaption className="forum_caption">
                    <h2 className="forum_title">Forum</h2>
                    <p className="forum_snippet">Public discussions.</p>
                    <Link to="/forum" className="forum_button">Read more</Link>
                </figcaption>
            </figure>
        </div>
        </Col>
        <Col>
        <div className="forum">
            <figure className="forum_figure">
                <img src="https://source.unsplash.com/75S9fpDJVdo/300x510" alt="hotpot" className="card__image" />
                <figcaption className="forum_caption">
                    <h2 className="forum_title">Hotpot</h2>
                    <p className="forum_snippet">Hottest titles.</p>
                    <Link to="/hotpot" className="forum_button">Read more</Link>
                </figcaption>
            </figure>
        </div>
        </Col>
      </Row>
      </div>
      



    </div>




  )


}


export default Forum;