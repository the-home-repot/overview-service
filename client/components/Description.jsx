import React from 'react';
import DescriptionItem from './DescriptionItem.jsx'

const Description = ({tempvar}) => {
   return (
     <ul> 
       {tempvar.map((val, i) => {
         return <DescriptionItem key={i} listVal={val} />
       })}
     </ul>
   )
}
export default Description;