

import React from 'react'
import PlannedMealItem from './PlannedMealItem'

const DayPlanCard = ({ day, meals }) => {
    return (
        <div>
            <h1>Meals for: {day}</h1>
            {
                meals.length > 0 ? <div>
                    {
                        meals.map(meal => {
                            return <PlannedMealItem key={meal.id}
                             day={day}
                             meal={meal}
                            />
                        })
                    }
                </div> : <div>No Meals for: {day}</div>
            }
        </div>
    )
}

export default DayPlanCard
