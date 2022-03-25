import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import AdItem from '../../components/partials/AdItem';
import useApi, { AdsInterface, Category, State } from '../../helpers/OlxApi';
import './style.css';

// TIMER VARIABLE
let timer: any;

const Ads = () => {
// API CALL AND USENAVIGATE
    const api = useApi();
    const navigate = useNavigate();

// HANDLES QUERY SEARCH AND FILLS THE STATE VARIABLE
    const useQueryString = () => {
        return new URLSearchParams( useLocation().search );
    }
    const query = useQueryString();
    // CHECKS IF THE QUERY IS NULL, AND IF NOT, IT SEARCHES DEPENDING ON THE PARAMETERS
    const auxVerifyQuery = (querySearch: string) => {
        let resultQuery: any = ''
        if (querySearch == null) {
            resultQuery = ''
        } else {
            resultQuery = query.get(querySearch)
        }
        return resultQuery;
    }
    const [q, setQ] = useState(auxVerifyQuery('q'));
    const [cat, setCat] = useState(auxVerifyQuery('cat'));
    const [state, setState] = useState(auxVerifyQuery('state'));
    const [resultOpacity, setResultOpacity] = useState(1);
// USE STATES
    const [stateList, setStateList] = useState<State[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [adList, setAdList] = useState<AdsInterface[]>([]);
// LOADING
    const [loading, setLoading] = useState(true);

// GETS ADLIST BASED ON QUERY PARAMETERS
    const getAdsList = async () => {
        setLoading(true);
        const json = await api.getAds({
            sort:'desc',
            limit:8,
            q,
            cat,
            state
        });
        setAdList(json.ads);
        setResultOpacity(1);
        setLoading(false);
    }

// STATES - USE EFFECT
    useEffect(()=>{
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, []);

// CHANGES QUERY BASED ON THE PARAMETERS - USE EFFECT

    useEffect(()=>{
        let queryString = [];
        if(q) {
            queryString.push(`q=${q}`);
        }
        if(cat) {
            queryString.push(`cat=${cat}`);
        }
        if(state) {
            queryString.push(`state=${state}`);
        }
        navigate(`?${queryString.join('&')}`, { replace: true });
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(getAdsList, 2000);
        setResultOpacity(0.3);
    },[q, cat, state])

// CATEGORIES - USE EFFECT
    useEffect(()=>{
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    return (
        <Container>
            <div className="ad-page--area">
                <div className="ad-page--leftSide">
                    <form method="GET">
                        <input
                        type="text"
                        name="q"
                        placeholder='O que você procura?'
                        value={q}
                        onChange={e=>setQ(e.target.value)}
                        />
                        <div className="filterName">Estado:</div>
                            <select name="state" value={state} onChange={e=>setState(e.target.value)}>
                                <option value=""></option>
                                {stateList.map((i, k)=>
                                    <option key={k} value={i.name}>{i.name}</option>
                                )}
                            </select>
                        <div className="filterName">Categoria:</div>
                        <ul>
                            {categories.map((i, k)=>
                                <li
                                key={k}
                                className={cat== i.slug?'categoryItem active':'categoryItem'}
                                onClick={()=>setCat(i.slug)}
                                >
                                    <img src={i.img} alt="Imagem da categoria" />
                                    <span>{i.name}</span>
                                </li>
                            )}
                        </ul>
                    </form>
                </div>
                <div className="ad-page--rightSide">
                    <h2>Resultados</h2>
                    {loading &&
                        <div className="list-warning">Carregando...</div>
                    }
                    {!loading && adList.length == 0 &&
                        <div className="list-warning">Nenhum resultado foi encontrado.</div>
                    }

                    <div className="list" style={{opacity:resultOpacity}}>
                        {adList.map((i, k)=>
                            <AdItem key={k} data={i} />
                        )}
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Ads;