import React from "react";

const Button = ({ className, children, onClick }) => (
  <button onClick={onClick} className={className} >
    {children}
  </button>
)

export default Button;
