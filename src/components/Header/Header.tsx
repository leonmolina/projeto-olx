import { Link, NavLink } from 'react-router-dom';
import './header.css';
import logo from './images/logo-lm.png'

import { isLogged, doLogout } from '../../helpers/AuthHandler';
import { Container, Nav, Navbar, NavbarBrand } from 'react-bootstrap';

const Header = () => {
    let logged = isLogged();

    const handleLogout = () => {
        doLogout();
        window.location.href = '/';
    }

    return (
        <header>
            <Navbar>
                <Container className='navbar'>
                    <NavbarBrand className='m-0 p-0'>
                        <Link to="/">
                            <img src={logo} className='logo-lm' alt='Logo da LM'/>
                        </Link>
                    </NavbarBrand>
                    <Nav className='d-flex justify-content-evenly align-items-center'>
                        {logged &&
                            <>
                                <NavLink to="/account" className='mx-3 navlink'>Minha Conta</NavLink>
                                <button className='logout-button' onClick={handleLogout}>Sair</button>
                                <NavLink to="/new-post" className="btn nav-button mx-3">Poste um anúncio</NavLink>
                            </>
                        }
                        {!logged &&
                            <>
                                <NavLink to="/signin" className='mx-3 navlink'>Login</NavLink>
                                <NavLink to="/signup" className='mx-3 navlink'>Cadastrar</NavLink>
                                <NavLink to="/signin" className="btn nav-button mx-3">Poste um anúncio</NavLink>
                            </>
                        }

                    </Nav>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;