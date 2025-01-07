import React from 'react';

const Market = ({ market }) => (
  <div>
    <h1>Transfer Market</h1>
    <ul>
      {market.map((item, index) => (
        <li key={index}>{item.player} from {item.team} - ${item.price}</li>
      ))}
    </ul>
  </div>
);

export default Market;
