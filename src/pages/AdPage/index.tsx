// CSS AND BOOTSTRAP
import { Container } from 'react-bootstrap';
import './style.css';

import Fake from '../../components/partials/Fake';
import Slide from '../../components/partials/ImageSlide';

import { useParams } from 'react-router-dom';

import useApi, { Ad } from '../../helpers/OlxApi';
import { useEffect, useState } from 'react';

const AdPage = () => {
// API CALL AND HOOK
    const api = useApi();
    const id = useParams();

    const [loading, setLoading] = useState(true);
    const [adInfo, setAdInfo] = useState<Ad>(Object);


    useEffect(()=>{
        const getAdInfo = async (id: any) => {
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
                        </div>
                        <div className="box box-padding">
                            {loading && <Fake height={50} />}
                        </div>
                    </div>
                </div>
            </Container>
        </>

    );
}

export default AdPage;