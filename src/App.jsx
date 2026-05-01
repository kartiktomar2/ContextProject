import { PreferencesContextProvider } from './contexts/PreferencesContext'
import { MealContextProvider } from './contexts/MealPlanContext'
import { GroceryListContextProvider } from './contexts/GroceryListContext'
import AppLayout from './components/layout/AppLayout'

function App() {
  return (
    <PreferencesContextProvider>
      <MealContextProvider>
        <GroceryListContextProvider>
          <AppLayout />
        </GroceryListContextProvider>
      </MealContextProvider>
    </PreferencesContextProvider>
  )
}

export default App
