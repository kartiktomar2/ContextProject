# Context API Remaining Work Guide

This guide continues after `context-api-starter-code-guide.md`.

You already completed the core learning pieces:

- `PreferencesContext`
- `MealPlanContext`
- `GroceryListContext`
- recipe list
- planner
- grocery list

Now the remaining work is about turning those separate pieces into a more complete app.

This file follows the same style as the starter guide:

- which file to create
- where to create it
- what to do in that file
- a small starter shape
- what to understand before moving on

It still avoids giving you a fully finished app.

---

## What To Build First Now

Build the layout first.

Why:

- you already have the main feature logic
- now you need one proper screen that connects everything
- once layout is done, the remaining features become easier to reason about

New learning goal:

See all three contexts working together in one page:

- `PreferencesContext` changes recipe filtering and quantities
- `MealPlanContext` changes the planner
- `GroceryListContext` updates automatically from the planner

---

## Step 15: Create The Main Layout

### Create these files

```text
src/components/layout/AppLayout.jsx
src/components/layout/Header.jsx
```

If the `layout` folder does not exist yet, create it here:

```text
src/components/layout/
```

### `AppLayout.jsx`

### What this file should do

This file should define the overall screen structure.

It should render:

- header
- recipe section
- planner section
- grocery section

It should focus on page structure, not feature logic.

### Starter shape

```jsx
import Header from "./Header";
import RecipeFilters from "../recipes/RecipeFilters";
import RecipeCatalog from "../recipes/RecipeCatalog";
import WeeklyPlanner from "../planner/WeeklyPlanner";
import GroceryListPanel from "../grocery/GroceryListPanel";

const AppLayout = () => {
  return (
    <div>
      <Header />

      <main>
        <section>
          <RecipeFilters />
          <RecipeCatalog />
        </section>

        <section>
          <WeeklyPlanner />
        </section>

        <section>
          <GroceryListPanel />
        </section>
      </main>
    </div>
  );
};

export default AppLayout;
```

### What you should implement yourself

Decide:

- whether the page should be 3 columns
- whether sections should stack on small screens
- what headings each section should have

### `Header.jsx`

### What this file should do

This file should show:

- app title
- grocery item count
- button to open preferences panel

### Starter shape

```jsx
import { useGroceryListContext } from "../../contexts/GroceryListContext";

const Header = ({ onOpenPreferences }) => {
  const { groceryItems } = useGroceryListContext();

  return (
    <header>
      <h1>Weekly Meal Planner</h1>
      <p>Grocery Items: {groceryItems.length}</p>
      <button onClick={onOpenPreferences}>Preferences</button>
    </header>
  );
};

export default Header;
```

### What to understand here

The header is not part of the grocery feature folder, but it still consumes grocery context. That is one of the most practical reasons to use context.

---

## Step 16: Use The Layout In `App.jsx`

### Edit this file

```text
src/App.jsx
```

### What this file should do

`App.jsx` should become a clean composition file.

It should:

- wrap the app with the three providers
- render `AppLayout`

### Starter shape

```jsx
import AppLayout from "./components/layout/AppLayout";
import { PreferencesContextProvider } from "./contexts/PreferencesContext";
import { MealContextProvider } from "./contexts/MealPlanContext";
import { GroceryListContextProvider } from "./contexts/GroceryListContext";

function App() {
  return (
    <PreferencesContextProvider>
      <MealContextProvider>
        <GroceryListContextProvider>
          <AppLayout />
        </GroceryListContextProvider>
      </MealContextProvider>
    </PreferencesContextProvider>
  );
}

export default App;
```

### What you should implement yourself

Check that the provider order still works correctly:

- grocery context depends on meal-plan context
- grocery context depends on preferences context

---

## Step 17: Add Selected Recipe State To `MealPlanContext`

### Edit this file

```text
src/contexts/MealPlanContext.jsx
```

### What this file should do now

Besides storing the weekly meal plan, this context should also store:

- the currently selected recipe

### What to add

Add:

- `selectedRecipe`
- `setSelectedRecipe`
- `clearSelectedRecipe`

### Starter shape

