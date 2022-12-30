import React from 'react'
import AnimeProvider from './AnimeProvider'
import AuthProvider from './AuthProvider'
import NotificationProvider from './NotificationProvider'
import SearchProvider from './SearchProvider'
import ThemeProvider from './ThemeProvider'

function ContextProviders({children}) {
  return (
    <NotificationProvider>
      <SearchProvider>
    <AnimeProvider>

    <AuthProvider>

  
    <ThemeProvider>
  
      {children}
    </ThemeProvider>
    </AuthProvider>
    </AnimeProvider>
      </SearchProvider>
    </NotificationProvider>
  
  )
}

export default ContextProviders