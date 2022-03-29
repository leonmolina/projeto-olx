// REACT
import { useEffect, useState } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EditAd from '../../components/partials/EditAd';
// REQUISITION AND PARTIALS
import useApi, { Category, State, UserType } from '../../helpers/OlxApi';
import './style.css';

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
    const [confirmPassword, setConfirmPassword] = useState('');
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
        <Container className="my-account">
            <h2>Minha Conta</h2>
            <div className="account-details">
                <div className="account-details__name">
                    {userInfo &&
                        <span>{userInfo.name}</span>
                    }
                </div>
                <div className="account-details__email">
                    {userInfo &&
                        <span>{userInfo.email}</span>
                    }
                </div>
                <div className="account-details__state">
                    {userInfo &&
                        <span>{userInfo.state}</span>
                    }
                </div>
                <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-primary" onClick={handleModal}>Editar informações</button>
                </div>
            </div>
            <Modal show={isOpen} onHide={handleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Altere suas informações</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleUserNewInfo}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Alterar o Nome</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Substituir o nome"
                                value={name}
                                disabled={disabled}
                                onChange={e=>setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Alterar Estado</Form.Label>
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
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Alterar o Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Substituir o email"
                                value={email}
                                disabled={disabled}
                                onChange={e=>setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Alterar a Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Substituir a senha"
                                value={password}
                                disabled={disabled}
                                onChange={e=>setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" type="button" onClick={handleModal}>Cancelar</Button>
                        <Button variant="success" type="submit">Salvar</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <div className='my-announced'>
                <h2>Meus anúncios</h2>
                <div className="list">
                    {adList.map((i, k)=>
                        <EditAd key={k} data={i}/>
                    )}
                </div>
                <Link to="/ads" className='see-all-link'>Ver Todos</Link>
                <hr />
                <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Explicabo dolore pariatur voluptatum recusandae tempore eaque error
                    quaerat temporibus cum labore ducimus rerum perferendis quasi,
                    incidunt commodi possimus beatae eos voluptatem.
                </span>
            </div>
        </Container>
    );
}

export default MyAccount;