import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from 'context/AuthContext'
import { FiUserPlus, FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const [localError, setLocalError] = useState('')
  const { register, loading, error: authError } = useAuth()
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setLocalError('密碼不匹配')
      return
    }
    setLocalError('')
    try {
      await register(name, email, password)
      navigate('/')
    } catch (err) {
      // AuthContext will set authError
    }
  }

  const displayError = localError || authError

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
          <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
            <FiUserPlus className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            建立您的帳戶
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            加入我們，開始您的智慧生活。
          </p>
        </div>

        {displayError && <div className="p-3 my-4 text-sm text-red-700 bg-red-100 rounded-lg">{displayError}</div>}

        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none block w-full px-12 py-3 border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="姓名"
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
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
                type={isPasswordVisible ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-12 py-3 border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="密碼"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          
          <div>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="confirm-password"
                name="confirm-password"
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none block w-full px-12 py-3 border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="確認密碼"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
              >
                {isConfirmPasswordVisible ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-primary/40"
            >
              {loading ? '註冊中...' : '建立帳戶'}
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-600">
          已經有帳戶了？{' '}
          <Link to="/login" className="font-medium text-primary hover:text-primary/80">
            點此登入
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register