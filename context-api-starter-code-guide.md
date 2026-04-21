# Context API Starter Code Guide

This file is not meant to give you a finished app. It tells you what to create first, what each file should be responsible for, and what small pieces of starter code you can write to understand Context API step by step.

Project: Weekly Meal Planner

Contexts you will build:

- `PreferencesContext`
- `MealPlanContext`
- `GroceryListContext`

Recommended rule while building: create one context, connect it to two components, test the behavior, then move to the next context.

---

## What To Build First

Build `PreferencesContext` first.

Why:

- it is the smallest context
- it does not depend on the other contexts
- you can immediately see global state working in `RecipeFilters` and `RecipeCatalog`
- it teaches the basic pattern: create context, provide state, consume state, update state

First learning goal:

When you change the search text or diet filter in `RecipeFilters`, `RecipeCatalog` should automatically show a different list of recipes without passing props through `App`.

---

## Step 1: Create Static Recipe Data

### Create this file first

```text
src/data/recipes.js
```

### What to do in this file

Create a small array of recipe objects. Keep it simple.

Each recipe should have:

- `id`
- `name`
- `mealType`
- `diet`
- `prepTime`
- `ingredients`

Example shape:

```js
export const recipes = [
  {
    id: "r1",
    name: "Veggie Rice Bowl",
    mealType: "lunch",
    diet: "vegetarian",
    prepTime: 25,
    ingredients: [
      { name: "Rice", quantity: 1, unit: "cup" },
      { name: "Broccoli", quantity: 1, unit: "cup" },
    ],
  },
];
```

Do not create too many recipes at first. Start with 4 recipes, then add more later.

---

## Step 2: Create `PreferencesContext`

### Create this file

```text
src/contexts/PreferencesContext.jsx
```

### What this file should do

This file should:

- create the context
- store global preference state with `useState`
- expose state and update functions through a provider
- export a custom hook so components can easily use it

### State to add first

Start with only these:

- `searchText`
- `dietFilter`
- `servings`

Avoid adding theme, sorting, or extra settings until the basics work.

### Starter shape

```jsx
import { createContext, useContext, useState } from "react";

const PreferencesContext = createContext(null);

export function PreferencesProvider({ children }) {
  const [searchText, setSearchText] = useState("");
  const [dietFilter, setDietFilter] = useState("all");
  const [servings, setServings] = useState(2);

  const value = {
    searchText,
    setSearchText,
    dietFilter,
    setDietFilter,
    servings,
    setServings,
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);

  if (!context) {
    throw new Error("usePreferences must be used inside PreferencesProvider");
  }

  return context;
}
```

### What to understand here

- `PreferencesProvider` makes the data available globally.
- `value` is the object that components receive.
- `usePreferences` hides the raw `useContext` call and gives a nicer API.
- The error helps you catch mistakes if a component uses the hook outside the provider.

---

## Step 3: Wrap Your App With `PreferencesProvider`

### Edit this file

```text
src/App.jsx
```

Or, if your project wraps providers in `main.jsx`, use:

```text
src/main.jsx
```

### What to do in this file

Wrap the part of the app that needs access to preferences.

Example shape:

```jsx
import { PreferencesProvider } from "./contexts/PreferencesContext";

function App() {
  return (
    <PreferencesProvider>
      {/* your app layout goes here */}
    </PreferencesProvider>
  );
}
```

### What to understand here

Any component rendered inside `PreferencesProvider` can now call `usePreferences`.

Do not put all providers in place yet. Add them one by one as you build each feature.

---

## Step 4: Create Recipe Filter UI

### Create this file

```text
src/components/recipes/RecipeFilters.jsx
```

### What this file should do

This component should:

- read `searchText`, `dietFilter`, and `servings`
- render controls that update those values

### Starter shape

```jsx
import { usePreferences } from "../../contexts/PreferencesContext";

export function RecipeFilters() {
  const {
    searchText,
    setSearchText,
    dietFilter,
    setDietFilter,
    servings,
    setServings,
  } = usePreferences();

  return (
    <section>
      {/* Add search input, diet select, and servings control here */}
    </section>
  );
}
```

### What you should implement yourself

Add:

- an input for `searchText`
- a select dropdown for `dietFilter`
- buttons or select dropdown for `servings`

### What to understand here

This component updates global context state. It does not need to know which component will use those values later.

---

## Step 5: Create Recipe Catalog

### Create this file

```text
src/components/recipes/RecipeCatalog.jsx
```

### What this file should do

This component should:

