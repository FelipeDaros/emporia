import { ThemeProvider } from '@material-tailwind/react'
import { AuthContextProvider } from './context/AuthContext'
import { Router } from './routes/Router'

function App() {
  return (
    <AuthContextProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </AuthContextProvider>
  )
}

export default App
