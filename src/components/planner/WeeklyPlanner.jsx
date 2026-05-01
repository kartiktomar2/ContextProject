

import React from 'react'
import { useMealPlanContext } from '../../contexts/MealPlanContext'
import DayPlanCard from './DayPlanCard'

const WeeklyPlanner = () => {
  const { mealPlan } = useMealPlanContext()
  return (
    <section className="rounded-4xl border border-stone-200/80 bg-white/90 p-6 shadow-[0_18px_40px_-28px_rgba(126,85,43,0.45)] backdrop-blur">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-stone-900">Weekly Planner</h2>
        <p className="mt-1 text-sm text-stone-600">Review your selected meals day by day.</p>
      </div>
      <div className="grid gap-4">
      {
        Object.keys(mealPlan).map(day => {
          return <DayPlanCard key={day} day={day} meals={mealPlan[day]} />
        })
      }
      </div>
    </section>
  )
}

export default WeeklyPlanner
