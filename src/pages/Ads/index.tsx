import { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import AdItem from '../../components/partials/AdItem';
import useApi, { AdsInterface, Category, State } from '../../helpers/OlxApi';
import './style.css';
import * as Styled from './styles';

// TIMER VARIABLE
let timer: any;

const Ads = () => {
// API CALL AND USENAVIGATE
    const api = useApi();
    const navigate = useNavigate();

// HANDLES QUERY SEARCH AND FILLS THE STATE VARIABLE
    const useQueryString = () => {
        return new URLSearchParams(useLocation().search);
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
    const [adsTotal, setAdsTotal] = useState(0);
    const [stateList, setStateList] = useState<State[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [adList, setAdList] = useState<AdsInterface[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
// LOADING
    const [loading, setLoading] = useState(true);

// GETS ADLIST BASED ON QUERY PARAMETERS
    const MAX_ADS_ON_PAGE = 9;
    const getAdsList = async () => {
        setLoading(true);
        let offset = (currentPage - 1) * MAX_ADS_ON_PAGE;
        const json = await api.getAds({
            sort:'desc',
            limit:MAX_ADS_ON_PAGE,
            q, cat, state,
            offset
        });
        setAdList(json.ads);
        setAdsTotal(json.total);
        setResultOpacity(1);
        setLoading(false);
    }

    useEffect(()=>{
        setResultOpacity(0.3);
        getAdsList();
    }, [currentPage])


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
        timer = setTimeout(getAdsList, 1000);
        setResultOpacity(0.3);
        setCurrentPage(1);
    },[q, cat, state])

// CATEGORIES - USE EFFECT
    useEffect(()=>{
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

// PAGINATION USE EFFECTS
    useEffect(() =>{
        if(adList.length > 0) {
            setPageCount(Math.ceil(adsTotal/adList.length));
        } else {
            setPageCount(0);
        }
        
    }, [adsTotal]);

// HANDLES PAGINATION ARRAY
    let pagination = [];
    for (let i=1; i<=pageCount; i++) {
        pagination.push(i);
    }
    const handlePaginationNext = () => {
        if (currentPage === pagination.length) {
            setCurrentPage(currentPage)
        } else {
            let page = currentPage;
            page++;
            setCurrentPage(page);
        }
    }
    const handlePaginationPrev = () => {
        if (currentPage === 1) {
            setCurrentPage(currentPage)
        } else {
            let page = currentPage;
            page--;
            setCurrentPage(page);
        }
    }

    return (
        <Styled.Wrapper>
            <Styled.AdPage>
                <Styled.AdPageLeftSide>
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
                        <Styled.CategoryList>
                            {categories.map((i, k)=>
                                <Styled.CategoryItem
                                key={k}
                                className={cat== i.slug?'active':''}
                                onClick={()=>setCat(i.slug)}
                                >
                                    <Styled.CategoryImage src={i.img} alt="Imagem da categoria" />
                                    <span>{i.name}</span>
                                </Styled.CategoryItem>
                            )}
                        </Styled.CategoryList>
                    </form>
                </Styled.AdPageLeftSide>
                <Styled.AdPageRightSide>
                    <Styled.AdPageTitles>Resultados</Styled.AdPageTitles>
                    {loading && adList.length === 0 &&
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

                    <Pagination>
                        <Pagination.First />
                        <Pagination.Prev onClick={handlePaginationPrev} />
                        {pagination.slice(0, 3).map((i,k)=>
                            <Pagination.Item
                                onClick={()=>setCurrentPage(i)}
                                key={k}
                                className={i === currentPage ? 'active' : ''}
                            >
                                {i}
                            </Pagination.Item>
                        )}
                        <Pagination.Ellipsis />
                        {
                            currentPage > 3 &&
                            <Pagination.Item active>{currentPage}</Pagination.Item>
                        }
                        <Pagination.Next onClick={handlePaginationNext} />
                        <Pagination.Last />
                    </Pagination>

                </Styled.AdPageRightSide>
            </Styled.AdPage>
        </Styled.Wrapper>
    );
}

export default Ads;