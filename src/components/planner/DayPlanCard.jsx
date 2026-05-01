

import React from 'react'
import PlannedMealItem from './PlannedMealItem'

const DayPlanCard = ({ day, meals }) => {
    return (
        <div className="rounded-3xl border border-stone-200 bg-[linear-gradient(180deg,#ffffff_0%,#f7f5ef_100%)] p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                    <h3 className="text-lg font-bold capitalize text-stone-900">{day}</h3>
                    <p className="mt-1 text-sm text-stone-600">Total Meals: {meals.length}</p>
                </div>
                <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-stone-700">
                    Plan
                </span>
            </div>
            {
                meals.length > 0 ? <div className="space-y-3">
                    {
                        meals.map(meal => {
                            return <PlannedMealItem key={meal.id}
                                day={day}
                                meal={meal}
                            />
                        }) 
                    }
                </div> : <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-4 py-6 text-center text-sm text-stone-600">No meals planned for {day}.</div>
            }
        </div>
    )
}

export default DayPlanCard
