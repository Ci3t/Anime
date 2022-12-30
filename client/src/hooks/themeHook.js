import { useContext } from "react";
import { AnimeContext } from "../components/context/AnimeProvider";
import { AuthContext } from "../components/context/AuthProvider";
import { NotificationContext } from "../components/context/NotificationProvider";
import { SearchContext } from "../components/context/SearchProvider";
import { ThemeContext } from "../components/context/ThemeProvider";

export const useTheme = ()=> useContext(ThemeContext)


export const useNotification = () => useContext(NotificationContext)
export const useAuth = () => useContext(AuthContext)
export const useSearch = () => useContext(SearchContext)
export const useAnime= () => useContext(AnimeContext)