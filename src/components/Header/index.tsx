import logo from '../../assets/images/logo-lm.png';
import { doLogout, isLogged } from '../../helpers/AuthHandler';
import * as Styled from './styles';

const Header = () => {
    let logged = isLogged();

    const handleLogout = () => {
        doLogout();
        window.location.href = '/';
    }

    return (
        <Styled.Header>
            <Styled.NavBar>
                <Styled.Wrapper>
                    <Styled.NavBarBrand className='m-0 p-0'>
                        <Styled.Links to="/">
                            <Styled.LMLogo src={logo} alt='Logo da LM' />
                        </Styled.Links>
                    </Styled.NavBarBrand>
                    <Styled.Navigation className='d-flex justify-content-evenly align-items-center'>
                        {logged &&
                            <>
                                <Styled.NavigationLinks to="/account" className='mx-3'>Minha Conta</Styled.NavigationLinks>
                                <button className='logout-button' onClick={handleLogout}>Sair</button>
                                <Styled.NavigationLinks to="/post-ad" className="btn nav-button mx-3">Poste um anúncio</Styled.NavigationLinks>
                            </>
                        }
                        {!logged &&
                            <>
                                <Styled.NavigationLinks to="/signin" className='mx-3'>Login</Styled.NavigationLinks>
                                <Styled.NavigationLinks to="/signup" className='mx-3'>Cadastrar</Styled.NavigationLinks>
                                <Styled.NavigationLinks to="/signin" className="btn nav-button mx-3">Poste um anúncio</Styled.NavigationLinks>
                            </>
                        }
                    </Styled.Navigation>
                </Styled.Wrapper>
            </Styled.NavBar>
        </Styled.Header>
    )
}

export default Header;