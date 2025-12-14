import Link from 'next/link'


export default function Home() {
return (
<main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
<h1 className="text-5xl font-bold mb-4">Research‑Nexus</h1>
<p className="text-gray-300 max-w-xl">
Upload documents. Ask questions. Get AI‑powered answers from your own knowledge base.
</p>


<div className="mt-8 flex gap-4">
<Link href="/login" className="px-6 py-3 rounded-xl bg-indigo-600">Login</Link>
<Link href="/signup" className="px-6 py-3 rounded-xl border">Sign Up</Link>
</div>
</main>
)
}