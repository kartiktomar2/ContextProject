import React from 'react'
import { useMealPlanContext } from '../../contexts/MealPlanContext'

const RecipeCard = ({recipe}) => {
  const {addMealToDay, setSelectedRecipe}= useMealPlanContext()
  return (
   <div>
      <h3>Recipe Name: {recipe.name}</h3>
      <p>Recipe Meal Type: {recipe.mealType}</p>
      <p>Recipe Diet: {recipe.diet}</p>
      <p>Recipe Prep Time: {recipe.prepTime} min</p>

      <button onClick={() => addMealToDay("monday", recipe)}>
        Add To Monday
      </button>

      <button onClick={() => setSelectedRecipe(recipe)}>
        View Details
      </button>
    </div>
  )
}

export default RecipeCard
