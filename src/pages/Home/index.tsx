// CSS AND BOOTSTRAP
import './style.css';
import { Container, Form, Button } from 'react-bootstrap';
// REACT
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// REQUISITION AND PARTIALS
import useApi, {State, Category, Ads}  from '../../helpers/OlxApi';
import AdItem from '../../components/partials/AdItem';


const Home = () => {
// API CALL AND USE STATES
    const api = useApi();
    const [stateList, setStateList] = useState<State[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [adList, setAdList] = useState<Ads[]>([]);
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
// ADS - USE EFFECT
    useEffect(()=>{
        const getRecentAds = async () => {
            const json = await api.getAds({
                sort:'desc',
                limit:8
            });
            setAdList(json.ads);
        }
        getRecentAds();
        console.log(adList)
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
                    <h2>Anúncios Recentes</h2>
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

export default Home;