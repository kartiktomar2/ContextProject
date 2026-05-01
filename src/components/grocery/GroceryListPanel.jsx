

import React from 'react'
import { useGroceryListContext } from '../../contexts/GroceryListContext'
import GroceryItem from './GroceryItem'

const GroceryListPanel = () => {
    const {groceryItems,clearCheckedItems,checkedItems}= useGroceryListContext()
  return (
    <div>
      <h3>Grocery List Pannel </h3>
      <p>Grocery Count: {groceryItems.length}</p>
     {checkedItems.length>0&&<button onClick={clearCheckedItems}>Clear Checked Item </button>}
      {
            groceryItems.length>0? <div>
                   {
                         groceryItems.map(item=>{
                            return <GroceryItem key={item.name+"_"+item.unit} ing={item}/>
                                
                                  
                            
                         })
                   }

            </div> 
            
            :
            
            <div>No Grocery Items </div>
      }
    </div>
  )
}

export default GroceryListPanel
