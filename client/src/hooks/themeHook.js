import { useContext } from "react";
import { NotificationContext } from "../components/context/NotificationProvider";
import { ThemeContext } from "../components/context/ThemeProvider";

export const useTheme = ()=> useContext(ThemeContext)


export const useNotification = () => useContext(NotificationContext)