import React from 'react'
import { useMealPlanContext } from '../../contexts/MealPlanContext'

const RecipeCard = ({recipe}) => {
  const {addMealToDay, setSelectedRecipe}= useMealPlanContext()
  return (
   <article className="group rounded-[1.5rem] border border-stone-200 bg-[linear-gradient(180deg,#fffdf8_0%,#fff7ed_100%)] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_38px_-22px_rgba(126,85,43,0.45)]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-700">
            {recipe.mealType}
          </p>
          <h3 className="mt-2 text-lg font-bold text-stone-900">{recipe.name}</h3>
        </div>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
          {recipe.diet}
        </span>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3 text-sm text-stone-600">
        <div className="rounded-2xl bg-white/80 px-3 py-2">
          <p className="text-xs uppercase tracking-[0.18em] text-stone-400">Prep</p>
          <p className="mt-1 font-semibold text-stone-800">{recipe.prepTime} min</p>
        </div>
        <div className="rounded-2xl bg-white/80 px-3 py-2">
          <p className="text-xs uppercase tracking-[0.18em] text-stone-400">Serves</p>
          <p className="mt-1 font-semibold text-stone-800">{recipe.serving}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
      <button
        className="inline-flex rounded-full bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-700"
        onClick={() => addMealToDay("monday", recipe)}
      >
        Add To Monday
      </button>

      <button
        className="inline-flex rounded-full border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-800 transition hover:border-emerald-500 hover:text-emerald-800"
        onClick={() => setSelectedRecipe(recipe)}
      >
        View Details
      </button>
      </div>
    </article>
  )
}

export default RecipeCard
