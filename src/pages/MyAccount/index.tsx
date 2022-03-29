// REACT
import { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdItem from '../../components/partials/AdItem';
// REQUISITION AND PARTIALS
import useApi, { Category, State } from '../../helpers/OlxApi';
import './style.css';


const MyAccount = () => {
// API CALL AND USE STATES
    const api = useApi();
    const [stateList, setStateList] = useState<State[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
// USER INFO
    const [adList, setAdList] = useState([]);
    const [userInfo, setUserInfo] = useState({});
// STATES - USE EFFECT
    useEffect(()=>{
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, []);
    // USER - USE EFFECT
    useEffect(()=>{
        const getUser = async () => {
            const json = await api.getUser();
            setUserInfo(json);
            setAdList(json.ads)
        }
        getUser();
    }, []);
// CATEGORIES - USE EFFECT
    useEffect(()=>{
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    return (
        <>
            {/* SEARCH CONTAINER */}
            <Container fluid className='search-area'>
                <Container>
                    {/* SEARCH BAR */}
                    <div className="search-box">
                        {/* SEARCH FORM */}
                        <Form className="search-form row" method="GET" action="/ads">
                            {/* SEARCH TEXT */}
                            <div className='col-lg-9 col-md-6 col-sm-6'>
                                <Form.Control
                                        type="text"
                                        className="search-input search-input--text"
                                        name="q"
                                        placeholder='O que você procura?'>
                                </Form.Control>
                            </div>
                            {/* SEARCH SELECT */}
                            <div className='col-lg-1 col-md-4 col-sm-4'>
                                <Form.Select name="state" className='search-input search-input--select'>
                                    {stateList.map((i, k)=>
                                        <option key={k} value={i.name}>{i.name}</option>
                                    )}
                                </Form.Select>
                            </div>
                            {/* SEARCH BUTTON */}
                            <div className='col-lg-2 col-md-2 col-sm-2'>
                                <Button variant="primary" type="submit" className="search-button">Pesquisar</Button>
                            </div>
                        </Form>
                    </div>
                    {/* CATEGORY LIST */}
                    <div className="category-list">
                        {categories.map((i, k)=>
                            <Link key={k} to={`/ads?cat=${i.slug}`} className='category-item'>
                                <img src={i.img} alt="Ícone da Categoria" />
                                <span>{i.name}</span>
                            </Link>
                        )}
                    </div>
                </Container>
            </Container>
            {/* ADS CONTAINER */}
            <Container>
                <div className='home-page--area'>
                    <h2>Meus Anúncios</h2>
                    <div className="list">
                        {adList.map((i, k)=>
                            <AdItem key={k} data={i}/>
                        )}
                    </div>
                    <Link to="/ads" className='see-all-link'>Ver Todos</Link>
                    <hr />
                    <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolore pariatur voluptatum recusandae tempore eaque error quaerat temporibus cum labore ducimus rerum perferendis quasi, incidunt commodi possimus beatae eos voluptatem.</span>
                </div>
            </Container>
        </>
    );
}

export default MyAccount;