- import the recipe data
- read filters from `PreferencesContext`
- calculate visible recipes
- render a list of recipe cards

### Starter shape

```jsx
import { recipes } from "../../data/recipes";
import { usePreferences } from "../../contexts/PreferencesContext";

export function RecipeCatalog() {
  const { searchText, dietFilter } = usePreferences();

  const visibleRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesDiet =
      dietFilter === "all" || recipe.diet === dietFilter;

    return matchesSearch && matchesDiet;
  });

  return (
    <section>
      {/* Render visibleRecipes here */}
    </section>
  );
}
```

### What you should implement yourself

Add:

- a heading
- an empty state
- a `.map()` that renders recipe names first
- later replace recipe names with `RecipeCard`

### What to understand here

`RecipeFilters` and `RecipeCatalog` are sibling components, but they share state through context. This is the first clear Context API win.

---

## Step 6: Create `RecipeCard`

### Create this file

```text
src/components/recipes/RecipeCard.jsx
```

### What this file should do

This component should:

- receive one recipe as a prop
- display the recipe summary
- later trigger meal-plan actions

### Start simple

For now, only display:

- recipe name
- meal type
- diet
- prep time

Do not connect `MealPlanContext` yet. First make the catalog work.

---

## Step 7: Create `MealPlanContext`

### Create this file

```text
src/contexts/MealPlanContext.jsx
```

### What this file should do

This context should manage the weekly plan.

### State to add first

Use an object with days as keys:

```js
const initialPlan = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],
};
```

Use lowercase consistently if you prefer. The important part is that every day has an array.

### Actions to add first

Add only these:

- `addMealToDay(day, recipe)`
- `removeMealFromDay(day, recipeId)`

### Starter shape

```jsx
import { createContext, useContext, useState } from "react";

const MealPlanContext = createContext(null);

const initialPlan = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],
};

export function MealPlanProvider({ children }) {
  const [mealPlan, setMealPlan] = useState(initialPlan);

  function addMealToDay(day, recipe) {
    // You write this update yourself.
  }

  function removeMealFromDay(day, recipeId) {
    // You write this update yourself.
  }

  return (
    <MealPlanContext.Provider
      value={{ mealPlan, addMealToDay, removeMealFromDay }}
    >
      {children}
    </MealPlanContext.Provider>
  );
}

export function useMealPlan() {
  const context = useContext(MealPlanContext);

  if (!context) {
    throw new Error("useMealPlan must be used inside MealPlanProvider");
  }

  return context;
}
```

### What you should implement yourself

Write the logic for:

- adding a recipe to the selected day's array
- removing a recipe by id from the selected day's array

### What to understand here

This context is your main shared app state. Recipe components can add meals, and planner components can display or remove them.

---

## Step 8: Add `MealPlanProvider`

### Edit this file

```text
src/App.jsx
```

### What to do

Wrap the app with both providers.

The order should be:

```jsx
<PreferencesProvider>
  <MealPlanProvider>
    {/* app layout */}
  </MealPlanProvider>
</PreferencesProvider>
```

### What to understand here

Provider order matters only when one provider needs to consume another provider. For now, this order is simple and safe.

---

## Step 9: Connect Recipes To The Planner

### Edit this file

```text
src/components/recipes/RecipeCard.jsx
```

### What to add

Add a button like:

```text
Add to Monday
```

When clicked, call:

```js
addMealToDay("monday", recipe);
```

### What to understand here

This is the second Context API win: a recipe card updates state that will be displayed somewhere else in the app.

---

## Step 10: Create Weekly Planner UI

### Create these files

```text
src/components/planner/WeeklyPlanner.jsx
src/components/planner/DayPlanCard.jsx
src/components/planner/PlannedMealItem.jsx
```

### `WeeklyPlanner.jsx`

What to do:

- read `mealPlan` from `MealPlanContext`
- loop over the days
- render one `DayPlanCard` per day

### `DayPlanCard.jsx`

What to do:

- receive `day` and `meals`
- render the planned meals for that day
- show an empty state when there are no meals

### `PlannedMealItem.jsx`

What to do:

- display one planned recipe
- add a remove button
- call `removeMealFromDay(day, recipe.id)`

### What to understand here

The planner does not receive meal data from `RecipeCatalog`. Both features communicate through `MealPlanContext`.

---

## Step 11: Create Grocery Utility

### Create this file

```text
src/utils/grocery.js
```

### What this file should do

Write a function that takes the meal plan and servings, then returns one merged grocery list.

Example function name:

```js
export function buildGroceryList(mealPlan, servings) {
  // You write the merging logic.
}
```

