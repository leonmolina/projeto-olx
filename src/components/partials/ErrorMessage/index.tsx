import { Alert } from 'react-bootstrap';

type Props = {
    text: string;
}

const ErrorMessage = ({text}: Props) => {
    return (
        <Alert variant='danger'>
            {text}
        </Alert>
    );
}

export default ErrorMessage;