import { Link } from 'react-router-dom';
import noimage from '../../../assets/images/no-image.png';
import { AnnouncedType } from '../../../helpers/OlxApi';
import './style.css';

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
                    {props.data.images &&
                        <img
                        // SHOWS ONLY THE FIRST IMAGE OF THE PRODUCT ON MY-ACCOUNT PAGE
                        src={`http://alunos.b7web.com.br:501/media/${props.data.images[0].url}`}
                        alt="Primeira imagem do produto anunciado"
                        />
                    }
                    {!props.data.images &&
                        <img src={img} alt="Imagem do produto anunciado" />
                    }
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