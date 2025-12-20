import AuthForm from '@/components/Authform'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function Signup() {
return (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center p-4">
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <Link
          href="/"
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          Join Research Nexus
        </h1>
        <p className="text-gray-400">Create your account to start exploring research documents</p>
      </div>
      <AuthForm type="signup" />
      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  </div>
)
}