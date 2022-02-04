import React, { useState } from 'react';
import './style.css';
import useApi from '../../helpers/OlxApi';
import { doLogin } from '../../helpers/AuthHandler';
import ErrorMessage from '../../components/partials/ErrorMessage';
import { Form, Button } from 'react-bootstrap';

const SignIn = () => {
    const api = useApi();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberPassword, setRememberPassword] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

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
        <div className="container">
            <div className="signin-title">
                <h3>Login</h3>
            </div>
            <div>
                {error &&
                    <ErrorMessage text={error}/>
                }
                <Form onSubmit={handleSubmit}>
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
                    <Form.Group className="mb-1 area">
                        <Form.Label className='area-title'>Lembrar Senha</Form.Label>
                        <Form.Check
                            type="checkbox"
                            disabled={disabled}
                            checked={rememberPassword}
                            onClick={()=>setRememberPassword(!rememberPassword)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-1 area">
                        <Form.Label className='area-title'></Form.Label>
                        <Button variant="primary" type="submit" disabled={disabled}>Fazer Login</Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
}

export default SignIn;