import { useState } from 'react'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Onboard() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [data, setData] = useState({ diet:'none', cuisines:[], allergies:[], breakfast:'08:00', lunch:'12:00', dinner:'18:00' })

  const next = () => {
    if (step === 4) { localStorage.setItem('prefs', JSON.stringify(data)); router.push('/dashboard') }
    else setStep(s => s + 1)
  }

  const chipToggle = (arr, val) => data[arr].includes(val) ? setData({...data, [arr]: data[arr].filter(x=>x!==val)}) : setData({...data, [arr]: [...data[arr], val]})

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6"><div className="bg-primary h-2 rounded-full" style={{width: `${step*25}%`}}></div></div>

      {step === 1 && <section>
        <h2 className="text-xl font-bold mb-4">Step 1 of 4 – Diet</h2>
        <div className="grid grid-cols-2 gap-3">
          {['none','vegetarian','vegan','ketogenic','paleo','mediterranean','lowcarb'].map(d=>
            <label key={d} className="flex items-center gap-2 border rounded-lg p-3 cursor-pointer">
              <input type="radio" name="diet" value={d} checked={data.diet===d} onChange={e=>setData({...data,diet:e.target.value})} />
              {d}
            </label>)}
        </div>
        <button onClick={next} className="mt-6 w-full bg
