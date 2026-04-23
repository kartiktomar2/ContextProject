import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { PreferencesContextProvider } from './contexts/PreferencesContext'
import { MealContextProvider } from './contexts/MealPlanContext'
// import './App.css'

function App() {


  return (
    <>
      <PreferencesContextProvider>
        <MealContextProvider>
          <h1 className="">
          Hello world!
        </h1>
        </MealContextProvider>
      </PreferencesContextProvider>

    </>
  )
}

export default App
