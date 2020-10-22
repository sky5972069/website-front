import { Navbar, Nav}  from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React from 'react';

const navLink = {
  color:'#888888',
  padding:'0.25em',
};
const NavbarCom = () => {
  return (
      <>
      <Navbar bg="white" id='navbar' fixed='top'>
      <Navbar.Brand href="/home">617实验基地</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav>
          <Nav.Link href="/">主页</Nav.Link>
          {/* <NavDropdown title="数据" id="basic-nav-dropdown" href='#data'>
            <NavDropdown.Item href="#">
              <Link style={navDropdownLink} to="/data/power">电力</Link>
            </NavDropdown.Item>
            <NavDropdown.Item href="#">
              <Link style={navDropdownLink} to="/data/transportation">公交</Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#data">其他</NavDropdown.Item>
          </NavDropdown> */}
          <Nav.Link href="/#data">数据</Nav.Link>
          <Nav.Link href="/#forum">论坛</Nav.Link>
          <Nav.Link href="/#collections">收藏</Nav.Link>
          <Nav.Link href="#"  as="span">
            <Link style={navLink} to="/login">登录</Link>
          </Nav.Link>
        </Nav>
        {/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">搜索</Button>
        </Form> */}
      </Navbar.Collapse>
      </Navbar>
      <div className='navbarRoom'></div>
      </>
  );
};

export default NavbarCom;

