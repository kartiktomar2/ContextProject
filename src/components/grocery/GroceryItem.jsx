

import React from 'react'
import { useGroceryListContext } from '../../contexts/GroceryListContext'

const GroceryItem = ({ ing }) => {
    const { toggleChecked,checkedItems } = useGroceryListContext()
    return (
        <div>
            <p>Name:{ing.name}</p>
            <p>Quantity: {ing.quantity}</p>
            <input type="checkbox" 
            checked={checkedItems.includes(ing.name+"_"+ing.unit)}
             onChange={()=>{
                toggleChecked(ing.name, ing.unit)
             }}
            />
        </div>
    )
}

export default GroceryItem
