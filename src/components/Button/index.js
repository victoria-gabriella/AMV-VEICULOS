import React from 'react';
import './styles.css';

const Button = (props) => (
    <button
     type="button"
     className={props.className}
     onClick={props.onClick}
    >
      {props.name}
    </button>
      
);

export default Button;
