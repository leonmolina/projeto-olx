// REACT
import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import EditAd from '../../components/partials/EditAd';
// REQUISITION AND PARTIALS
import useApi, { Category, State, UserType } from '../../helpers/OlxApi';
import * as Styled from './styles';

const MyAccount = () => {
// API CALL AND USE STATES
    const api = useApi();
    const [stateList, setStateList] = useState<State[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
// MODAL
    const [isOpen, setIsOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');
// USER INFO
    const [adList, setAdList] = useState([]);
    const [userInfo, setUserInfo] = useState<UserType>();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [state, setState] = useState('');
    const [password, setPassword] = useState('');
// USER - USE EFFECT
    useEffect(()=>{
        const getUser = async () => {
            const json = await api.getUser();
            setUserInfo(json);
            setAdList(json.ads)
        }
        getUser();
    }, []);
// STATES - USE EFFECT
    useEffect(()=>{
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, []);
    // CATEGORIES - USE EFFECT
    useEffect(()=>{
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

// MODAL AND USER INFO FUNCTIONS
    const handleModal = () => {
        isOpen ? setIsOpen(false) : setIsOpen(true);
    }
    const handleUserNewInfo = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        setDisabled(true);
        setError('');
        const json = await api.updateUser(name, email, state, password);
        if (json.error) {
            setError(json.error);
        } else {
            window.location.href = '/account';
        }
        setDisabled(false);
        setIsOpen(false)
    }

    return (
        <Styled.Wrapper>
            <Styled.AccountTitle>Minha Conta</Styled.AccountTitle>
            <Styled.AccountDetails>
                <Styled.AccountName>
                    {userInfo &&
                        <span>{userInfo.name}</span>
                    }
                </Styled.AccountName>
                <Styled.AccountEmail>
                    {userInfo &&
                        <span>{userInfo.email}</span>
                    }
                </Styled.AccountEmail>
                <Styled.AccountState>
                    {userInfo &&
                        <span>{userInfo.state}</span>
                    }
                </Styled.AccountState>
                <Styled.AccountEditButtonArea>
                    <button type="button" className="btn btn-primary" onClick={handleModal}>Editar informações</button>
                </Styled.AccountEditButtonArea>
            </Styled.AccountDetails>
            <Modal show={isOpen} onHide={handleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Altere suas informações</Modal.Title>
                </Modal.Header>
                <Styled.Forms onSubmit={handleUserNewInfo}>
                    <Modal.Body>
                        <Styled.FormsGroup>
                            <Styled.FormsLabel>Alterar o Nome</Styled.FormsLabel>
                            <Form.Control
                                type="text"
                                placeholder="Substituir o nome"
                                value={name}
                                disabled={disabled}
                                onChange={e=>setName(e.target.value)}
                            />
                        </Styled.FormsGroup>
                        <Styled.FormsGroup>
                            <Styled.FormsLabel>Alterar Estado</Styled.FormsLabel>
                            <Form.Select
                                value={state}
                                disabled={disabled}
                                onChange={e=>setState(e.target.value)}
                            >
                                <option></option>
                                {stateList.map((i, k) =>
                                    <option key={k} value={i._id}>{i.name}</option>
                                )}
                            </Form.Select>
                        </Styled.FormsGroup>
                        <Styled.FormsGroup>
                            <Styled.FormsLabel>Alterar o Email</Styled.FormsLabel>
                            <Form.Control
                                type="email"
                                placeholder="Substituir o email"
                                value={email}
                                disabled={disabled}
                                onChange={e=>setEmail(e.target.value)}
                            />
                        </Styled.FormsGroup>
                        <Styled.FormsGroup>
                            <Styled.FormsLabel>Alterar a Senha</Styled.FormsLabel>
                            <Form.Control
                                type="password"
                                placeholder="Substituir a senha"
                                value={password}
                                disabled={disabled}
                                onChange={e=>setPassword(e.target.value)}
                            />
                        </Styled.FormsGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" type="button" onClick={handleModal}>Cancelar</Button>
                        <Button variant="success" type="submit">Salvar</Button>
                    </Modal.Footer>
                </Styled.Forms>
            </Modal>
            <Styled.MyAnnounced>
                <Styled.MyAnnouncedTitle>Meus anúncios</Styled.MyAnnouncedTitle>
                <Styled.AnnouncedList>
                    {adList.map((i, k)=>
                        <EditAd key={k} data={i}/>
                    )}
                </Styled.AnnouncedList>
                <Styled.SeeAllLink to="/ads">Ver Todos</Styled.SeeAllLink>
                <hr />
                <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Explicabo dolore pariatur voluptatum recusandae tempore eaque error
                    quaerat temporibus cum labore ducimus rerum perferendis quasi,
                    incidunt commodi possimus beatae eos voluptatem.
                </span>
            </Styled.MyAnnounced>
        </Styled.Wrapper>
    );
}

export default MyAccount;