import React,{createContext, useEffect} from 'react'


export const ThemeContext = createContext()

const defaultTheme = 'light'
const darkTheme = 'dark'

const getTheme = ()=> localStorage.getItem('theme')

const updateTheme = (theme,themeRemove)=>{
    if(themeRemove) document.documentElement.classList.remove(themeRemove)

    document.documentElement.classList.add(theme)
        
        localStorage.setItem('theme',theme)
}


function ThemeProvider({children}) {
    
    const toggleTheme=()=>{
         const oldTheme = getTheme()
         const newTheme = oldTheme === defaultTheme? darkTheme: defaultTheme
         updateTheme(newTheme,oldTheme)
        
    }

    useEffect(()=>{
        const theme =getTheme()
        if (!theme) updateTheme(defaultTheme)
        else updateTheme(darkTheme)
    },[])
  return (
    <ThemeContext.Provider value={{toggleTheme}}>
{children}
    </ThemeContext.Provider>
  )
}


export default ThemeProvider