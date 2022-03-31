// REACT
import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/partials/ErrorMessage';
// REQUISITION AND PARTIALS
import useApi, { Category } from '../../helpers/OlxApi';
import * as Styled from './styles';

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
            {/* ADD AD CONTAINER */}
            <Styled.Wrapper>
                {/* TITLE */}
                <Styled.FormsAreaTitle>
                    <h3>Poste um anúncio</h3>
                </Styled.FormsAreaTitle>
                {/* ADD AD AREA */}
                <Styled.AddAdArea>
                    {error &&
                        <ErrorMessage text={error}/>
                    }
                    {/* FORM */}
                    <Styled.Forms onSubmit={handleSubmit}>
                        {/* EMAIL */}
                        <Styled.FormsArea className="mb-1">
                            <Styled.FormTitle>Titulo</Styled.FormTitle>
                            <Form.Control 
                                type="text"
                                className='area-input'
                                disabled={disabled}
                                value={title}
                                onChange={e=>setTitle(e.target.value)} 
                                required
                            />
                        </Styled.FormsArea>
                        {/* PASSWORD */}
                        <Styled.FormsArea className="mb-1">
                            <Styled.FormTitle>Categoria</Styled.FormTitle>
                            <Form.Select className="area-input" disabled={disabled} value={category} onChange={e=>setCategory(e.target.value)} required>
                                <option></option>Styled.FormTitle
                                {categories &&
                                    categories.map(i =>
                                        <option key={i._id} value={i._id}>{i.name}</option>
                                    )
                                }
                            </Form.Select>
                        </Styled.FormsArea>
                        {/* CONFIRM PASSWORD */}
                        <Styled.FormsArea className="mb-1">
                            <Styled.FormTitle>Preço</Styled.FormTitle>
                            <Styled.FormCurrencySpan>R$:</Styled.FormCurrencySpan>
                            <Form.Control 
                                type="text"
                                className='area-input'
                                disabled={disabled || priceNegotiable}
                                value={price}
                                onChange={e=>setPrice(e.target.value)} 
                                required
                            />
                        </Styled.FormsArea>
                        <Styled.FormsArea className="mb-1">
                            <Styled.FormTitle>Preço Negociável</Styled.FormTitle>
                            <Form.Check
                                type="checkbox"
                                disabled={disabled}
                                checked={priceNegotiable}
                                onChange={()=>setPriceNegotiable(!priceNegotiable)}
                            />
                        </Styled.FormsArea>
                        <Styled.FormsArea className="mb-1">
                            <Styled.FormTitle>Descrição</Styled.FormTitle>
                            <Form.Control 
                                as="textarea"
                                className='area-input'
                                disabled={disabled}
                                value={desc}
                                onChange={e=>setDesc(e.target.value)} 
                                required
                            />
                        </Styled.FormsArea>
                        <Styled.FormsArea className="mb-1">
                            <Styled.FormTitle>Imagens (1 ou mais)</Styled.FormTitle>
                            <Form.Control 
                                type="file"
                                className='area-input'
                                disabled={disabled}
                                ref={fileField}
                                multiple
                            />
                        </Styled.FormsArea>
                        {/* SUBMIT BUTTON */}
                        <Styled.FormsArea className="mb-1">
                            <Styled.FormTitle></Styled.FormTitle>
                            <Button variant="primary" type="submit" disabled={disabled}>Adicionar Anúncio</Button>
                        </Styled.FormsArea>
                    </Styled.Forms>
                </Styled.AddAdArea>
            </Styled.Wrapper>
        </>

    );
}

export default AddAd;