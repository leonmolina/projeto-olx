import styled from "styled-components";
type Props = {
    height: string;
}
export const Fake = styled.div<Props>`
    background-color:var(--background-alt);
    height: ${props => props.height ? props.height : '30px'};
`