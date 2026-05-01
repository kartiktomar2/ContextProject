

import React from 'react'
import { useMealPlanContext } from '../../contexts/MealPlanContext'
import { usePreferencesContext } from '../../contexts/PreferencesContext';

const RecipeDetailsModal = () => {

    const { selectedRecipe, clearSelectedRecipe, addMealToDay } = useMealPlanContext();
    const { servings } = usePreferencesContext();
    if (!selectedRecipe) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/45 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-4xl border border-stone-200 bg-[linear-gradient(180deg,#fffdf8_0%,#f8f5ef_100%)] p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.4)] sm:p-8">
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-700">
                            Recipe Details
                        </p>
                        <h2 className="mt-2 text-3xl font-black tracking-tight text-stone-900">{selectedRecipe.name}</h2>
                    </div>
                    <button
                        className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-stone-500 hover:text-stone-900"
                        onClick={clearSelectedRecipe}
                    >
                        Close
                    </button>
                </div>

                <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="space-y-3 rounded-3xl bg-stone-900 p-5 text-stone-50">
                        <div>
                            <p className="text-xs uppercase tracking-[0.18em] text-stone-400">Meal Type</p>
                            <p className="mt-1 text-lg font-semibold">{selectedRecipe.mealType}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.18em] text-stone-400">Diet</p>
                            <p className="mt-1 text-lg font-semibold">{selectedRecipe.diet}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.18em] text-stone-400">Prep Time</p>
                            <p className="mt-1 text-lg font-semibold">{selectedRecipe.prepTime} min</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.18em] text-stone-400">Current Servings</p>
                            <p className="mt-1 text-lg font-semibold">{servings}</p>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-stone-200 bg-white/80 p-5">
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <h3 className="text-lg font-bold text-stone-900">Ingredients</h3>
                            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
                                Scaled
                            </span>
                        </div>
                        <div className="space-y-3">
                        {
                            selectedRecipe.ingredients.map((ing) => {

                                return <div key={ing.name + "_" + ing.unit} className="flex items-center justify-between rounded-2xl bg-stone-50 px-4 py-3">
                                    <p className="font-medium capitalize text-stone-800">{ing.name}</p>
                                    <p className="text-sm font-semibold text-stone-600">{ing.quantity * (servings / selectedRecipe.serving)} {ing.unit}</p>
                                </div>
                            })
                        }
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                <button
                    className="inline-flex rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    onClick={() => addMealToDay("monday", selectedRecipe)}
                >
                    Add To Monday
                </button>
                <button
                    className="inline-flex rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-stone-500 hover:text-stone-900"
                    onClick={clearSelectedRecipe}
                >
                    Keep Browsing
                </button>
                </div>
            </div>
        </div>
    )
}

export default RecipeDetailsModal
