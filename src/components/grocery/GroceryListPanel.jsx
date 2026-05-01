

import React from 'react'
import { useGroceryListContext } from '../../contexts/GroceryListContext'
import GroceryItem from './GroceryItem'

const GroceryListPanel = () => {
    const {groceryItems,clearCheckedItems,checkedItems}= useGroceryListContext()
  return (
    <section className="rounded-4xl border border-stone-200/80 bg-white/90 p-6 shadow-[0_18px_40px_-28px_rgba(126,85,43,0.45)] backdrop-blur">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-stone-900">Grocery List</h3>
          <p className="mt-1 text-sm text-stone-600">Ingredients combine automatically from your planned meals.</p>
        </div>
        <div className="text-right">
          <p className="rounded-full bg-stone-100 px-4 py-2 text-sm font-semibold text-stone-700">Total: {groceryItems.length}</p>
        </div>
      </div>
     {checkedItems.length>0&&<button className="mb-4 rounded-full border border-stone-300 bg-stone-50 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-rose-400 hover:bg-rose-50 hover:text-rose-700" onClick={clearCheckedItems}>Clear Checked Items</button>}
      {
            groceryItems.length>0? <div className="space-y-3">
                   {
                         groceryItems.map(item=>{
                            return <GroceryItem key={item.name+"_"+item.unit} ing={item}/>
                                
                                  
                            
                         })
                   } 
            </div> 
            
            :
            
            <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-4 py-8 text-center text-sm text-stone-600">No grocery items yet. Add meals to see ingredients appear here.</div>
      }
    </section>
  )
}

export default GroceryListPanel
