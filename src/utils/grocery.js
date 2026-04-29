export function buildGroceryList(mealPlan, servings) {
    // You write the merging logic.

    //extract ingredients from all the days
    let allIngredients = [];
    allIngredients = Object.keys(mealPlan).flatMap(day => {


        // outer flatMap will return array of object of recipe ingredients of each and every day 
        // inner flatMap will return arrays of Object of recipe ingredients of specific day
        return mealPlan[day].flatMap(recipe => {
            
            // compare recipe.serving with servings 
            // find out the difference, then increase/decrease quantity as per the differnce 
            const ratio= servings/recipe.serving;

            
          return recipe.ingredients.map(ing=>({...ing,quantity:ing.quantity*ratio})) 
        
        })
    })

    // now allIngredients becomes array of object
    // go through all the ingredients arrays and find similar ingredients and if same exist increase quantity and delete duplicate entries

    // bruete force approach 
    // for (let i = 0; i < allIngredients.length-1; i++) {

    //     for (let j = i+1; j < allIngredients.length; j++) {

    //          //aage wale objects me check krna h ki same name ke object h ki nahi, agr h to quantity increase krdo current index pe aur duplicate element delete krdo vrna skip the operation 
    //          if(allIngredients[i].name===allIngredients[j].name)
    //          {
    //              allIngredients[i].quantity++;
    //              allIngredients.splice(j,1)
    //              j--;
    //          }
    //     }


    // }

    // optimized approach
    let normalizeUnit = (unit) => {
        const units = {
            cup: "cup",
            cups: "cup",
            tablespoon: "tbsp",
            tablespoons: "tbsp",
            tbsp: "tbsp",
            piece: "piece",
            pieces: "piece"
        }

        return units[unit.toLowerCase()] || unit;
    }
    let result = {};
    for (let ing of allIngredients) {
        let key = ing.name.toLowerCase() + "_" + normalizeUnit(ing.unit)
        if (!(result[key])) {

            result[key] = { ...ing, unit: normalizeUnit(ing.unit) }
        }
        else {

            result[key].quantity += ing.quantity;
        }
    }
   return Object.values(result)
}