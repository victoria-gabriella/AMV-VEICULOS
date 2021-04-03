import React from 'react';
import ImgPattern from '../../assets/img-pattern.png'
import Button from '../../components/Button';
import './styles.css';

const OfferItem = (props) => (
  
    <li 
      className='oc-item-list'
      key={props.id}
    >
      <div className="oc-elem-item">
        <img src={ImgPattern} alt="Car"/>
      </div>
      <div className="oc-elem-item infos-item-list">
        <h3>Brand: {props.brand}</h3>
        <span><strong>Model: </strong>{props.model}</span>
      </div>
      <div className="oc-elem-item oc-options-item ">
        <Button
          name="Edit"
          className="green"
          onClick={props.onClickEdit}
        />
        <Button
          name="Delete"
          className="orange"
          onClick={props.onClickDelete}
        />
      </div>
    </li>      
);

export default OfferItem;
