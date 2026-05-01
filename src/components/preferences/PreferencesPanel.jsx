

import React from 'react'
import { usePreferencesContext } from '../../contexts/PreferencesContext'

const PreferencesPanel = ({ onClose }) => {
    const { dietFilter, setDietFilter, servings, setServings } = usePreferencesContext();
    return (
        <div>
            <label>Filter Diet: </label>
            <select value={dietFilter} onChange={(e) => setDietFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="vegetarian" >Vegetarain</option>
                <option value="non-vegetarian">Non-vegetarian</option>
            </select>

            <label >Serving: {servings} </label>
            <input type="range" min={1} max={10} value={servings} onChange={(e) => {
                setServings(e.target.value)
            }} />

            <button onClick={onClose}>Close</button>
        </div>
    )
}

export default PreferencesPanel
