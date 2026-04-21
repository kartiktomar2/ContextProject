import React, { createContext, useContext, useState } from 'react'

const PreferencesContext = createContext({
    searchText: "",
    setSearchText: () => { },
    dietFilter: "all",
    setDietFilter: () => { },
    servings: 2,
    setServings: () => { }
});

export const PreferencesContextProvider = ({ children }) => {
    const [searchText, setSearchText] = useState("");
    const [dietFilter, setDietFilter] = useState("all");
    const [servings, setServings] = useState(2)
    return (
        <PreferencesContext value={{ searchText, setSearchText, dietFilter, setDietFilter, servings, setServings }} >
            {children}

        </PreferencesContext>
    )
}


export const usePreferencesContext = () => {
    return useContext(PreferencesContext)
}

