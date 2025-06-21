import React, { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  username: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  register: (username: string, password: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // 模擬延遲與簡單驗證
  const login = async (username: string, password: string) => {
    // 這裡可以改成call API
    if (username === 'user' && password === 'password') {
      setUser({ username })
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  const register = async (username: string, password: string) => {
    // 這裡可以call API，這裡模擬直接成功
    if (username && password) {
      setUser({ username })
      return true
    }
    return false
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}