import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-purple-300 via-pink-300 to-yellow-300 px-4">
      <div className="bg-white p-12 rounded-3xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">歡迎，{user?.email}！</h1>
        <button
          onClick={logout}
          className="px-8 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
        >
          登出
        </button>
      </div>
    </div>
  )
}