```jsx
const MealPlanContext = createContext({
  mealPlan: {},
  selectedRecipe: null,
  addMealToDay: () => {},
  removeMealFromDay: () => {},
  setSelectedRecipe: () => {},
  clearSelectedRecipe: () => {},
});

export const MealContextProvider = ({ children }) => {
  const [mealPlan, setMealPlan] = useState(initialPlan);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  function clearSelectedRecipe() {
    // you write this
  }

  return (
    <MealPlanContext
      value={{
        mealPlan,
        selectedRecipe,
        addMealToDay,
        removeMealFromDay,
        setSelectedRecipe,
        clearSelectedRecipe,
      }}
    >
      {children}
    </MealPlanContext>
  );
};
```

### What you should implement yourself

Decide:

- whether `clearSelectedRecipe` should just set `null`
- whether removing a meal should affect the selected recipe or not

### What to understand here

This is still a good use of context because multiple distant components need to open the same recipe details view.

---

## Step 18: Create `RecipeDetailsModal.jsx`

### Create this file

```text
src/components/recipes/RecipeDetailsModal.jsx
```

### What this file should do

This component should show the full selected recipe.

It should display:

- recipe name
- meal type
- diet
- prep time
- ingredients
- ingredient quantities based on current servings
- button to add the recipe to a day
- button to close the modal

### Where the data should come from

It should read:

- `selectedRecipe` from `MealPlanContext`
- `clearSelectedRecipe` from `MealPlanContext`
- `addMealToDay` from `MealPlanContext`
- `servings` from `PreferencesContext`

### Starter shape

```jsx
import { useMealPlanContext } from "../../contexts/MealPlanContext";
import { usePreferencesContext } from "../../contexts/PreferencesContext";

const RecipeDetailsModal = () => {
  const {
    selectedRecipe,
    clearSelectedRecipe,
    addMealToDay,
  } = useMealPlanContext();
  const { servings } = usePreferencesContext();

  if (!selectedRecipe) {
    return null;
  }

  return (
    <div>
      <div>
        <h2>{selectedRecipe.name}</h2>
        <button onClick={clearSelectedRecipe}>Close</button>

        <div>{/* recipe details go here */}</div>

        <div>{/* scaled ingredients go here */}</div>

        <button onClick={() => addMealToDay("monday", selectedRecipe)}>
          Add To Monday
        </button>
      </div>
    </div>
  );
};

export default RecipeDetailsModal;
```

### What you should implement yourself

Work out:

- how to display scaled ingredient quantities
- whether to keep a temporary selected day inside the modal
- how the modal background and close behavior should work

---

## Step 19: Update `RecipeCard.jsx`

### Edit this file

```text
src/components/recipes/RecipeCard.jsx
```

### What to add

This component should now support two actions:

- add recipe to planner
- open recipe details

### Starter shape

```jsx
import { useMealPlanContext } from "../../contexts/MealPlanContext";

const RecipeCard = ({ recipe }) => {
  const { addMealToDay, setSelectedRecipe } = useMealPlanContext();

  return (
    <div>
      <h3>{recipe.name}</h3>
      <p>{recipe.mealType}</p>
      <p>{recipe.diet}</p>
      <p>{recipe.prepTime} min</p>

      <button onClick={() => addMealToDay("monday", recipe)}>
        Add To Monday
      </button>

      <button onClick={() => setSelectedRecipe(recipe)}>
        View Details
      </button>
    </div>
  );
};

export default RecipeCard;
```

### What to understand here

One small card component can now trigger two different shared app behaviors through the same context.

---

## Step 20: Render The Modal At A High Level

### Edit this file

```text
src/App.jsx
```

or

```text
src/components/layout/AppLayout.jsx
```

### What to do

Render `RecipeDetailsModal` high enough in the tree that it can sit above the rest of the page.

### Starter shape

```jsx
import RecipeDetailsModal from "../recipes/RecipeDetailsModal";

const AppLayout = () => {
  return (
    <div>
      {/* existing layout */}
      <RecipeDetailsModal />
    </div>
  );
};
```

### What you should implement yourself

Decide:

- whether the modal belongs in `AppLayout` or `App.jsx`
- whether clicking outside should close it

---

## Step 21: Create `PreferencesPanel.jsx`

### Create this file

