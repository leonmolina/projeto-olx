import './style.css';
import { Carousel, CarouselItem } from 'react-bootstrap';

type Props = {
    images: string[];
}

const Slide = ({images}: Props) => {
    return (
        <Carousel>
            {images.map((img, k) =>
                <CarouselItem key={k} className="each-slide">
                    <img src={img} alt="Imagem do Anúncio" />
                </CarouselItem>
            )}
        </Carousel>
    );
}

export default Slide;