### What you should implement yourself

Loop through:

- each day in the meal plan
- each recipe in that day
- each ingredient in that recipe

Then combine ingredients with the same name.

### What to understand here

This logic should not live inside JSX. Keeping it in a utility makes the context and components easier to understand.

---

## Step 12: Create `GroceryListContext`

### Create this file

```text
src/contexts/GroceryListContext.jsx
```

### What this file should do

This context should:

- read `mealPlan` from `MealPlanContext`
- read `servings` from `PreferencesContext`
- create a grocery list using `buildGroceryList`
- manage checked grocery item names

### Starter shape

```jsx
import { createContext, useContext, useState } from "react";
import { useMealPlan } from "./MealPlanContext";
import { usePreferences } from "./PreferencesContext";
import { buildGroceryList } from "../utils/grocery";

const GroceryListContext = createContext(null);

export function GroceryListProvider({ children }) {
  const { mealPlan } = useMealPlan();
  const { servings } = usePreferences();
  const [checkedItems, setCheckedItems] = useState([]);

  const groceryItems = buildGroceryList(mealPlan, servings);

  function toggleChecked(itemName) {
    // You write this update yourself.
  }

  return (
    <GroceryListContext.Provider
      value={{ groceryItems, checkedItems, toggleChecked }}
    >
      {children}
    </GroceryListContext.Provider>
  );
}

export function useGroceryList() {
  const context = useContext(GroceryListContext);

  if (!context) {
    throw new Error("useGroceryList must be used inside GroceryListProvider");
  }

  return context;
}
```

### What you should implement yourself

Write the logic for:

- adding an item name to `checkedItems` if it is unchecked
- removing it if it is already checked

### What to understand here

This is context interaction:

- `GroceryListContext` depends on `MealPlanContext`
- `GroceryListContext` depends on `PreferencesContext`
- grocery UI consumes the final shared result

---

## Step 13: Add `GroceryListProvider`

### Edit this file

```text
src/App.jsx
```

### Provider order

Use this order:

```jsx
<PreferencesProvider>
  <MealPlanProvider>
    <GroceryListProvider>
      {/* app layout */}
    </GroceryListProvider>
  </MealPlanProvider>
</PreferencesProvider>
```

### Why this order matters

`GroceryListProvider` uses both:

- `useMealPlan`
- `usePreferences`

So it must be rendered inside both providers.

---

## Step 14: Create Grocery List UI

### Create these files

```text
src/components/grocery/GroceryListPanel.jsx
src/components/grocery/GroceryItem.jsx
```

### `GroceryListPanel.jsx`

What to do:

- read `groceryItems` from `GroceryListContext`
- render a list of grocery items
- show an empty state if no meals are planned

### `GroceryItem.jsx`

What to do:

- display ingredient name and quantity
- show a checkbox
- call `toggleChecked(item.name)`

### What to understand here

The grocery list updates when:

- a recipe is added to the planner
- a recipe is removed from the planner
- serving size changes

This is the strongest learning moment in the project.

---

## Best Build Order Summary

1. `src/data/recipes.js`
2. `src/contexts/PreferencesContext.jsx`
3. Wrap app with `PreferencesProvider`
4. `src/components/recipes/RecipeFilters.jsx`
5. `src/components/recipes/RecipeCatalog.jsx`
6. `src/components/recipes/RecipeCard.jsx`
7. `src/contexts/MealPlanContext.jsx`
8. Wrap app with `MealPlanProvider`
9. Connect `RecipeCard` to `addMealToDay`
10. `src/components/planner/WeeklyPlanner.jsx`
11. `src/components/planner/DayPlanCard.jsx`
12. `src/components/planner/PlannedMealItem.jsx`
13. `src/utils/grocery.js`
14. `src/contexts/GroceryListContext.jsx`
15. Wrap app with `GroceryListProvider`
16. `src/components/grocery/GroceryListPanel.jsx`
17. `src/components/grocery/GroceryItem.jsx`

---

## What Not To Build Yet

Avoid these until the core app works:

- drag and drop
- reducers
- local storage
- authentication
- backend APIs
- complex modals
- performance optimization
- advanced memoization

These are useful later, but they distract from learning Context API.

---

## How To Know You Are Learning The Right Thing

You are on track when you can explain:

- why `PreferencesContext` is global
- why `MealPlanContext` should not be inside `RecipeCatalog`
- why `GroceryListContext` depends on the other two contexts
- why recipe filters should not be passed through many component props
- why not every small UI state belongs in context

If you can explain those points, you are learning Context API properly.
