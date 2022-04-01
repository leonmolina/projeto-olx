// BOOTSTRAP
// REACT
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import ErrorMessage from '../../components/partials/ErrorMessage';
import { doLogin } from '../../helpers/AuthHandler';
// REQUISITION AND PARTIALS
import useApi from '../../helpers/OlxApi';
import * as Styled from './styles';

const SignIn = () => {
// API CALL AND USE STATES
    const api = useApi();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberPassword, setRememberPassword] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

// FORM SUBMIT
    const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        setDisabled(true);
        setError('')
        const json = await api.login(email, password);
    
        if(json.error) {
            setError(json.error);
        } else {
            doLogin(json.token, rememberPassword);
            window.location.href = '/';
        }
        setDisabled(false);
    }

    return (
        <>
            {/* LOGIN CONTAINER */}
            <Styled.Wrapper>
                {/* TITLE */}
                <Styled.FormsTitleArea>
                    <h3>Login</h3>
                </Styled.FormsTitleArea>
                {/* LOGIN AREA */}
                <Styled.SignInArea>
                    {error &&
                        <ErrorMessage text={error}/>
                    }
                    {/* FORM */}
                    <Styled.Forms onSubmit={handleSubmit}>
                        {/* EMAIL */}
                        <Styled.FormsGroup className="mb-1">
                            <Styled.FormsLabel>E-mail</Styled.FormsLabel>
                            <Form.Control 
                                type="email"
                                className='area-input'
                                disabled={disabled}
                                value={email}
                                onChange={e=>setEmail(e.target.value)} 
                                required
                            />
                        </Styled.FormsGroup>
                        {/* PASSWORD */}
                        <Styled.FormsGroup className="mb-1">
                            <Styled.FormsLabel>Senha</Styled.FormsLabel>
                            <Form.Control
                                type="password"
                                className='area-input'
                                disabled={disabled}
                                value={password}
                                onChange={e=>setPassword(e.target.value)}
                                required
                            />
                        </Styled.FormsGroup>
                        {/* CONFIRM PASSWORD */}
                        <Styled.FormsGroup className="mb-1">
                            <Styled.FormsLabel>Lembrar Senha</Styled.FormsLabel>
                            <Form.Check
                                type="checkbox"
                                disabled={disabled}
                                checked={rememberPassword}
                                onChange={()=>setRememberPassword(!rememberPassword)}
                            />
                        </Styled.FormsGroup>
                        {/* SUBMIT BUTTON */}
                        <Styled.FormsGroup className="mb-1">
                            <Styled.FormsLabel></Styled.FormsLabel>
                            <Button variant="primary" type="submit" disabled={disabled}>Fazer Login</Button>
                        </Styled.FormsGroup>
                    </Styled.Forms>
                </Styled.SignInArea>
            </Styled.Wrapper>
        </>

    );
}

export default SignIn;