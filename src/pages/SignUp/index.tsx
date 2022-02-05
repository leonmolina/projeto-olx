// CSS AND BOOTSTRAP
import './style.css';
import { Form, Button, Container } from 'react-bootstrap';
// REACT
import React, { useState, useEffect } from 'react';
// REQUISITION AND PARTIALS
import useApi, {State} from '../../helpers/OlxApi';
import { doLogin } from '../../helpers/AuthHandler';
import ErrorMessage from '../../components/partials/ErrorMessage';

const SignUp = () => {
// API CALL AND USE STATES
    const api = useApi();
    const [name, setName] = useState('');
    const [stateLoc, setStateLoc] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [stateList, setStateList] = useState<State[]>([]);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');
// STATES EFFECT
    useEffect(()=>{
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, []);
// FORM SUBMIT
    const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        setDisabled(true);
        setError('')

        if(password !== confirmPassword) {
            setError('Senhas não batem');
            setDisabled(false);
            return;
        }
        const json = await api.register(name, email, password, stateLoc);

        if(json.error) {
            setError(json.error);
        } else {
            doLogin(json.token);
            window.location.href = '/';
        }
        setDisabled(false);
    }

    return (
        <>
            {/* SIGN UP CONTAINER */}
            <Container>
                {/* TITLE */}
                <div className="signup-title">
                    <h3>Cadastro</h3>
                </div>
                {/* SIGN UP AREA */}
                <div>
                    {error &&
                        <ErrorMessage text={error}/>
                    }
                    {/* FORM */}
                    <Form onSubmit={handleSubmit} className="signup-form">
                        {/* NAME */}
                        <Form.Group className="area">
                            <Form.Label className='area-title'>Nome Completo</Form.Label>
                            <Form.Control 
                                type="text"
                                className='area-input'
                                disabled={disabled}
                                value={name}
                                onChange={e=>setName(e.target.value)} 
                                required
                            />
                        </Form.Group>
                        {/* STATE SELECT */}
                        <Form.Group className="area">
                            <Form.Label className='area-title'>Estado</Form.Label>
                            <Form.Select className="area-input"value={stateLoc} onChange={e=>setStateLoc(e.target.value)} required>
                                {stateList.map((i, k) =>
                                    <option key={k} value={i._id}>{i.name}</option>
                                )}
                            </Form.Select>
                        </Form.Group>
                        {/* EMAIL */}
                        <Form.Group className="area">
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
                        <Form.Group className="area">
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
                        <Form.Group className="area">
                            <Form.Label className='area-title'>Confirmar Senha</Form.Label>
                            <Form.Control
                                type="password"
                                className='area-input'
                                disabled={disabled}
                                value={confirmPassword}
                                onChange={e=>setConfirmPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        {/* SUBMIT BUTTON */}
                        <Form.Group className="area">
                            <Form.Label className='area-title'></Form.Label>
                            <Button variant="primary" type="submit" disabled={disabled}>Fazer Cadastro</Button>
                        </Form.Group>
                    </Form>
                </div>
            </Container>
        </>
    );
}

export default SignUp;