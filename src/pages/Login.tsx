import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'

// Add type definition
interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading, error: authError } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      // Error is handled by context
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
            <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
                <FiLogIn className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
                登入您的帳戶
            </h2>
            <p className="mt-2 text-sm text-gray-600">
                歡迎回來！請輸入您的詳細資訊。
            </p>
        </div>

        {authError && <div className="p-3 my-4 text-sm text-red-700 bg-red-100 rounded-lg">{authError}</div>}

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-12 py-3 border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="電子郵件"
                />
            </div>
          </div>

          <div>
            <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-12 py-3 border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="密碼"
                />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-primary/40"
            >
              {loading ? '登入中...' : '登入'}
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-600">
            還沒有帳戶？{' '}
            <Link to="/register" className="font-medium text-primary hover:text-primary/80">
                立即註冊
            </Link>
        </p>
      </div>
    </div>
  )
}

function Button({ children, variant = 'primary' }: ButtonProps) {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors'
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  }
  
  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </button>
  )
}

function Card({ isActive }: { isActive: boolean }) {
  return (
    <div className={`
      p-4 rounded-lg border
      ${isActive 
        ? 'bg-blue-50 border-blue-200 shadow-md' 
        : 'bg-white border-gray-200'
      }
    `}>
      {/* 內容 */}
    </div>
  )
}