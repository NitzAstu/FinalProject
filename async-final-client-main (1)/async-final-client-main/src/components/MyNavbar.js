import React from 'react';
import {Container, Nav, Navbar, NavLink} from "react-bootstrap";

const MyNavbar = () => {

    const logout = ()=> {
        fetch(process.env.REACT_APP_API_ENDPOINT+"users/logout", {
            method: "GET",
            credentials: "include",
            headers: {"Content-Type": "application/json"},
        }).then(() => {
            window.sessionStorage.clear();
            console.log("logged out successfully");
        });
    }

    return (
        <Navbar bg='dark' expand='lg' variant='dark'>
            <Container>
                <Navbar.Brand href="/">Product Manager</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/addItem" >Add Item</Nav.Link>
                        <Nav.Link href="/getReports" >Get Reports</Nav.Link>
                    </Nav>
                    <NavLink href='/' onClick={logout}>Logout</NavLink>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}

export default MyNavbar;