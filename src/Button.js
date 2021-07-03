import React from "react";
import './Button.css'

const Button = ({ className, children, disabled, onClick }) => (
  <button
    className={ `button ${className}` }
    disabled={ disabled }
    onClick={ onClick }
  >
    { children }
  </button>
)

export default Button;
