import React from 'react'
import { Moon, Sun } from 'lucide-react'

function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('theme') || 'light'
    }
    return 'light'
  })

  React.useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className={`rounded-full p-2 hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-[#2F5A3D] dark:focus:ring-[#4a8a5e] ${className}`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-[#2F5A3D]" />
      ) : (
        <Sun className="h-5 w-5 text-[#4a8a5e]" />
      )}
      <span className="sr-only">
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </span>
    </button>
  )
}

export default ThemeToggle