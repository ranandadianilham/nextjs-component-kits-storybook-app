
import PropTypes from 'prop-types';

function Input({title = "Judul",label = "", type="text", placeholder=""}) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
        width: '400px',
        background: '#fff',
        padding: '40px',
        boxSizing: 'border-box',
        border: "1 solid rgba(0,0,0,.1)",
        boxShadow: "0 5px 10px rgba(0,0,0,.2)",
        }
    return (
        <div className="box" style={style}>
                <h2>{title}</h2>
                <input type={type} name="" placeholder={placeholder} required={true}/>
                <label>{label}</label>
        </div>
    );
}
export default Input;

Input.propTypes = {
    title: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
}