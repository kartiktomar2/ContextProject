import {recipes} from "../../data/recipes.js"
import {usePreferencesContext} from "../../contexts/PreferencesContext.jsx"
import RecipeCard from "./RecipeCard.jsx";


const RecipeCatalog = () => {
    const {searchText, dietFilter}= usePreferencesContext();
    
    const allVisibleRecipes= recipes.filter((recipe)=>{
        return recipe.name.toLowerCase().includes(searchText.toLowerCase())&&(dietFilter!=="all"?recipe.diet===dietFilter:true)
        
        })
  return (
    <section className="rounded-[2rem] border border-stone-200/80 bg-white/90 p-6 shadow-[0_18px_40px_-28px_rgba(126,85,43,0.45)] backdrop-blur">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-stone-900">Recipe Catalog</h2>
          <p className="mt-1 text-sm text-stone-600">
            Browse recipes and add them directly into your meal plan.
          </p>
        </div>
        <div className="rounded-full bg-stone-100 px-4 py-2 text-sm font-semibold text-stone-700">
          {allVisibleRecipes.length} visible
        </div>
      </div>

      {allVisibleRecipes.length>0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {allVisibleRecipes.map((recipe)=>{
            return  <RecipeCard key={recipe.id} recipe={recipe}/>
          })}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-stone-300 bg-stone-50 px-6 py-10 text-center text-stone-600">
          No recipes match your current filters.
        </div>
      )}
    </section>
  )
}

export default RecipeCatalog
