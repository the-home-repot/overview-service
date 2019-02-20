import React from 'react';
import DescriptionItem from './DescriptionItem.jsx'

const Description = ({descriptions}) => {
   return (
     <ul> 
       {descriptions.map((val, i) => {
         return <DescriptionItem key={i} listVal={val.description} />
       })}
     </ul>
   )
}
export default Description;