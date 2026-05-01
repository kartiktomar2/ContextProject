import React, { useState } from 'react'
import Header from './Header'
import RecipeFilters from '../recipes/RecipeFilters'
import RecipeCatalog from '../recipes/RecipeCatalog'
import WeeklyPlanner from '../planner/WeeklyPlanner'
import GroceryListPanel from '../grocery/GroceryListPanel' 
import RecipeDetailsModal from '../recipes/RecipeDetailsModal'
import PreferencesPanel from '../preferences/PreferencesPanel'

const AppLayout = () => {
   const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  return (
   <div className="min-h-screen bg-[linear-gradient(180deg,#f4efe7_0%,#f8f6f1_38%,#edf3ea_100%)] text-stone-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <Header onOpenPreferences={()=>setIsPreferencesOpen(true)}/>
      {
         isPreferencesOpen && <PreferencesPanel onClose={()=>setIsPreferencesOpen(false)}/>
      }
      <main className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.95fr_0.9fr]">
        <section className="space-y-6">
          <RecipeFilters />
          <RecipeCatalog />
        </section>

        <section>
          <WeeklyPlanner />
        </section>

        <section>
          <GroceryListPanel />
        </section>
        <RecipeDetailsModal/>
      </main>
      </div>
    </div>
  )
}

export default AppLayout
