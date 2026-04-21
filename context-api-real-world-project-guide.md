# Context API Project Guide

## 1. Project Idea

### Project: Weekly Meal Planner

Build a frontend-only React app where a user can:

- browse a list of recipes
- assign recipes to days of the week
- automatically build a grocery list from planned meals
- adjust serving size and dietary preferences

This is a strong intermediate Context API project because the features are connected:

- picking a recipe in one part of the app affects the weekly planner
- changing servings updates ingredient quantities in multiple places
- removing a planned meal updates the grocery list automatically
- filters and preferences affect what recipes are shown across the app

It feels like a real product, but it is still small enough to build without getting overwhelmed.

---

## 2. Folder Structure

```text
src/
  App.jsx
  main.jsx
  data/
    recipes.js
  contexts/
    MealPlanContext.jsx
    GroceryListContext.jsx
    PreferencesContext.jsx
  components/
    layout/
      Header.jsx
      AppLayout.jsx
    recipes/
      RecipeCatalog.jsx
      RecipeCard.jsx
      RecipeFilters.jsx
      RecipeDetailsModal.jsx
    planner/
      WeeklyPlanner.jsx
      DayPlanCard.jsx
      PlannedMealItem.jsx
    grocery/
      GroceryListPanel.jsx
      GroceryItem.jsx
    preferences/
      PreferencesPanel.jsx
  hooks/
    useMealPlan.js
    useGroceryList.js
    usePreferences.js
  utils/
    grocery.js
```

Why this structure works:

- contexts are easy to find
- components are grouped by feature
- custom hooks keep component code cleaner
- utilities hold shared logic like ingredient merging

---

## 3. Contexts

## `MealPlanContext`

### What state it manages

- selected meals for each day
- currently selected recipe for preview/details
- actions to add, replace, or remove a meal from a day

### Why it is global

The meal plan is used in many places:

- the weekly planner shows what is scheduled
- recipe cards need to add meals into the plan
- the recipe details modal may add a recipe to a specific day
- the grocery list depends on the current plan

If this stayed local, you would quickly pass plan data and handlers through many layers.

### Where it is used

- `WeeklyPlanner`
- `DayPlanCard`
- `PlannedMealItem`
- `RecipeCatalog`
- `RecipeCard`
- `RecipeDetailsModal`
- `GroceryListContext` for derived grocery data

---

## `GroceryListContext`

### What state it manages

- grocery items generated from planned meals
- checked/unchecked state for each grocery item
- action to clear checked items

### Why it is global

The grocery list is shown and updated from different parts of the app:

- the grocery sidebar displays combined ingredients
- meal changes need to update the grocery list
- checking items should persist while the user navigates the app

This context is useful because it shows how one global feature can depend on another.

### Where it is used

- `GroceryListPanel`
- `GroceryItem`
- `Header` for item count
- connected to `MealPlanContext` to rebuild the list when planned meals change

---

## `PreferencesContext`

### What state it manages

- serving size multiplier
- dietary filter such as vegetarian or high-protein
- search text or active category filter
- optional theme toggle if you want one extra simple global setting

### Why it is global

These preferences affect multiple distant components:

- recipe catalog filtering
- ingredient quantities in recipe details
- grocery list quantities
- planner suggestions or visible recipe options

This context helps you understand when user settings belong globally instead of inside one component.

### Where it is used

- `RecipeFilters`
- `RecipeCatalog`
- `RecipeDetailsModal`
- `GroceryListPanel`
- `PreferencesPanel`

---

## 4. Component Breakdown

## Layout

### `App`

What to implement:

- wrap the app in the three providers
- render the main layout

Consumes from context:

- none directly

Actions triggered:

- none

### `Header`

What to implement:

- app title
- grocery item count
- button to open preferences panel if you choose to make it a drawer/modal

Consumes from context:

- grocery item count from `GroceryListContext`

Actions triggered:

- optional open/close local UI state for preferences

### `AppLayout`

What to implement:

- main page structure with recipe catalog, weekly planner, and grocery panel

Consumes from context:

- none directly

Actions triggered:

- none

## Recipes Feature

### `RecipeCatalog`

What to implement:

- show filtered recipes
- render recipe cards
- handle empty state when filters remove all recipes

Consumes from context:

- active filters from `PreferencesContext`
- selected day or meal-adding helpers from `MealPlanContext` if needed

Actions triggered:

- open recipe details
- add recipe to a day

### `RecipeCard`

What to implement:

- recipe name, tags, prep time, short ingredient preview
- buttons like `View Details` and `Add to Plan`

Consumes from context:

- `MealPlanContext`
- `PreferencesContext` if visible info changes by servings/filter

Actions triggered:

- set selected recipe
- add recipe to a chosen day

### `RecipeFilters`

What to implement:

- search input
- category or diet filter
- serving size selector

Consumes from context:

- filter values from `PreferencesContext`

Actions triggered:

- update search text
- update diet/category
- update servings

### `RecipeDetailsModal`

What to implement:

- full recipe view
- ingredients scaled by serving size
- add-to-plan action

Consumes from context:

- selected recipe from `MealPlanContext`
- serving size from `PreferencesContext`

Actions triggered:

- close modal
- add recipe to a selected day

## Planner Feature

### `WeeklyPlanner`

What to implement:

- render 7 day cards
- show planned meals for each day

Consumes from context:

- weekly meal plan from `MealPlanContext`

Actions triggered:

- mostly delegated to child components

### `DayPlanCard`

What to implement:

- show one day's meals
- allow drop-in or click-based adding
- show empty state when no meals are planned

Consumes from context:

- meals for that day from `MealPlanContext`

