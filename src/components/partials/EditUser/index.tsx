import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import useApi, { State } from '../../helpers/OlxApi';
import './style.css';

type PropsEditUser = {

}

const EditUser = (props: any) => {
// API CALL AND USE STATES
    const api = useApi();
    const [stateList, setStateList] = useState<State[]>([]);
// MODAL
    const [isOpen, setIsOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');
// USER INFO
    const [adList, setAdList] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [state, setState] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');



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
    );
}

export default EditUser;