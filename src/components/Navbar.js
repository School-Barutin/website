import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router";
import { websiteIcon, navBarStructure } from "../websiteConfig";

const NavbarComponent = () => (
  <Navbar fluid inverse collapseOnSelect staticTop>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">
          <img
            id="brand-icon"
            src={websiteIcon}
            alt="Our icon cannot be displayed. Sorry!"
          />
          <span id="slogan">ОУ "Никола Вапрцаров"</span>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      {navBarStructure.map((ev, i) => (
        <Navbar.Text key={i}>
          <Link to={ev.href}>{ev.text}</Link>
        </Navbar.Text>
      ))}
    </Navbar.Collapse>
  </Navbar>
);

export default NavbarComponent;
