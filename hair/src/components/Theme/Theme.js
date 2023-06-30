import { Children, createContext, useState,useContext } from "react";
/*Se crea el contexto*/
export const ThemeContext=createContext()

/* para proveer a los componenentes*/
export const ThemeContextProvider=({Children})=>{
    const [contextTheme,setContextTheme]=useState('light')
    const values ={contextTheme,setContextTheme}
    return(
        <ThemeContext.Provider value={values}>
            {Children}
        </ThemeContext.Provider>
    )

}
export const useThemeContext=()=>{
    const context=useContext(ThemeContext)
    return context
}