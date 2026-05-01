import React from 'react'
import { useGroceryListContext } from '../../contexts/GroceryListContext'

const Header = ({ onOpenPreferences }) => {
    const { groceryItems } = useGroceryListContext()
    return (
        <header className="overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white/80 shadow-[0_20px_60px_-30px_rgba(120,91,54,0.35)] backdrop-blur">
            <div className="grid gap-6 px-6 py-6 lg:grid-cols-[1.2fr_auto] lg:items-center lg:px-8">
                <div className="space-y-3">
                    <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                        Context API Practice Project
                    </span>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">
                            Weekly Meal Planner
                        </h1>
                        <p className="max-w-2xl text-sm leading-6 text-stone-600 sm:text-base">
                            Plan meals, inspect recipes, and watch your grocery list update automatically across the app.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
                    <div className="rounded-2xl bg-stone-900 px-4 py-3 text-stone-50 shadow-lg">
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-300">
                            Grocery Count
                        </p>
                        <p className="mt-1 text-2xl font-bold">{groceryItems.length}</p>
                    </div>

                    <button
                        onClick={onOpenPreferences}
                        className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-stone-50 px-5 py-3 text-sm font-semibold text-stone-800 transition hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-800"
                    >
                        Open Preferences
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header
