

import React from 'react'
import { usePreferencesContext } from '../../contexts/PreferencesContext'

const PreferencesPanel = ({ onClose }) => {
    const { dietFilter, setDietFilter, servings, setServings } = usePreferencesContext();
    return (
        <div className="fixed inset-0 z-40 bg-stone-950/25 backdrop-blur-sm">
            <div className="absolute right-4 top-4 w-full max-w-md rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_28px_80px_-30px_rgba(0,0,0,0.35)] sm:right-8 sm:top-8">
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-700">Global Settings</p>
                        <h2 className="mt-2 text-2xl font-bold text-stone-900">Preferences</h2>
                    </div>
                    <button className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-stone-500 hover:text-stone-900" onClick={onClose}>Close</button>
                </div>

                <div className="grid gap-5">
                    <label className="grid gap-2">
                        <span className="text-sm font-semibold text-stone-700">Diet Filter</span>
                        <select className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-emerald-500 focus:bg-white" value={dietFilter} onChange={(e) => setDietFilter(e.target.value)}>
                            <option value="all">All</option>
                            <option value="vegetarian" >Vegetarian</option>
                            <option value="non-vegetarian">Non-vegetarian</option>
                        </select>
                    </label>

                    <div className="rounded-2xl bg-stone-50 p-4">
                        <div className="mb-3 flex items-center justify-between gap-4">
                            <label className="text-sm font-semibold text-stone-700">Servings</label>
                            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-800">{servings}</span>
                        </div>
                        <input className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r from-orange-300 via-amber-400 to-emerald-500" type="range" min={1} max={10} value={servings} onChange={(e) => {
                            setServings(e.target.value)
                        }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreferencesPanel
