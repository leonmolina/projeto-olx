import { Carousel, CarouselItem } from 'react-bootstrap';
import * as Styled from './styles';

type Props = {
    images: string[];
}

const Slide = ({images}: Props) => {
    return (
        <Carousel>
            {images.map((img, k) =>
                <CarouselItem key={k}>
                    <Styled.SlideImage src={img} alt="Imagem do Anúncio" />
                </CarouselItem>
            )}
        </Carousel>
    );
}

export default Slide;