import noimage from '../../../assets/images/no-image.png';
import { AnnouncedType } from '../../../helpers/OlxApi';
import * as Styled from './styles';

const AdItem = (props: AnnouncedType) => {
    // EMPTY PRICE AND IMAGE VARIABLES
    let price = '';
    let img = '';
    // PRICE NEGOTIABLE
    if(props.data.priceNegotiable) {
        price = 'Preço Negociável';
    } else {
        price = `R$ ${props.data.price}`;
    }
    // NO IMAGE FOUND
    if(props.data.image === "http://alunos.b7web.com.br:501/media/default.jpg") {
        img = noimage
    } else {
        img = props.data.image
    }

    return (
        <Styled.Announced width={'25%'}>
            <Styled.AnnouncedBody to={`/ad/${props.data.id}`}>
                <Styled.AnnouncedImageArea className="item-image">
                    {props.data.images &&
                        <Styled.AnnouncedImage
                        // SHOWS ONLY THE FIRST IMAGE OF THE PRODUCT ON MY-ACCOUNT PAGE
                        src={`http://alunos.b7web.com.br:501/media/${props.data.images[0].url}`}
                        alt="Primeira imagem do produto anunciado"
                        />
                    }
                    {!props.data.images &&
                        <Styled.AnnouncedImage src={img} alt="Imagem do produto anunciado" />
                    }
                </Styled.AnnouncedImageArea>
                <Styled.AnnouncedTitle className="item-name">
                    {props.data.title}
                </Styled.AnnouncedTitle>
                <Styled.AnnouncedPrice className="item-price">
                    {price}
                </Styled.AnnouncedPrice>
            </Styled.AnnouncedBody>
        </Styled.Announced>
    );
}
export default AdItem;