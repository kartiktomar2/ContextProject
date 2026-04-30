import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { PreferencesContextProvider } from './contexts/PreferencesContext'
import { MealContextProvider } from './contexts/MealPlanContext'
import { GroceryListContextProvider } from './contexts/GroceryListContext'
import AppLayout from './components/layout/AppLayout'
// import './App.css'

function App() {


  return (
    <>
      <PreferencesContextProvider>
        <MealContextProvider>
          <GroceryListContextProvider>
            <AppLayout/>
          </GroceryListContextProvider>
        </MealContextProvider>
      </PreferencesContextProvider>

    </>
  )
}

export default App
