import React from 'react'
import Header from './Header'
import RecipeFilters from '../recipes/RecipeFilters'
import RecipeCatalog from '../recipes/RecipeCatalog'
import WeeklyPlanner from '../planner/WeeklyPlanner'
import GroceryListPanel from '../grocery/GroceryListPanel' 

const AppLayout = () => {
  return (
   <div>
      <Header />

      <main>
        <section>
          <RecipeFilters />
          <RecipeCatalog />
        </section>

        <section>
          <WeeklyPlanner />
        </section>

        <section>
          <GroceryListPanel />
        </section>
      </main>
    </div>
  )
}

export default AppLayout
