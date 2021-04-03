import React from 'react';
import './styles.css';

const CardOffer = (props) => (
  <div 
    className="oc-card"
    key={props.id}
  >
    <img src={props.image} alt={props.altImage}/>
    <div className="oc-infos-card">
      <h2>{props.model}</h2>
      <span><strong>Brand: </strong>{props.brand}</span>
      <span><strong>Price: </strong>R$ {props.price}</span>
      <span><strong>Year: </strong>{props.year}</span>
    </div>
    <div className="oc-views-card">
    <span><strong>Views: </strong>{props.views}</span>
    </div>
  </div>
)

export default CardOffer;