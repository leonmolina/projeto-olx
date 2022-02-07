// CSS AND BOOTSTRAP
import { Container } from 'react-bootstrap';
import './style.css';

import { useParams } from 'react-router-dom';

import useApi from '../../helpers/OlxApi';
import { useState } from 'react';

const AdPage = () => {
// API CALL AND HOOK
    const api = useApi();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [adInfo, setAdInfo] = useState([]);



    return (
        <>
            <Container>
                <div className='ad-page--area'>
                    <div className="left-side">
                        <div className="box">
                            <div className="ad-img">
                                ...
                            </div>
                            <div className="ad-info">
                                <div className="ad-name">
                                    ...
                                </div>
                                <div className="ad-description">
                                    ...
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="box">...</div>
                        <div className="box">...</div>
                    </div>
                </div>
            </Container>
        </>

    );
}

export default AdPage;