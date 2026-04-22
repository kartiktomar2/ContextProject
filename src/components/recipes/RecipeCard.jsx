import React from 'react'

const RecipeCard = ({recipe}) => {
  return (
    <div>
          Recipe Name: {recipe.name}
          Meal Type: {recipe.mealType}
          Diet: {recipe.diet}
          Prep Time: {recipe.prepTime} min 
    </div>
  )
}

export default RecipeCard
