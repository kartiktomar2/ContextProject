import React from 'react'
import { usePreferencesContext } from '../../contexts/PreferencesContext'

const RecipeFilters = () => {
    const {searchText, setSearchText, dietFilter, setDietFilter, servings, setServings}= usePreferencesContext()
  return (
    <section>
             <label >Search Recipes: </label>
              <input type="text" 
              value={searchText}  
               onChange={(e)=>{
                      setSearchText(e.target.value)
               }}
              />
             <label>Filter Diet: </label>
             <select value={dietFilter} onChange={(e)=>setDietFilter(e.target.value)}>
                  <option value="all">All</option>
                  <option value="vegetarian" >Vegetarain</option>
                  <option value="non-vegetarian">Non-vegetarian</option>
             </select>

             <label >Serving: {servings} </label>
             <input type="range" min={1} max={10} value={servings} onChange={(e)=>{
                setServings(e.target.value)
             }} />
    </section>
  )
}

export default RecipeFilters