```text
src/components/preferences/PreferencesPanel.jsx
```

If the `preferences` folder does not exist yet, create it here:

```text
src/components/preferences/
```

### What this file should do

This should be a dedicated panel for editing global preferences.

Start with:

- servings control
- diet filter control

### Starter shape

```jsx
import { usePreferencesContext } from "../../contexts/PreferencesContext";

const PreferencesPanel = ({ onClose }) => {
  const {
    servings,
    setServings,
    dietFilter,
    setDietFilter,
  } = usePreferencesContext();

  return (
    <aside>
      <h2>Preferences</h2>

      <div>{/* servings control */}</div>
      <div>{/* diet filter control */}</div>

      <button onClick={onClose}>Close</button>
    </aside>
  );
};

export default PreferencesPanel;
```

### What to understand here

This panel updates the same global state as `RecipeFilters`, but from a different UI location.

---

## Step 22: Add Local Open/Close State For The Preferences Panel

### Best place to keep this state

Keep it local in:

- `AppLayout.jsx`

That is the easiest place because:

- `Header` can open it
- `PreferencesPanel` can render there too

### Edit this file

```text
src/components/layout/AppLayout.jsx
```

### Starter shape

```jsx
import { useState } from "react";
import Header from "./Header";
import PreferencesPanel from "../preferences/PreferencesPanel";

const AppLayout = () => {
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  return (
    <div>
      <Header onOpenPreferences={() => setIsPreferencesOpen(true)} />

      {isPreferencesOpen && (
        <PreferencesPanel onClose={() => setIsPreferencesOpen(false)} />
      )}

      {/* rest of the layout */}
    </div>
  );
};
```

### What to understand here

The settings values stay global in context, but the panel visibility stays local. That is an important state-ownership lesson.

---

## Step 23: Improve `PlannedMealItem.jsx`

### Edit this file

```text
src/components/planner/PlannedMealItem.jsx
```

### What to add

This component should now support:

- remove
- view details

### Starter shape

```jsx
import { useMealPlanContext } from "../../contexts/MealPlanContext";

const PlannedMealItem = ({ day, meal }) => {
  const {
    removeMealFromDay,
    setSelectedRecipe,
  } = useMealPlanContext();

  return (
    <div>
      <p>{meal.name}</p>
      <button onClick={() => setSelectedRecipe(meal)}>
        View Details
      </button>
      <button onClick={() => removeMealFromDay(day, meal.id)}>
        Remove
      </button>
    </div>
  );
};

export default PlannedMealItem;
```

### What to understand here

Now the same modal can be opened from both:

- recipe list
- planner

That is a very practical context-sharing pattern.

---

## Step 24: Improve `GroceryListContext.jsx`

### Edit this file

```text
src/contexts/GroceryListContext.jsx
```

### What to add

Add a new action:

- `clearCheckedItems`

### Starter shape

```jsx
const GroceryListContext = createContext({
  groceryItems: [],
  checkedItems: [],
  toggleChecked: () => {},
  clearCheckedItems: () => {},
});

export const GroceryListContextProvider = ({ children }) => {
  const [checkedItems, setCheckedItems] = useState([]);

  function clearCheckedItems() {
    // you write this
  }

  return (
    <GroceryListContext
      value={{
        groceryItems,
        checkedItems,
        toggleChecked,
        clearCheckedItems,
      }}
    >
      {children}
    </GroceryListContext>
  );
};
```

### What you should implement yourself

Decide:

- whether clearing means removing only the checked-state markers
- or also removing checked grocery rows from display

For this project, the simpler meaning is:

- clear the checked-state list

---

## Step 25: Improve `GroceryListPanel.jsx`

### Edit this file

```text
src/components/grocery/GroceryListPanel.jsx
```

### What to add

Add:

- heading
- grocery count
- clear checked button

### Starter shape

```jsx
import { useGroceryListContext } from "../../contexts/GroceryListContext";
import GroceryItem from "./GroceryItem";

const GroceryListPanel = () => {
  const {
    groceryItems,
    clearCheckedItems,
  } = useGroceryListContext();

  return (
    <section>
      <h2>Grocery List</h2>
      <p>Total Items: {groceryItems.length}</p>
      <button onClick={clearCheckedItems}>Clear Checked</button>

      <div>{/* render grocery items here */}</div>
    </section>
  );
};

export default GroceryListPanel;
```

