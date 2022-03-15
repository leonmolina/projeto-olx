// CSS AND BOOTSTRAP
import { Container, Breadcrumb } from 'react-bootstrap';
import './style.css';

import Fake from '../../components/partials/Fake';
import Slide from '../../components/partials/ImageSlide';
import AdItem from '../../components/partials/AdItem';

import { useParams, Link } from 'react-router-dom';

import useApi, { Ad } from '../../helpers/OlxApi';
import { useEffect, useState } from 'react';

const AdPage = () => {
// API CALL AND HOOK
    const api = useApi();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [adInfo, setAdInfo] = useState<Ad>(Object);


    useEffect(()=>{
        const getAdInfo = async (id: string | undefined) => {
            const json = await api.getAd(id, true);
            setAdInfo(json);
            setLoading(false);
        }
        getAdInfo(id);
    }, []);

    const formatDate = (date: string) => {
        let cDate = new Date(date);

        let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        let cDay = cDate.getDate();
        let cMonth = cDate.getMonth();
        let cYear = cDate.getFullYear();

        return `${cDay} de ${months[cMonth]} de ${cYear}`;
    }

    return (
        <>
            <Container>
                {adInfo.category &&
                    <div className='breadcrumb'>
                        <span>Você está aqui:</span>
                        <Link to="/">Home</Link>
                        <span>/</span>
                        <Link to={`/ads?state=${adInfo.stateName}`}>{adInfo.stateName}</Link>
                        <span>/</span>
                        <Link to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}>{adInfo.category.name}</Link>
                        <span>/</span>
                        {adInfo.title}
                    </div>
                }
                <div className='item-page--area'>
                    <div className="left-side">
                        <div className="box">
                            <div className="item-img">
                                {loading && <Fake height={300} />}
                                {adInfo.images &&
                                    <Slide images={adInfo.images}/>
                                }
                            </div>
                            <div className="item-info">
                                <div className="item-name">
                                    {loading && <Fake height={20} />}
                                    {adInfo.title &&
                                        <h2>{adInfo.title}</h2>
                                    }   
                                    {adInfo.dateCreated &&
                                        <small>Criado em {formatDate(adInfo.dateCreated)}</small>
                                    }
                                </div>
                                <div className="item-description">
                                    {loading && <Fake height={100} />}
                                    {adInfo.description}
                                    <hr />
                                    {adInfo.views &&
                                        <small>Visualizações: {adInfo.views}</small>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="box box-padding">
                            {loading && <Fake height={20} />}
                            {adInfo.priceNegotiable && 
                                "Preço Negociável"
                            }
                            {!adInfo.priceNegotiable && adInfo.price &&
                                <div className="price">Preço: <span>R$ {adInfo.price}</span></div>
                            }
                        </div>
                        {loading && <Fake height={50} />}
                        {adInfo.userInfo &&
                            <>
                                <a href={`mailto:${adInfo.userInfo.email}`} target="_blank" className='btn btn-primary contactSellerLink'>Fale com o vendedor</a>
                                <div className="createdBy box box-padding">
                                    <strong>{adInfo.userInfo.name}</strong>
                                    <small>E-mail: {adInfo.userInfo.email}</small>
                                    <small>Estado: {adInfo.stateName}</small>
                                </div>
                            </>
                        }
                    </div>
                </div>
                {adInfo.others &&
                    <div className='others-area'>
                        <h2>Outras ofertas do vendedor</h2>
                        <div className="list">
                            {adInfo.others.map((i, k)=>
                                <AdItem key={k} data={i} />
                            )}
                        </div>
                    </div>
                }
            </Container>
        </>

    );
}

export default AdPage;