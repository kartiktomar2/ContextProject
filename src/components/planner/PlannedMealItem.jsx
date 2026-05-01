

import React from 'react'
import { useMealPlanContext } from '../../contexts/MealPlanContext'

const PlannedMealItem = ({ day, meal }) => {
    const { removeMealFromDay, setSelectedRecipe } = useMealPlanContext()
    return (
        <div>
            Recipe Name: {meal.name}
            Meal Type: {meal.mealType}
            Diet: {meal.diet}
            Prep Time: {meal.prepTime} min
             <button 
             onClick={()=>{
                   setSelectedRecipe(meal)
             }}
             >
                View Details 
             </button>
            <button onClick={()=>{
                removeMealFromDay(day,meal.id)
            }}>Remove Recipe</button>
        </div>
    )
}

export default PlannedMealItem
