import React from 'react'
import { useGroceryListContext } from '../../contexts/GroceryListContext'

const Header = ({ onOpenPreferences }) => {
    const { groceryItems } = useGroceryListContext()
    return (
        <div>
            <h1>Weekly Meal Planner</h1>
            <p>Grocery Items: {groceryItems.length}</p>
            <button onClick={onOpenPreferences}>Preferences</button>
        </div>
    )
}

export default Header
