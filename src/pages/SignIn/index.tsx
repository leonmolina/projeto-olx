// BOOTSTRAP
import { Form, Button, Container } from 'react-bootstrap';
// REACT
import React, { useState } from 'react';
// REQUISITION AND PARTIALS
import useApi from '../../helpers/OlxApi';
import { doLogin } from '../../helpers/AuthHandler';
import ErrorMessage from '../../components/partials/ErrorMessage';

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
            <Container>
                {/* TITLE */}
                <div className="forms-title">
                    <h3>Login</h3>
                </div>
                {/* LOGIN AREA */}
                <div>
                    {error &&
                        <ErrorMessage text={error}/>
                    }
                    {/* FORM */}
                    <Form onSubmit={handleSubmit} className="forms">
                        {/* EMAIL */}
                        <Form.Group className="mb-1 area">
                            <Form.Label className='area-title'>E-mail</Form.Label>
                            <Form.Control 
                                type="email"
                                className='area-input'
                                disabled={disabled}
                                value={email}
                                onChange={e=>setEmail(e.target.value)} 
                                required
                            />
                        </Form.Group>
                        {/* PASSWORD */}
                        <Form.Group className="mb-1 area">
                            <Form.Label className='area-title'>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                className='area-input'
                                disabled={disabled}
                                value={password}
                                onChange={e=>setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        {/* CONFIRM PASSWORD */}
                        <Form.Group className="mb-1 area">
                            <Form.Label className='area-title'>Lembrar Senha</Form.Label>
                            <Form.Check
                                type="checkbox"
                                disabled={disabled}
                                checked={rememberPassword}
                                onChange={()=>setRememberPassword(!rememberPassword)}
                            />
                        </Form.Group>
                        {/* SUBMIT BUTTON */}
                        <Form.Group className="mb-1 area">
                            <Form.Label className='area-title'></Form.Label>
                            <Button variant="primary" type="submit" disabled={disabled}>Fazer Login</Button>
                        </Form.Group>
                    </Form>
                </div>
            </Container>
        </>

    );
}

export default SignIn;