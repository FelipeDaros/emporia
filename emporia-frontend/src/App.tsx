import { ThemeProvider } from '@material-tailwind/react'
import { AuthContextProvider } from './context/AuthContext'
import { Router } from './routes/Router'
import { ToastProvider } from './context/ToastContext'

function App() {
  return (
    <AuthContextProvider>
      <ThemeProvider>
        <ToastProvider>
          <Router />
        </ToastProvider>
      </ThemeProvider>
    </AuthContextProvider>
  )
}

export default App
