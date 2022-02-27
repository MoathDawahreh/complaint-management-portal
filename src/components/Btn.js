const Button = (props) => {
    return (
        <button onClick={props.onSubmit} className="btn">
            {props.text}
        </button>
    )
}

export default Button
