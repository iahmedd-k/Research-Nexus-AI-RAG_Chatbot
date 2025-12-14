'use client'


import { useState } from 'react'
import { supabase } from '@/lib/supabase-client'


export default function AuthForm({ type }: { type: 'login' | 'signup' }) {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')


async function handleSubmit() {
if (type === 'signup') {
await supabase.auth.signUp({ email, password })
} else {
await supabase.auth.signInWithPassword({ email, password })
}
}


return (
<div className="bg-slate-800 p-8 rounded-2xl w-full max-w-sm">
<h2 className="text-2xl font-semibold mb-4 capitalize">{type}</h2>


<input className="input" placeholder="Email" onChange={e => setEmail(e.target.value)} />
<input className="input mt-3" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />


<button onClick={handleSubmit} className="btn-primary mt-4 w-full">Continue</button>
</div>
)
}