### What you should implement yourself

Decide:

- whether the button should always show
- or only show when at least one item is checked

---

## Step 26: Improve `DayPlanCard.jsx`

### Edit this file

```text
src/components/planner/DayPlanCard.jsx
```

### What to improve

Right now this component probably only:

- shows meals
- shows empty state

Now improve it so it feels more complete.

Add:

- clearer heading
- meal count
- optional replace flow later

### Starter shape

```jsx
import PlannedMealItem from "./PlannedMealItem";

const DayPlanCard = ({ day, meals }) => {
  return (
    <div>
      <h3>{day}</h3>
      <p>Total Meals: {meals.length}</p>

      {meals.length === 0 ? (
        <p>No meals planned for this day.</p>
      ) : (
        meals.map((meal) => (
          <PlannedMealItem
            key={meal.id}
            day={day}
            meal={meal}
          />
        ))
      )}
    </div>
  );
};

export default DayPlanCard;
```

### What to understand here

Even small presentation improvements help you test context updates more clearly.

---

## Step 27: Improve Empty States And Labels

### Edit these files

```text
src/components/recipes/RecipeCatalog.jsx
src/components/planner/WeeklyPlanner.jsx
src/components/grocery/GroceryListPanel.jsx
```

### What to add

Improve:

- headings
- section labels
- empty state text

### Starter ideas

For `RecipeCatalog.jsx`:

```jsx
<section>
  <h2>Browse Recipes</h2>
  {visibleRecipes.length === 0 ? (
    <p>No recipes match your current filters.</p>
  ) : (
    <div>{/* recipe cards */}</div>
  )}
</section>
```

For `WeeklyPlanner.jsx`:

```jsx
<section>
  <h2>Weekly Planner</h2>
  <div>{/* day cards */}</div>
</section>
```

### Why this step matters

It makes the app feel like one product instead of separate experiments.

---

## Step 28: Optional Hook Cleanup

### Create these files if you want

```text
src/hooks/usePreferences.js
src/hooks/useMealPlan.js
src/hooks/useGroceryList.js
```

### What these files should do

These files are optional.

They can simply re-export the existing context hooks.

### Starter shape

```js
export { usePreferencesContext } from "../contexts/PreferencesContext";
```

and similarly for the other two hooks.

### What to understand here

This is just organization. It is not required to complete the project.

---

## Step 29: Final Manual Testing

### What to test

1. Change filters in `RecipeFilters`
2. Confirm `RecipeCatalog` updates
3. Add a recipe to a day
4. Confirm `WeeklyPlanner` updates
5. Confirm `GroceryListPanel` updates
6. Change servings
7. Confirm grocery quantities change
8. Open recipe details from `RecipeCard`
9. Open recipe details from `PlannedMealItem`
10. Check and uncheck grocery items
11. Clear checked grocery items
12. Open and close preferences panel

### What success looks like

If all of those work, then the project is complete at the intended learning level.

---

## Best Remaining Build Order

1. `src/components/layout/AppLayout.jsx`
2. `src/components/layout/Header.jsx`
3. Update `src/App.jsx`
4. Update `src/contexts/MealPlanContext.jsx`
5. `src/components/recipes/RecipeDetailsModal.jsx`
6. Update `src/components/recipes/RecipeCard.jsx`
7. Render `RecipeDetailsModal`
8. `src/components/preferences/PreferencesPanel.jsx`
9. Add local open/close state in `AppLayout.jsx`
10. Update `src/components/planner/PlannedMealItem.jsx`
11. Update `src/contexts/GroceryListContext.jsx`
12. Update `src/components/grocery/GroceryListPanel.jsx`
13. Improve `src/components/planner/DayPlanCard.jsx`
14. Improve empty states and headings
15. Optional hook cleanup
16. Manual end-to-end testing

---

## What Not To Add Yet

Avoid these for now:

- reducers
- backend APIs
- local storage persistence
- drag and drop
- routing
- animation-heavy UI
- heavy optimization

Finish the learning goals first.
