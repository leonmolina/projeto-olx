import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Announced = styled.div`
    width: 25%;
`
export const AnnouncedBody = styled(Link)`
    display: block;
    border: 1px solid var(--border-white);
    margin: 10px;
    text-decoration: none;
    padding: 10px;
    border-radius: 5px;
    color: var(--text);
    background-color: var(--background-light);
    transition: all ease .2s;
    &:hover {
        border: 1px solid var(--border-grey);
        background-color: var(--background-announced);
    }
`
export const AnnouncedImageArea = styled.div`
`
export const AnnouncedImage = styled.img`
    width: 100%;
    border-radius: 5px;
`
export const AnnouncedTitle = styled.div`
    font-weight: bold;
`
export const AnnouncedPrice = styled.div`
`