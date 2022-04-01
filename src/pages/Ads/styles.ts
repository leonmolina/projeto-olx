import { Container, Form } from 'react-bootstrap';
import styled from "styled-components";

export const Wrapper = styled(Container)`
`
export const AdPage = styled.div`
    display: flex;
    margin-top: 20px;
`
export const AdPageTitles = styled.h2`
`
export const AdPageLeftSide = styled.div`
    width: 250px;
    margin-right: 10px;
`
export const CategoryList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`
export const CategoryItem = styled.li`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    color: var(--text);
    cursor: pointer;
    &.active {
        background-color: var(--background-search);
        color: var(--text-white);
    }
    &:hover {
        background-color: var(--background-search);
        color: var(--text-white);
    }
    &span {
        font-size: 14px;
    }
`
export const CategoryImage = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 5px;
`
export const Forms = styled(Form)`
`
export const FormsGroup = styled(Form.Group)`
    width: 100%;
    height: 40px;
    border: 2px solid var(--border-alt);
    border-radius: 5px;
    outline: none;
    font-size: 15px;
    color: var(--text);
    padding: 0 10px;
`
export const Filters = styled.div`
    font-size: 15px;
    margin: 10px 0;
`
export const AdPageRightSide = styled.div`
    flex: 1;
`
export const AdList = styled.div`
`