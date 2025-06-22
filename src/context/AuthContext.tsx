import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import axios from 'axios'

// 檢測環境並設定 API URL
const getAPIUrl = () => {
  // 優先使用環境變數
  const envApiUrl = (import.meta as any).env?.VITE_API_URL;
  if (envApiUrl) {
    return envApiUrl;
  }
  
  // GitHub Pages 環境
  if (window.location.hostname === 'yun1988.github.io') {
    return 'http://localhost:3001';
  }
  // Vercel 環境
  else if (window.location.hostname.includes('vercel.app')) {
    return '/api';
  }
  // 本地開發環境
  else {
    return 'http://localhost:3001';
  }
};

const API_URL = getAPIUrl();

interface User {
  id: number
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<void>
  loading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // 嘗試從 localStorage 恢復登入狀態
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const handleAuthSuccess = (userData: User) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    setError(null)
  }

  const login = async (email: string, password: string) => {
    setError(null)
    setLoading(true)
    try {
      const response = await axios.get(`${API_URL}/users`, {
        params: { email, password },
      })

      if (response.data.length > 0) {
        handleAuthSuccess(response.data[0])
      } else {
        throw new Error('電子郵件或密碼錯誤')
      }
    } catch (err: any) {
      setError(err.message || '登入時發生錯誤')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const register = async (name: string, email: string, password: string) => {
    setError(null)
    setLoading(true)
    try {
      const existingUsers = await axios.get(`${API_URL}/users`, { params: { email } })
      if (existingUsers.data.length > 0) {
        throw new Error('此電子郵件已被註冊')
      }

      const response = await axios.post(`${API_URL}/users`, { name, email, password })
      handleAuthSuccess(response.data)
    } catch (err: any) {
      setError(err.message || '註冊時發生錯誤')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}