// CSS AND BOOTSTRAP
import { Container } from 'react-bootstrap';
import './style.css';

import Fake from '../../components/partials/Fake';

import { useParams } from 'react-router-dom';

import useApi, { Ad } from '../../helpers/OlxApi';
import { useEffect, useState } from 'react';

const AdPage = () => {
// API CALL AND HOOK
    const api = useApi();
    const slug = useParams();
    const id = slug.item;

    const [loading, setLoading] = useState(true);
    const [adInfo, setAdInfo] = useState<Ad>(Object);


    useEffect(()=>{
        const getAdInfo = async (id: any) => {
            const json = await api.getAd(id, true);
            setAdInfo(json);
            setLoading(false);
        }
        getAdInfo(id);
        console.log(adInfo)
        console.log(id)
    }, []);

    return (
        <>
            <Container>
                <div className='item-page--area'>
                    <div className="left-side">
                        <div className="box">
                            <div className="item-img">
                                {loading && <Fake height={300} />}
                                {adInfo.title &&
                                    <h2>{adInfo.title}</h2>
                                }
                            </div>
                            <div className="item-info">
                                <div className="item-name">
                                    {loading && <Fake height={20} />}
                                </div>
                                <div className="item-description">
                                    {loading && <Fake height={100} />}
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