

import React from 'react'
import { useMealPlanContext } from '../../contexts/MealPlanContext'
import DayPlanCard from './DayPlanCard'

const WeeklyPlanner = () => {
    const {mealPlan}= useMealPlanContext()
  return (
    <div> 
        {
              Object.keys(mealPlan).map(day=>{
                return  <DayPlanCard key={day} day={day} meals={mealPlan[day]} />
              })
        }
      
    </div>
  )
}

export default WeeklyPlanner
