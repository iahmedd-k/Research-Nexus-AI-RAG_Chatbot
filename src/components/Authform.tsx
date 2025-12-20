'use client'


import { useState } from 'react'
import { supabase } from '@/lib/supabase-client'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'


export default function AuthForm({ type }: { type: 'login' | 'signup' }) {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [showPassword, setShowPassword] = useState(false)
const [loading, setLoading] = useState(false)
const [error, setError] = useState('')


async function handleSubmit() {
  if (!email || !password) {
    setError('Please fill in all fields')
    return
  }

  setLoading(true)
  setError('')

  try {
    if (type === 'signup') {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) throw error
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
    }
  } catch (err: any) {
    setError(err.message || 'An error occurred')
  } finally {
    setLoading(false)
  }
}


return (
<div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl w-full max-w-md border border-slate-700 shadow-2xl">
<h2 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent capitalize">{type}</h2>
<p className="text-gray-400 text-center mb-8">Access your Research Nexus account</p>

{error && (
  <div className="bg-red-600/20 border border-red-600/50 text-red-300 px-4 py-3 rounded-xl mb-6 text-sm">
    {error}
  </div>
)}

<div className="space-y-6">
  <div className="relative">
    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
    <input
      className="w-full pl-12 pr-4 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      placeholder="Email address"
      type="email"
      value={email}
      onChange={e => setEmail(e.target.value)}
    />
  </div>

  <div className="relative">
    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
    <input
      className="w-full pl-12 pr-12 py-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      type={showPassword ? "text" : "password"}
      placeholder="Password"
      value={password}
      onChange={e => setPassword(e.target.value)}
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
    >
      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
    </button>
  </div>

  <button
    onClick={handleSubmit}
    disabled={loading}
    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
  >
    {loading ? 'Please wait...' : `Continue`}
  </button>
</div>
</div>
)
}