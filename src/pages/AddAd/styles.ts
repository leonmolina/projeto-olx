import { Container, Form } from 'react-bootstrap';
import styled from "styled-components";

export const Wrapper = styled(Container)`
`
export const AddAdArea = styled.div`
`
export const FormsAreaTitle = styled.div`
    padding: 20px 0;
`
export const Forms = styled(Form)`
    background-color: var(--background-light);
    border-radius: 3px;
    padding: 10px;
    box-shadow: 0px 0px 3px var(--box-shadow--grey);
`
export const FormsArea = styled(Form.Group)`
    display: flex;
    align-items: center;
    padding: 10px;
    max-width: 500px;
    margin-bottom: 0.25rem !important;
`
export const FormTitle = styled(Form.Label)`
    width: 200px;
    text-align: right;
    padding-right: 20px;
    font-weight: bold;
    font-size: 14px;
`
export const FormCurrencySpan = styled.span`
    font-weight: bold;
    margin-right: 5px;
`