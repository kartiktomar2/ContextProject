

import React from 'react'
import { useMealPlanContext } from '../../contexts/MealPlanContext'
import { usePreferencesContext } from '../../contexts/PreferencesContext';

const RecipeDetailsModal = () => {

    const { selectedRecipe, clearSelectedRecipe, addMealToDay } = useMealPlanContext();
    const { servings } = usePreferencesContext();
    if (!selectedRecipe) {
        return null;
    }

    return (
        <div>
            <div>
                <h2>{selectedRecipe.name}</h2>
                <button onClick={clearSelectedRecipe}>Close</button>

                <div>
                    <p>Recipe Name:  {selectedRecipe.name}</p>
                    <p>Recipe Meal Type: {selectedRecipe.mealType}</p>
                    <p>Recipe Diet: {selectedRecipe.diet}</p>
                    <p>Recipe Prep Time: {selectedRecipe.prepTime}</p>
                    <div>
                       Recipe Ingredients:
                        {
                            selectedRecipe.ingredients.map((ing) => {

                                return <div key={ing.name + "_" + ing.unit}>
                                    <p>ingredient's name: {ing.name}</p>
                                    <p>ingredient's qunatity:{ing.quantity * (servings / selectedRecipe.serving)}</p>
                                    

                                </div>
                            })
                        }
                    </div>
                </div>

               

                <button onClick={() => addMealToDay("monday", selectedRecipe)}>
                    Add To Monday
                </button>
            </div>
        </div>
    )
}

export default RecipeDetailsModal
