import { createContext, useContext, useState } from "react"
import { useMealPlanContext } from "./MealPlanContext"
import { usePreferencesContext } from "./PreferencesContext";
import { buildGroceryList } from "../utils/grocery";



let GroceryListContext = createContext({
    groceryItems: [],
    checkedItems: [],
    toggleChecked: (itemName,itemUnit) => { },
    clearCheckedItems:()=>{}
})

export   const GroceryListContextProvider = ({ children }) => {
    const { mealPlan } = useMealPlanContext();
    const { servings } = usePreferencesContext();
    const [checkedItems, setCheckedItems] = useState([])



    let groceryItems = buildGroceryList(mealPlan, servings);
    
    let toggleChecked=(itemName,itemUnit)=>{
        // if unchecked then add in the list else remove it from the list 
        // const exist= checkedItems.includes(itemName);
        // if(exist)
        // {
        //      let updatedItems= checkedItems.filter(name=>name!==itemName)
        //      setCheckedItems(updatedItems);
        //      return;
        // }
        // setCheckedItems(prev=>[...prev,itemName]);

        setCheckedItems(prev=>{
               const exist= prev.includes(itemName+"_"+itemUnit); 
               if(exist)
               {
                 return prev.filter(nameAndUnit=>nameAndUnit!==itemName+"_"+itemUnit)
               }
               return [...prev,itemName+"_"+itemUnit]
        })
    }
     function clearCheckedItems() {
      setCheckedItems([]);
  }
    return (
        <GroceryListContext value={{groceryItems, checkedItems,toggleChecked, clearCheckedItems}}>

            {children}
        </GroceryListContext>
    )
}

export const useGroceryListContext=()=>{
       return useContext(GroceryListContext)
}
