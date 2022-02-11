import './style.css';

type Props = {
    height: number
}

const Fake = ({height}: Props) => {
    return (
        <div className="fake" style={{height: height}}></div>
    );
}

export default Fake;