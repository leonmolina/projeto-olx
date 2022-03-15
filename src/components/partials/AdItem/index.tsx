import './style.css';
import { Link } from 'react-router-dom';

import noimage from './images/sem-imagem.png'

type AnnouncedType = {
    data: {
        id: string,
        image: string,
        price: number,
        priceNegotiable: boolean,
        title: string
    }
}
const noImage = noimage;

const AdItem = (props: AnnouncedType) => {
    let price = '';

    if(props.data.priceNegotiable) {
        price = 'Preço Negociável';
    } else {
        price = `R$ ${props.data.price}`;
    }

    let img = '';
    if(props.data.image === "http://alunos.b7web.com.br:501/media/default.jpg") {
        img = noImage
    } else {
        img = props.data.image
    }

    return (
        <div className='announced-item'>
            <Link to={`/ad/${props.data.id}`}>
                <div className="item-image">
                    <img src={img} alt="Imagem do produto anunciado" />
                </div>
                <div className="item-name">
                    {props.data.title}
                </div>
                <div className="item-price">
                    {price}
                </div>
            </Link>
        </div>
    );
}

export default AdItem;