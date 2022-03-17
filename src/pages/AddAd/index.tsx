// BOOTSTRAP
import { Form, Button, Container } from 'react-bootstrap';
// REACT
import React, { useEffect, useRef, useState } from 'react';
// REQUISITION AND PARTIALS
import useApi, {Category} from '../../helpers/OlxApi';
import ErrorMessage from '../../components/partials/ErrorMessage';
import { useNavigate } from 'react-router-dom';

const AddAd = () => {
// API CALL AND USE STATES
    const api = useApi();
    const fileField = useRef<HTMLInputElement | any>(null);
    const navigate = useNavigate();

    const [categories, setCategories] = useState<Category[]>([]);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [priceNegotiable, setPriceNegotiable] = useState(false);
    const [desc, setDesc] = useState('');
    
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    useEffect(()=>{
        const getCategories = async ()=> {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, [])

// FORM SUBMIT
    const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        setDisabled(true);
        setError('')
        let errors = [];

        if(!title.trim()) {
            errors.push('Sem título');
        }
        if(!category) {
            errors.push('Sem categoria')
        }
        if(errors.length === 0) {
            const fData = new FormData();
            fData.append('title', title);
            fData.append('price', price);
            fData.append('priceneg', priceNegotiable.toString());
            fData.append('desc', desc);
            fData.append('cat', category);

            if(fileField.current?.files?.length > 0) {
                for(let i=0; i<fileField.current?.files?.length; i++) {
                    fData.append('img', fileField.current.files[i]);
                }
            }

            const json = await api.addAd(fData);

            if(!json.error) {
                navigate(`/ad/${json.id}`);
                return;
            } else {
                setError(json.error)
            }

        } else {
            setError(errors.join("\n"));
        }
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
                            <Form.Select className="area-input" disabled={disabled} value={category} onChange={e=>setCategory(e.target.value)} required>
                                <option></option>
                                {categories &&
                                    categories.map(i =>
                                        <option key={i._id} value={i._id}>{i.name}</option>
                                    )
                                }
                            </Form.Select>
                        </Form.Group>
                        {/* CONFIRM PASSWORD */}
                        <Form.Group className="mb-1 area">
                            <Form.Label className='area-title'>Preço</Form.Label>
                            <span className='span-currency'>R$:</span>
                            <Form.Control 
                                type="text"
                                className='area-input'
                                disabled={disabled || priceNegotiable}
                                value={price}
                                onChange={e=>setPrice(e.target.value)} 
                                required
                            />
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