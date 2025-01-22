import './Square.css';

const Square = ({ value, onClick }) => {

    const style = {
        color: value === 'X' ? 'red' : value === 'O' ? 'blue' : 'black',
    };

    return (
        <button className="square" onClick={onClick} style={style}>
            {value}
        </button>
    )
};

export default Square;