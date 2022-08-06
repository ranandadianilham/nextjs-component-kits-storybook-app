import PropTypes from 'prop-types';

function Button({
    label, 
    isBordered = false, 
    borderColor = 'black', 
    color = 'white', 
    backgroundColor = 'red',
    size = 'md',
    handleClick,
    isRounded = true,
    fontWeight = "bold"}) {
        let scale = 1
        if (size === "sm") scale = 0.75
        if (size === "lg") scale = 1.5
        const style = {
            backgroundColor,
            color: `${color}`,
            padding: `${scale * 0.5}rem ${scale * 1}rem`,
            border: isBordered ? `4px solid ${borderColor}` : "none",
            borderRadius: `${isRounded ? "5px" : "0"}`,
            cursor: 'pointer',
            fontWeight: fontWeight
        }
        return (
            <button onClick={handleClick} style={style}>
                {label}
            </button>
        )
}

export default Button;

Button.propTypes = {
    label: PropTypes.string,
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.oneOf(["sm", "md", "lg"]),
    handleClick: PropTypes.func,
    isRounded: PropTypes.bool,
    isBordered: PropTypes.bool,
    borderColor: PropTypes.string,
}