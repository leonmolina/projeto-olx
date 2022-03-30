// CSS AND BOOTSTRAP
// REACT
import { useEffect, useState } from 'react';
import AdItem from '../../components/partials/AdItem';
// REQUISITION AND PARTIALS
import useApi, { AdsInterface, Category, State } from '../../helpers/OlxApi';
import * as Styled from './styles';

const Home = () => {
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
        <>
            {/* SEARCH CONTAINER */}
            <Styled.SearchArea>
                <Styled.Wrapper>
                    {/* SEARCH BAR */}
                    <Styled.SearchBox>
                        {/* SEARCH FORM */}
                        <Styled.SearchForm method="GET" action="/ads">
                            {/* SEARCH TEXT */}
                            <Styled.SearchInputGroup className='col-lg-9 col-md-6 col-sm-6 px-2'>
                                <Styled.SearchInput
                                        type="text"
                                        className="search-input--text"
                                        name="q"
                                        placeholder='O que você procura?'>
                                </Styled.SearchInput>
                            </Styled.SearchInputGroup>
                            {/* SEARCH SELECT */}
                            <Styled.SearchInputGroup className='col-lg-1 col-md-4 col-sm-4 px-2'>
                                <Styled.SearchSelect>
                                    {stateList.map((i, k)=>
                                        <option key={k} value={i.name}>{i.name}</option>
                                    )}
                                </Styled.SearchSelect>
                            </Styled.SearchInputGroup>
                            {/* SEARCH BUTTON */}
                            <Styled.SearchInputGroup className='col-lg-2 col-md-2 col-sm-2 px-2'>
                                <Styled.SearchButton variant="primary" type="submit">Pesquisar</Styled.SearchButton>
                            </Styled.SearchInputGroup>
                        </Styled.SearchForm>
                    </Styled.SearchBox>
                    {/* CATEGORY LIST */}
                    <Styled.CategoryList>
                        {categories.map((i, k)=>
                            <Styled.CategoryItem key={k} to={`/ads?cat=${i.slug}`}>
                                <Styled.CategoryImage src={i.img} alt="Ícone da Categoria" />
                                <Styled.CategoryName>{i.name}</Styled.CategoryName>
                            </Styled.CategoryItem>
                        )}
                    </Styled.CategoryList>
                </Styled.Wrapper>
            </Styled.SearchArea>
            {/* ADS CONTAINER */}
            <Styled.Wrapper>
                <Styled.HomePage>
                    <Styled.HomeTitle>Anúncios Recentes</Styled.HomeTitle>
                    <Styled.HomeList>
                        {adList.map((i, k)=>
                            <AdItem key={k} data={i}/>
                        )}
                    </Styled.HomeList>
                    <Styled.SeeAllLink to="/ads">Ver Todos</Styled.SeeAllLink>
                    <hr />
                    <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo dolore pariatur voluptatum recusandae tempore eaque error quaerat temporibus cum labore ducimus rerum perferendis quasi, incidunt commodi possimus beatae eos voluptatem.</span>
                </Styled.HomePage>
            </Styled.Wrapper>
        </>
    );
}

export default Home;