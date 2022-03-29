import { useEffect, useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useApi, { AnnouncedType, Category } from '../../../helpers/OlxApi';
import './style.css';


const EditAd = (props: AnnouncedType) => {
    // API CALL AND USE STATES
    const api = useApi();
    // MODAL
    const [isOpen, setIsOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);

    const fileField = useRef<HTMLInputElement | any>(null);
    const [newTitle, setNewTitle] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [priceNegotiable, setPriceNegotiable] = useState(false);
    const [newDesc, setNewDesc] = useState('');
    const [itemId, setItemId] = useState('');

    useEffect(()=>{
        const getCategories = async ()=> {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, [])
    const handleClick = () => {
        window.location.href = `/ad/${props.data.id}`;
    }
    // FORM SUBMIT
    const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
        
    }
    // MODAL AND USER INFO FUNCTIONS
    const handleModal = () => {
        isOpen ? setIsOpen(false) : setIsOpen(true);
    }
    const handleAdNewInfo = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        setDisabled(true);
        setError('')
        let errors = [];

        if(!newTitle.trim()) {
            errors.push('Sem título');
        }
        if(!newCategory) {
            errors.push('Sem categoria')
        }
        if(errors.length === 0) {
            const fData = new FormData();
            fData.append('title', newTitle);
            fData.append('price', newPrice);
            fData.append('priceneg', priceNegotiable.toString());
            fData.append('desc', newDesc);
            fData.append('cat', newCategory);

            if(fileField.current?.files?.length > 0) {
                for(let i=0; i<fileField.current?.files?.length; i++) {
                    fData.append('img', fileField.current.files[i]);
                }
            }
            const json = await api.updateAd(fData, itemId);

            if (!json.error) {
                window.location.href = `/ad/${itemId}`;
                return;
    
            } else {
                setError(json.error);
            }
        }
    }
    return (
        <div className='announced-item'>
            <Link to={`/ad/${props.data.id}`} onClick={handleClick}>
                <div className="item-image">
                    {props.data.images &&
                        <img
                        // SHOWS ONLY THE FIRST IMAGE OF THE PRODUCT ON MY-ACCOUNT PAGE
                        src={`http://alunos.b7web.com.br:501/media/${props.data.images[0].url}`}
                        alt="Primeira imagem do produto anunciado"
                        />
                    }
                    {!props.data.images &&
                        <img src={props.data.image} alt="Imagem do produto anunciado" />
                    }
                </div>
                <div className="item-name">
                    {props.data.title}
                </div>
                <div className="item-price">
                    {props.data.price}
                </div>
            </Link>
            <Modal show={isOpen} onHide={handleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Altere suas informações</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleAdNewInfo}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Alterar o Título</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Novo título"
                                value={newTitle}
                                disabled={disabled}
                                onChange={e=>setNewTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Alterar a Categoria</Form.Label>
                            <Form.Select
                                value={newCategory}
                                disabled={disabled}
                                onChange={e=>setNewCategory(e.target.value)}
                            >
                                <option></option>
                                {categories.map((i, k) =>
                                    <option key={k} value={i._id}>{i.name}</option>
                                )}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Alterar o Preço</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="R$ "
                                value={newPrice}
                                disabled={disabled}
                                onChange={e=>setNewPrice(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='area-title'>Preço Negociável</Form.Label>
                            <Form.Check
                                type="checkbox"
                                disabled={disabled}
                                checked={priceNegotiable}
                                onChange={e =>setPriceNegotiable(!priceNegotiable)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Alterar a Descrição</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nova descrição"
                                value={newDesc}
                                disabled={disabled}
                                onChange={e=>setNewDesc(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Imagens (1 ou mais)</Form.Label>
                            <Form.Control 
                                type="file"
                                className='area-input'
                                disabled={disabled}
                                ref={fileField}
                                multiple
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" type="button" onClick={handleModal}>Cancelar</Button>
                        <Button variant="success" type="submit">Salvar</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}
export default EditAd;