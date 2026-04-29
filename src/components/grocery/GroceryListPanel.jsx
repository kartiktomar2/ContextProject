

import React from 'react'
import { useGroceryListContext } from '../../contexts/GroceryListContext'
import GroceryItem from './GroceryItem'

const GroceryListPanel = () => {
    const {groceryItems}= useGroceryListContext()
  return (
    <div>
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
