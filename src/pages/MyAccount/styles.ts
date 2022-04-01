import { Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from "styled-components";

export const Wrapper = styled(Container)`
    display: flex;
    flex-direction: column;
`
export const AccountTitle = styled.h2`
    font-size: 20px;
    margin: auto;
`
export const AccountDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const AccountName = styled.div`
`
export const AccountEmail = styled.div`
`
export const AccountState = styled.div`
`
export const AccountEditButtonArea = styled.div`
    display: flex;
    justify-content: flex-end;
`
export const Forms = styled(Form)`
`
export const FormsGroup = styled(Form.Group)`
`
export const FormsLabel = styled(Form.Label)`
`
export const MyAnnounced = styled.div`
`
export const MyAnnouncedTitle = styled.h2`
    font-size: 20px;
    margin: auto;
`
export const AnnouncedList = styled.div`
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