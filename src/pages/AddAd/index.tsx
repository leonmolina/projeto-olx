// BOOTSTRAP
import { Form, Button, Container } from 'react-bootstrap';
// REACT
import React, { useRef, useState } from 'react';
// REQUISITION AND PARTIALS
import useApi from '../../helpers/OlxApi';
import { doLogin } from '../../helpers/AuthHandler';
import ErrorMessage from '../../components/partials/ErrorMessage';

const AddAd = () => {
// API CALL AND USE STATES

    const fileField = useRef<HTMLInputElement>(null);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [priceNegotiable, setPriceNegotiable] = useState(false);
    const [desc, setDesc] = useState('');
    
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

// FORM SUBMIT
    const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        setDisabled(true);
        setError('')
        // const json = await api.login(email, password);
    
        // if(json.error) {
        //     setError(json.error);
        // } else {
        //     doLogin(json.token, rememberPassword);
        //     window.location.href = '/';
        // }
        setDisabled(false);
    }

    return (
        <>
            {/* LOGIN CONTAINER */}
            <Container>
                {/* TITLE */}
                <div className="forms-title">
                    <h3>Poste um anúncio</h3>
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
                            <Form.Label className='area-title'>Titulo</Form.Label>
                            <Form.Control 
                                type="text"
                                className='area-input'
                                disabled={disabled}
                                value={title}
                                onChange={e=>setTitle(e.target.value)} 
                                required
                            />
                        </Form.Group>
                        {/* PASSWORD */}
                        <Form.Group className="mb-1 area">
                            <Form.Label className='area-title'>Categoria</Form.Label>
                            <Form.Select className="area-input"value={category} onChange={e=>setCategory(e.target.value)} required>
                                {/* <option key={k} value={i._id}>{i.name}</option> */}
                            </Form.Select>
                        </Form.Group>
                        {/* CONFIRM PASSWORD */}
                        <Form.Group className="mb-1 area">
                            <Form.Label className='area-title'>Preço</Form.Label>
                            {/* <Form.Control 
                                type="text"
                                className='area-input'
                                disabled={disabled}
                                value={title}
                                onChange={e=>setTitle(e.target.value)} 
                                required
                            /> */}
                        </Form.Group>
                        <Form.Group className="mb-1 area">
                            <Form.Label className='area-title'>Preço Negociável</Form.Label>
                            <Form.Check
                                type="checkbox"
                                disabled={disabled}
                                checked={priceNegotiable}
                                onChange={()=>setPriceNegotiable(!priceNegotiable)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-1 area">
                            <Form.Label className='area-title'>Descrição</Form.Label>
                            <Form.Control 
                                as="textarea"
                                className='area-input'
                                disabled={disabled}
                                value={desc}
                                onChange={e=>setDesc(e.target.value)} 
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-1 area">
                            <Form.Label className='area-title'>Imagens (1 ou mais)</Form.Label>
                            <Form.Control 
                                type="file"
                                className='area-input'
                                disabled={disabled}
                                ref={fileField}
                                multiple
                            />
                        </Form.Group>
                        {/* SUBMIT BUTTON */}
                        <Form.Group className="mb-1 area">
                            <Form.Label className='area-title'></Form.Label>
                            <Button variant="primary" type="submit" disabled={disabled}>Adicionar Anúncio</Button>
                        </Form.Group>
                    </Form>
                </div>
            </Container>
        </>

    );
}

export default AddAd;