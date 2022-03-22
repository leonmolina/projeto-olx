import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import useApi, { AdsInterface, Category, State } from '../../helpers/OlxApi';
import './style.css';


const Ads = () => {
// API CALL AND USE STATES
    const api = useApi();
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
                        <input type="text" name="q" />

                        <div className="filterName">Estado:</div>
                            <select name="state">
                                <option value=""></option>
                                {stateList.map((i, k)=>
                                    <option key={k} value={i.name}>{i.name}</option>
                                )}
                            </select>
                        <div className="filterName">Categoria:</div>
                        <ul>
                            {categories.map((i, k)=>
                                <li key={k} className="categoryItem">
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