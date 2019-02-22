import React from 'react';

const Price = ({price}) => {
   return (
     <div className="price">
     <div className="price_ds">$</div>
     <div className="price_dollars">{price}</div>
     <div className="price_cents">0</div>
     </div>
   )
}
export default Price;