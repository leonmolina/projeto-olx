import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from "styled-components";

export const Wrapper = styled(Container)`
`
// BREADCRUMB
export const Breadcrumb = styled.div`
    font-size: 13px;
    margin-top: 20px;
`
export const BreadcrumbSpan = styled.span`
    &:last-child {
        margin-right: 5px;
    }
`
export const BreadcrumbLink = styled(Link)`
    display: inline-block;
    margin: 0 5px;
    text-decoration: underline;
    color: var(--text);
`
export const ItemPageContainer = styled.div`
    display: flex;
    margin-top: 20px;
`
// LEFT SIDE
export const PageLeftSide = styled.div`
    flex: 1;
    margin-right: 20px;
`
export const ItemImage = styled.div`
    width: 320px;
    height: 320px;
    margin-right: 20px;
`
export const ItemInfo = styled.div`
    flex: 1;
    padding-right: 10px;
`
export const ItemName = styled.div`
    margin-bottom: 20px;
`
export const ItemNameTitle = styled.h2`
    font-weight: 600;
    margin: 0;
    margin-top: 20px;
`
export const ItemNameSmall = styled.small`
    font-weight: 500;
    color: var(--text-light);
`
export const ItemDescription = styled.div`
`
export const ItemDescriptionSmall = styled.small`
    color: var(--text-light);
`
// RIGHT SIDE
export const PageRightSide = styled.div`
    width: 250px;
`
// SELLER INFO
export const SellerInfoArea = styled.div`
`
export const SellerContactLink = styled.a`
    width: 100%;
    margin-bottom: 20px;
    background-color: var(--seller-background);
`
// OTHERS 
export const OthersArea = styled.div`
`
export const OthersTitle = styled.h2`
    font-size: 20px;
    font-weight: bold;
`
export const OthersList = styled.div`
`
// BOX
export const Box = styled.div`
    background-color: #FFF;
    border-radius: 5px;
    box-shadow: 0px 0px 4px var(--box-shadow--grey);
    margin-bottom: 20px;
    &.box-padding {
        padding: 10px;
    }
`
export const BoxStrong = styled.strong`
    display: block;
`
export const BoxSmall = styled.small`
    display: block;
    color: var(--text-light);
    margin-top: 10px;
`
export const BoxPrice = styled.div`
`
export const BoxPriceSpan = styled.span`
    color: var(--text-blue);
    display: block;
    font-size: 27px;
    font-weight: bold;
`