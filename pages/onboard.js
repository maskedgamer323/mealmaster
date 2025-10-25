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
        <button onClick={next} className="mt-6 w-full bg-primary text-white py-2 rounded-lg">Next</button>
      </section>}

      {step === 2 && <section>
        <h2 className="text-xl font-bold mb-4">Step 2 – Cuisines & Allergies</h2>
        <p className="mb-2 font-semibold">Cuisines you enjoy</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {['Italian','Asian','Mexican','Indian','Thai','Japanese','Chinese','American','French','Quick meals','Comfort','Healthy','Spicy'].map(c=>
            <span key={c} onClick={()=>chipToggle('cuisines',c)} className={`px-3 py-1 rounded-full cursor-pointer border ${data.cuisines.includes(c)?'bg-primary text-white':'bg-white'}`}>{c}</span>)}
        </div>
        <p className="mb-2 font-semibold">Allergies</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {['Nuts','Dairy','Eggs','Shellfish','Soy','Gluten','Fish'].map(a=>
            <span key={a} onClick={()=>chipToggle('allergies',a)} className={`px-3 py-1 rounded-full cursor-pointer border ${data.allergies.includes(a)?'bg-red-500 text-white':'bg-white'}`}>{a}</span>)}
        </div>
        <div className="flex gap-3"><button onClick={()=>setStep(s=>s-1)} className="flex-1 border py-2 rounded-lg">Back</button><button onClick={next} className="flex-1 bg-primary text-white py-2 rounded-lg">Next</button></div>
      </section>}

      {step === 3 && <section>
        <h2 className="text-xl font-bold mb-4">Step 3 – Meal Times</h2>
        <label className="block mb-2">Breakfast <input type="time" value={data.breakfast} onChange={e=>setData({...data,breakfast:e.target.value})} className="ml-2 border rounded px-2 py-1" /></label>
        <label className="block mb-2">Lunch <input type="time" value={data.lunch} onChange={e=>setData({...data,lunch:e.target.value})} className="ml-2 border rounded px-2 py-1" /></label>
        <label className="block mb-4">Dinner <input type="time" value={data.dinner} onChange={e=>setData({...data,dinner:e.target.value})} className="ml-2 border rounded px-2 py-1" /></label>
        <div className="flex gap-3"><button onClick={()=>setStep(s=>s-1)} className="flex-1 border py-2 rounded-lg">Back</button><button onClick={next} className="flex-1 bg-primary text-white py-2 rounded-lg">Next</button></div>
      </section>}

      {step === 4 && <section>
        <h2 className="text-xl font-bold mb-4">Step 4 – Pantry Scan (optional)</h2>
        <CameraScan onSnap={(img)=>{ localStorage.setItem('pantry',img); next() }} />
        <button onClick={next} className="mt-4 w-full border py-2 rounded-lg">Skip</button>
      </section>}
    </main>
  )
}

function CameraScan({ onSnap }) {
  const [stream, setStream] = useState(null)
  const start = async () => {
    const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    setStream(s)
    document.getElementById('video').srcObject = s
  }
  const snap = () => {
    const v = document.getElementById('video')
    const canvas = document.createElement('canvas')
    canvas.width = v.videoWidth
    canvas.height = v.videoHeight
    canvas.getContext('2d').drawImage(v, 0, 0)
    stream.getTracks().forEach(t => t.stop())
    onSnap(canvas.toDataURL('image/jpeg'))
  }
  return (
    <div>
      <video id="video" autoPlay playsInline className="w-full rounded-lg" />
      <div className="flex gap-3 mt-3">
        <button onClick={start} className="flex-1 border py-2 rounded-lg">Open Camera</button>
        <button onClick={snap} className="flex-1 bg-primary text-white py-2 rounded-lg">Snap</button>
      </div>
    </div>
  )