Actions triggered:

- remove meal
- replace meal
- open recipe picker flow

### `PlannedMealItem`

What to implement:

- show planned recipe summary
- quick remove button
- quick view details button

Consumes from context:

- `MealPlanContext`

Actions triggered:

- remove planned meal
- set selected recipe

## Grocery Feature

### `GroceryListPanel`

What to implement:

- show merged grocery items from all planned meals
- group by section if you want: produce, dairy, pantry
- show checked and unchecked items

Consumes from context:

- grocery items from `GroceryListContext`
- servings from `PreferencesContext` if quantities are recalculated live

Actions triggered:

- toggle checked state
- clear checked items

### `GroceryItem`

What to implement:

- single grocery row with checkbox and quantity

Consumes from context:

- item data from props or `GroceryListContext`

Actions triggered:

- toggle checked

## Preferences Feature

### `PreferencesPanel`

What to implement:

- controls for servings and dietary preferences
- maybe one simple theme toggle

Consumes from context:

- `PreferencesContext`

Actions triggered:

- update global preferences

---

## 5. Step-by-Step Implementation Plan

## Step 1: Prepare static data

Build first:

- recipe data file with 8 to 12 recipes
- each recipe should have id, name, tags, ingredients, and meal type

Why first:

- all later UI depends on this data

## Step 2: Build `PreferencesContext`

Build first:

- serving size state
- search text
- category/diet filter

How to connect:

- wrap the app with `PreferencesContext.Provider`
- use it inside `RecipeFilters` and `RecipeCatalog`

Why here:

- it is the easiest context and gives you an early win

## Step 3: Build the recipe catalog UI

Build first:

- `RecipeFilters`
- `RecipeCatalog`
- `RecipeCard`

How to connect:

- filter recipes based on values from `PreferencesContext`

What you learn:

- one global context controlling multiple sibling components

## Step 4: Build `MealPlanContext`

Build first:

- meal plan object for 7 days
- `addMealToDay`
- `removeMealFromDay`
- `setSelectedRecipe`

How to connect:

- recipe cards add meals into the planner
- planner reads the shared meal plan state

What you learn:

- avoiding prop drilling between recipe list, modal, and planner area

## Step 5: Build planner components

Build first:

- `WeeklyPlanner`
- `DayPlanCard`
- `PlannedMealItem`

How to connect:

- read meals from `MealPlanContext`
- trigger remove/replace actions from planner components

What you learn:

- multiple components reading and updating the same global state

## Step 6: Build `GroceryListContext`

Build first:

- function that converts planned meals into grocery items
- checked state for grocery items

How to connect:

- whenever meal plan changes, rebuild the grocery list
- whenever serving size changes, update quantities

What you learn:

- context-to-context interaction in a simple, practical way

## Step 7: Build grocery components

Build first:

- `GroceryListPanel`
- `GroceryItem`

How to connect:

- show merged ingredients from `GroceryListContext`
- toggle checked state from the list UI

What you learn:

- global derived data that is useful across the app

## Step 8: Add recipe details modal

Build first:

- selected recipe view
- scaled ingredients
- add-to-plan action

How to connect:

- selected recipe comes from `MealPlanContext`
- ingredient scaling comes from `PreferencesContext`

What you learn:

- one component consuming data from more than one context in a realistic way

## Step 9: Polish interactions

Add:

- empty states
- clear checked grocery items
- replace an already planned meal
- optional local storage persistence later if you want

Keep it simple:

- stay with `useState`, `useContext`, and a few helper functions
- do not move to reducers unless the app genuinely feels messy

---

## 6. Common Mistakes To Avoid

## 1. Putting everything in one context

Bad idea:

- one huge `AppContext` for recipes, planner, grocery list, filters, modal state, and theme

Why it hurts:

- harder to understand
- too many unrelated re-renders
- unclear ownership

Better:

- keep `MealPlan`, `GroceryList`, and `Preferences` separate

## 2. Making local UI state global

Bad idea:

- storing every modal open state, hover state, and input focus in context

Why it hurts:

- context becomes noisy fast

Better:

- keep small UI-only state local unless multiple distant components need it

## 3. Duplicating the same data in multiple contexts

Bad idea:

- storing full recipe objects inside both `MealPlanContext` and `GroceryListContext`

Why it hurts:

- data can get out of sync

Better:

- store ids or derive data when possible

## 4. Storing derived values as separate source state

Bad idea:

- manually storing filtered recipes and merged grocery items in many places

Why it hurts:

- easy to forget updates

Better:

- keep source data clean and derive what you need with helper functions

## 5. Passing giant context values everywhere

Bad idea:

- every component reads the whole context object even when it needs one field

Why it hurts:

- more unnecessary re-renders
- components become harder to read

Better:

- make small custom hooks and consume only what is needed

## 6. Mixing business logic directly inside JSX

Bad idea:

- ingredient merging and quantity scaling written inline in components

Why it hurts:

- harder to debug and reuse

Better:

- move that logic into `utils/grocery.js`

## 7. Jumping too early into advanced patterns

Bad idea:

- reducers, memoization everywhere, context splitting for micro-optimization

Why it hurts:

- you start learning architecture complexity instead of Context API basics

Better:

- first build the app with plain contexts and clean helper functions
- optimize only if a real problem appears

---

## Final Goal

By building this project, you will practice:

- deciding what should be global vs local
- using multiple contexts in one app without turning it into a mess
- sharing state across distant components
- handling real feature interactions instead of isolated examples
- understanding how one context can influence another in a practical React app

If you want, I can also turn this guide into a second markdown file with a suggested file-by-file build order and starter code snippets for each context.
