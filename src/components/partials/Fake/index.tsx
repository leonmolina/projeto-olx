import * as Styled from './styles';

type Props = {
    height: string;
}

const Fake = (props: Props) => {
    return (
        <Styled.Fake height={props.height}></Styled.Fake>
    );
}

export default Fake;