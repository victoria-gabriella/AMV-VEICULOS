import React from 'react';
import './styles.css';

const Input = (props) => (
    <label>{props.label}
      <input 
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </label>  
      
);

export default Input;
