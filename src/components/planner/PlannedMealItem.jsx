

import React from 'react'
import { useMealPlanContext } from '../../contexts/MealPlanContext'

const PlannedMealItem = ({ day, meal }) => {
    const { removeMealFromDay, setSelectedRecipe } = useMealPlanContext()
    return (
        <div className="rounded-2xl border border-stone-200 bg-white px-4 py-4 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                    <h4 className="text-base font-bold text-stone-900">{meal.name}</h4>
                    <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                        <span className="rounded-full bg-orange-100 px-2.5 py-1 text-orange-700">{meal.mealType}</span>
                        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-emerald-700">{meal.diet}</span>
                        <span className="rounded-full bg-stone-100 px-2.5 py-1 text-stone-700">{meal.prepTime} min</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
             <button
             className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-emerald-500 hover:text-emerald-800"
             onClick={()=>{
                   setSelectedRecipe(meal)
             }}
             >
                View Details 
             </button>
            <button
            className="rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-200"
            onClick={()=>{
                removeMealFromDay(day,meal.id)
            }}>Remove Recipe</button>
                </div>
            </div>
        </div>
    )
}

export default PlannedMealItem
