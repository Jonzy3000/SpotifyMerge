import React from "react"
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import "./../../css/navbar.css";

class NavComponent extends React.Component {
    render() {
        return (
            <Navbar collapseOnSelect staticTop fluid>
                <Nav>
                    <NavItem eventKey={0} >
                        Test
                    </NavItem>
                </Nav>
                <Navbar.Header>
                    <Link to="/">
                        <Navbar.Brand>
                            React-Bootstrap
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="#">
                            Link
                        </NavItem>
                        <NavItem eventKey={2} href="#">
                            Link
                        </NavItem>
                        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Action</MenuItem>
                            <MenuItem eventKey={3.2}>Another action</MenuItem>
                            <MenuItem eventKey={3.3}>Something else here</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.3}>Separated link</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">
                            Link Right
                        </NavItem>
                        <NavItem eventKey={2} href="#">
                            Link Right
                    </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default withRouter(NavComponent);