import React from 'react'
import { usePreferencesContext } from '../../contexts/PreferencesContext'

const RecipeFilters = () => {
    const {searchText, setSearchText, dietFilter, setDietFilter, servings, setServings}= usePreferencesContext()
  return (
    <section className="rounded-[2rem] border border-orange-200/70 bg-white/90 p-6 shadow-[0_18px_40px_-28px_rgba(126,85,43,0.45)] backdrop-blur">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900">Recipe Filters</h2>
          <p className="mt-1 text-sm text-stone-600">Fine-tune the recipe list with shared global preferences.</p>
        </div>
        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-700">
          Live
        </span>
      </div>

      <div className="grid gap-5">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-stone-700">Search Recipes</span>
          <input
            className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-emerald-500 focus:bg-white"
            type="text"
            placeholder="Search by recipe name"
            value={searchText}
            onChange={(e)=>{
              setSearchText(e.target.value)
            }}
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-stone-700">Filter Diet</span>
          <select
            className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-emerald-500 focus:bg-white"
            value={dietFilter}
            onChange={(e)=>setDietFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="vegetarian" >Vegetarian</option>
            <option value="non-vegetarian">Non-vegetarian</option>
          </select>
        </label>

        <div className="rounded-2xl bg-stone-50 p-4">
          <div className="mb-3 flex items-center justify-between gap-4">
            <label className="text-sm font-semibold text-stone-700">Servings</label>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-800">
              {servings}
            </span>
          </div>
          <input
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r from-orange-300 via-amber-400 to-emerald-500"
            type="range"
            min={1}
            max={10}
            value={servings}
            onChange={(e)=>{
              setServings(e.target.value)
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default RecipeFilters
