import { createContext, useContext, useState } from "react";





const MealPlanContext = createContext({
    mealPlan: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
    },
    selectedRecipe: null,
    addMealToDay: () => { },
    removeMealFromDay: () => { },
    setSelectedRecipe: () => { },
    clearSelectedRecipe: () => { },
})


export const MealContextProvider = ({ children }) => {

    const [mealPlan, setMealPlan] = useState({
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
    })
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    function clearSelectedRecipe() {
        setSelectedRecipe(null);
    }

    function addMealToDay(day, recipe) {
        // if (!Object.keys(mealPlan).includes(day)) {
        //     console.log("invalid day");
        //     return;
        // }
        // // on the passed day add the recipe 
        // setMealPlan(prev => ({ ...prev, [day]: [...prev[day], recipe] }))
        setMealPlan(prev => {
            if (!(day in prev)) {
                throw new Error("invalid day");

            }
            let exist = prev[day].some(r => r.id === recipe.id)
            if (exist) {
                return prev;
            }

            return { ...prev, [day]: [...prev[day], recipe] }
        })
    }

    function removeMealFromDay(day, recipeId) {
        // if (!(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].includes(day))) {
        //     console.log("invalid day");
        //     return;
        // }
        //    on the day passed filter the recipe using the recipe id 
        setMealPlan(prev => {
            if (!(day in prev)) {
                throw new Error("invalid day");

            }
            return {
                ...prev, [day]: [...prev[day].filter((recipe) => recipe.id !== recipeId)]
            }
        }

        )
    }

    return (
        <>
            <MealPlanContext value={{ mealPlan, addMealToDay, removeMealFromDay, selectedRecipe, setSelectedRecipe, clearSelectedRecipe }}>
                {children}
            </MealPlanContext>
        </>
    )
}

export const useMealPlanContext = () => {
    return useContext(MealPlanContext)
}