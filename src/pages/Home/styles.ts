import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const SearchArea = styled.div`
    background-color: var(--background-alt);
    border-bottom: 1px solid var(--border-grey);
    width: 100%;
    padding: 20px 0;
`
export const Wrapper = styled(Container)`
`
export const SearchBox = styled.div`
    background-color: var(--background-search);
    padding: 10px 5px;
    border-radius: 5px;
    box-shadow: 1px 1px 1px 0.3px rgba(var(--box-shadow), 0.2);
    display: flex;
`
export const SearchForm = styled(Form)`
    flex: 1;
    width: 100%;
    box-shadow: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: inherit;
    margin: 0;
`
export const SearchInputGroup = styled(Form.Group)`
`
export const SearchInput = styled(Form.Control)`
    height: 40px;
    border: 0;
    border-radius: 5px;
    outline: 0;
    font-size: 15px;
    color: var(--text);
    .search-input--text {
        width: 100%;
        padding: 0 10px;
    }
`
export const SearchSelect = styled(Form.Select)`
    height: 40px;
    border: 0;
    border-radius: 5px;
    outline: 0;
    font-size: 15px;
    color: var(--text);
`
export const SearchButton = styled(Button)`
    height: 40px;
    width: 100%;
`
export const CategoryList = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
`
export const CategoryItem = styled(Link)`
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text);
    text-decoration: none;
    height: 50px;
    &:hover {
        color: var(--text-light);
    }
`
export const CategoryImage = styled.img`
    width: 45px;
    height: 45px;
    margin-right: 10px;
`
export const CategoryName = styled.span`
`
export const HomePage = styled.div`
`
export const HomeTitle = styled.h2`
    font-size: 20px;
`
export const HomeList = styled.div`
    display: flex;
    flex-wrap: wrap;
`
export const SeeAllLink = styled(Link)`
    color: var(--text);
    text-decoration: none;
    font-weight: bold;
    display: inline-block;
    margin-top: 10px;
`