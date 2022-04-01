// BOOTSTRAP
// REACT
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import ErrorMessage from '../../components/partials/ErrorMessage';
import { doLogin } from '../../helpers/AuthHandler';
// REQUISITION AND PARTIALS
import useApi, { State } from '../../helpers/OlxApi';
import * as Styled from './styles';

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
            <Styled.Wrapper>
                {/* TITLE */}
                <Styled.FormsTitleArea>
                    <h3>Cadastro</h3>
                </Styled.FormsTitleArea>
                {/* SIGN UP AREA */}
                <Styled.SignUpArea>
                    {error &&
                        <ErrorMessage text={error}/>
                    }
                    {/* FORM */}
                    <Styled.Forms onSubmit={handleSubmit}>
                        {/* NAME */}
                        <Styled.FormsGroup>
                            <Styled.FormsLabel>Nome Completo</Styled.FormsLabel>
                            <Form.Control
                                type="text"
                                className='area-input'
                                disabled={disabled}
                                value={name}
                                onChange={e=>setName(e.target.value)} 
                                required
                            />
                        </Styled.FormsGroup>
                        {/* STATE SELECT */}
                        <Styled.FormsGroup>
                            <Styled.FormsLabel>Estado</Styled.FormsLabel>
                            <Form.Select className="area-input"value={stateLoc} onChange={e=>setStateLoc(e.target.value)} required>
                                {stateList.map((i, k) =>
                                    <option key={k} value={i._id}>{i.name}</option>
                                )}
                            </Form.Select>
                        </Styled.FormsGroup>
                        {/* EMAIL */}
                        <Styled.FormsGroup>
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
                        <Styled.FormsGroup>
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
                        <Styled.FormsGroup>
                            <Styled.FormsLabel>Confirmar Senha</Styled.FormsLabel>
                            <Form.Control
                                type="password"
                                className='area-input'
                                disabled={disabled}
                                value={confirmPassword}
                                onChange={e=>setConfirmPassword(e.target.value)}
                                required
                            />
                        </Styled.FormsGroup>
                        {/* SUBMIT BUTTON */}
                        <Styled.FormsGroup>
                            <Styled.FormsLabel></Styled.FormsLabel>
                            <Button variant="primary" type="submit" disabled={disabled}>Fazer Cadastro</Button>
                        </Styled.FormsGroup>
                    </Styled.Forms>
                </Styled.SignUpArea>
            </Styled.Wrapper>
        </>
    );
}

export default SignUp;