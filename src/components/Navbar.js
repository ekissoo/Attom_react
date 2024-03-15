import React from "react";
import { withRouter } from 'react-router-dom';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from './NavbarElements';

const NavBar = () => {
    return (
        <>
            <Nav>
                <Bars/>
                <NavMenu>
                    <NavLink to = '/'>Home</NavLink>
                    <NavLink to = '/form'>Form</NavLink>
                    {/* <NavLink to = '/registers'>Register</NavLink> */}
                    <NavLink to = '/about'>About Us</NavLink>
                </NavMenu>
                
                <NavBtn>
                    <NavBtnLink to = '/login'>Login</NavBtnLink>
                    <NavBtnLink to = '/logout'>Logout</NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
}

export default withRouter(NavBar);
 