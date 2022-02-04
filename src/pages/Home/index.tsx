import { useState, useEffect } from 'react';
import './style.css';
import useApi, {State, Category, Ad}  from '../../helpers/OlxApi';
import { Link } from 'react-router-dom';
import AdItem from '../../components/partials/AdItem';

const Home = () => {
    const api = useApi();

    const [stateList, setStateList] = useState<State[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [adList, setAdList] = useState<Ad[]>([]);

    useEffect(()=>{
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, []);

    useEffect(()=>{
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    useEffect(()=>{
        const getRecentAds = async () => {
            const json = await api.getAds({
                sort:'desc',
                limit:8
            });
            setAdList(json.ads);
        }
        getRecentAds();
    }, []);

    return (
        <>
            <div className="container-fluid search-area">
                <div className='container'>
                    <div className="search-box">
                        <form className="search-form" method="GET" action="/ads">
                            <input type="text" name="q" placeholder='O que você procura?' />
                            <select name="state">
                                {stateList.map((i, k)=>
                                    <option key={k} value={i.name}>{i.name}</option>
                                )}
                            </select>
                            <button>Pesquisar</button>
                        </form>
                    </div>
                    <div className="category-list">
                        {categories.map((i, k)=>
                            <Link key={k} to={`/ads?cat=${i.slug}`} className='category-item'>
                                <img src={i.img} alt="Ícone da Categoria" />
                                <span>{i.name}</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <div className="container">
                <div className='page-area'>
                    <h2>Anúncios Recentes</h2>
                    <div className="list">
                        {adList.map((i, k)=>
                            <AdItem key={k} />
                        )}
                    </div>
                    <Link to="/ads" className='see-all-link'>Ver Todos</Link>
                    <hr />
                    <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolore pariatur voluptatum recusandae tempore eaque error quaerat temporibus cum labore ducimus rerum perferendis quasi, incidunt commodi possimus beatae eos voluptatem.</span>
                </div>
            </div>
        </>
    );
}

export default Home;