import {recipes} from "../../data/recipes.js"
import {usePreferencesContext} from "../../contexts/PreferencesContext.jsx"
import RecipeCard from "./RecipeCard.jsx";


const RecipeCatalog = () => {
  // console.log("catalog rendered ")
    const {searchText, dietFilter}= usePreferencesContext();
    
    //calculating visible recipes
    // display recipes on basis of search text and diet filter
    const allVisibleRecipes= recipes.filter((recipe)=>{
        // first of all search text should be in the name of recipe and if the diet filter is not equal to all then display meal that matches the diet filter 
        return recipe.name.toLowerCase().includes(searchText.toLowerCase())&&(dietFilter!=="all"?recipe.diet===dietFilter:true)
        
        })
    console.log("visible recipes are: ", allVisibleRecipes)
  return (
    <div>
      {/*  render recipes cards on the basis of visible recipes  */}
      <h1>Recipe Catalog</h1>
      {
           allVisibleRecipes.length>0? 
            allVisibleRecipes.map((recipe)=>{
                return  <RecipeCard key={recipe.id} recipe={recipe}/>
                       
            }):
            <div>No recipes to displayy </div>
      }
    </div>
  )
}

export default RecipeCatalog
