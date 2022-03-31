import { useEffect, useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import useApi, { AnnouncedType, Category } from '../../../helpers/OlxApi';
import * as Styled from './styles';


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
    // MODAL AND USER INFO FUNCTIONS
    const showModal = (props: any) => {
        setIsOpen(true)
        setItemId(props)
    }

    const hideModal = () => {
        setDisabled(false);
        setIsOpen(false)
    }
    // FORM SUBMIT
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
        const fData = new FormData();
        fData.append('title', newTitle);
        fData.append('price', newPrice);
        fData.append('priceneg', priceNegotiable.toString());
        fData.append('desc', newDesc);
        fData.append('cat', newCategory);

        if(fileField.current.files.length > 0) {
            for(let i=0; i<fileField.current.files.length; i++) {
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
        setIsOpen(false);
        setDisabled(false);
    }
    return (
        <Styled.AnnouncedItem>
            <Styled.AnnouncedLink to={`/ad/${props.data.id}`} onClick={handleClick}>
                <Styled.ItemImageArea>
                    {props.data.images &&
                        <Styled.ItemImage
                        // SHOWS ONLY THE FIRST IMAGE OF THE PRODUCT ON MY-ACCOUNT PAGE
                        src={`http://alunos.b7web.com.br:501/media/${props.data.images[0].url}`}
                        alt="Primeira imagem do produto anunciado"
                        />
                    }
                    {!props.data.images &&
                        <Styled.ItemImage src={props.data.image} alt="Imagem do produto anunciado" />
                    }
                </Styled.ItemImageArea>
                <Styled.ItemName>
                    {props.data.title}
                </Styled.ItemName>
                <Styled.ItemPrice>
                    {props.data.priceNegotiable &&
                        'Preço Negociável'
                    }
                    {!props.data.priceNegotiable && props.data.price &&
                        `${props.data.price}`
                    }
                </Styled.ItemPrice>
            </Styled.AnnouncedLink>
            <div className="align-self-center my-2 container-fluid">
                <button onClick={() => showModal(props.data.id)} type="button" className="btn btn-primary">Editar</button>
            </div>
            <Modal show={isOpen} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Altere as informações do anúncio</Modal.Title>
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
                            <span>Título atual: {props.data.title}</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Alterar a Categoria</Form.Label>
                            <Form.Select
                                value={newCategory}
                                disabled={disabled}
                                onChange={e=>setNewCategory(e.target.value)}
                            >
                                {categories.map((i, k) =>
                                    <option key={k} value={i._id}>{i.name}</option>
                                )}
                            </Form.Select>
                            <span>Categoria atual: {props.data.category}</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Alterar o Preço</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="R$ "
                                value={newPrice}
                                disabled={disabled || priceNegotiable}
                                onChange={e=>setNewPrice(e.target.value)}
                            />
                            <span>Preço atual: {props.data.price}</span>
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
                            {props.data.images &&
                                <span>Quantidade de imaegns que o anúncio já possui: {props.data.images.length}</span>
                            }
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" type="button" onClick={hideModal}>Cancelar</Button>
                        <Button variant="success" type="submit">Salvar</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Styled.AnnouncedItem>
    );
}
export default EditAd;