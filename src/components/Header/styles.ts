import { Container, Nav, Navbar, NavbarBrand } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import styled from "styled-components";

export const Header = styled.header`
    border-bottom: 1px solid var(--border-grey);
    background-color: var(--background-light);
`
export const NavBar = styled(Navbar)`
    height: 60px;
`
export const Wrapper = styled(Container)`
`
export const NavBarBrand = styled(NavbarBrand)`
`
export const LMLogo = styled.img`
    max-height: 50px;
`
export const Links = styled(Link)`
    text-decoration: none;
    color: var(--text);
    background: none;
    outline: 0;
    border: 0;
`
export const Navigation = styled(Nav)`
`
export const NavigationLinks = styled(NavLink)`
    color: var(--text);
    text-decoration: none;
    &:hover {
        color: var(--text-light);
    }
    &.nav-button {
        background-color: var(--post-button);
        color: var(--text-white);
        &:hover{
            color: var(--text);
        }
    }
`
export const LogoutButton = styled.button`
    text-decoration: none;
    color: var(--text);
    background: none;
    outline: 0;
    border: 0;
    &:hover {
        color: var(--text-light);
    }
`