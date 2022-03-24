import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import useApi, { AdsInterface, Category, State } from '../../helpers/OlxApi';
import './style.css';


const Ads = () => {
// API CALL
    const api = useApi();
// HANDLES QUERY SEARCH AND FILLS THE STATE VARIABLE
    const useQueryString = () => {
        return new URLSearchParams( useLocation().search );
    }
    const query = useQueryString();
    const auxVerifyQuery = (querySearch: string) => {
        let resultQuery: any = ''
        if (querySearch == null) {
            resultQuery = ''
        } else {
            resultQuery = query.get(querySearch)
        }
        return resultQuery
        // return query.get(querySearch) != null ? query.get(querySearch) : ''
    }
    const [q, setQ] = useState(auxVerifyQuery('q'));
    const [cat, setCat] = useState(auxVerifyQuery('cat'));
    const [state, setState] = useState(auxVerifyQuery('state'));
// USE STATES
    const [stateList, setStateList] = useState<State[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [adList, setAdList] = useState<AdsInterface[]>([]);
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
                        />
                        <div className="filterName">Estado:</div>
                            <select name="state" value={state}>
                                <option value=""></option>
                                {stateList.map((i, k)=>
                                    <option key={k} value={i.name}>{i.name}</option>
                                )}
                            </select>
                        <div className="filterName">Categoria:</div>
                        <ul>
                            {categories.map((i, k)=>
                                <li key={k} className={cat== i.slug?'categoryItem active':'categoryItem'}>
                                    <img src={i.img} alt="Imagem da categoria" />
                                    <span>{i.name}</span>
                                </li>
                            )}
                        </ul>
                    </form>
                </div>
                <div className="ad-page--rightSide">
                    ...
                </div>
            </div>
        </Container>
    );
}

export default Ads;