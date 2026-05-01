

import React from 'react'
import { useGroceryListContext } from '../../contexts/GroceryListContext'

const GroceryItem = ({ ing }) => {
    const { toggleChecked,checkedItems } = useGroceryListContext()
    const itemKey = ing.name+"_"+ing.unit
    const isChecked = checkedItems.includes(itemKey)
    return (
        <label className={`flex cursor-pointer items-center justify-between gap-4 rounded-2xl border px-4 py-3 transition ${isChecked ? "border-emerald-300 bg-emerald-50/80" : "border-stone-200 bg-stone-50 hover:bg-white"}`}>
            <div className="min-w-0">
                <p className={`font-semibold capitalize ${isChecked ? "text-emerald-800 line-through" : "text-stone-800"}`}>{ing.name}</p>
                <p className="text-sm text-stone-500">Quantity: {ing.quantity} {ing.unit}</p>
            </div>
            <input className="h-5 w-5 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500" type="checkbox" 
            checked={isChecked}
             onChange={()=>{
                toggleChecked(ing.name, ing.unit)
             }}
            />
        </label>
    )
}

export default GroceryItem
