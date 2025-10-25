import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) router.push('/onboard')
    })
  }, [])
  return (
    <main className="grid h-screen place-items-center bg-gradient-to-br from-orange-400 to-rose-400">
      <div className="w-full max-w-md rounded-2xl bg-white/80 p-8 shadow-2xl backdrop-blur">
        <h1 className="mb-4 text-center text-2xl font-bold">MealMaster</h1>
        <p className="text-center mb-6">Zero-think meals with what you have.</p>
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={['google']} redirectTo={`${location.origin}/auth/callback`} onlyThirdPartyProviders />
      </div>
    </main>
  )
}
