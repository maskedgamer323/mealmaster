import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Onboard() {
  const [step, setStep] = useState(1);
  const [prefs, setPrefs] = useState({ diet: 'none', cuisines: [], allergies: [], breakfast: '08:00', lunch: '12:00', dinner: '18:00' });

  const next = () => step === 4 ? (localStorage.setItem('prefs', JSON.stringify(prefs)), router.push('/dashboard')) : setStep(s => s + 1);
  const router = useRouter();

  const chipToggle = (arr, val) => setPrefs({ ...prefs, [arr]: prefs[arr].includes(val) ? prefs[arr].filter(x => x !== val) : [...prefs[arr], val] });

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6"><div className="bg-orange-500 h-2 rounded-full" style={{ width: `${step * 25}%` }} /></div>

      {step === 1 && <section><h2 className="text-xl font-bold mb-4">Step 1 of 4 – Diet</h2>
        <div className="grid grid-cols-2 gap-3">
          {['none', 'vegetarian', 'vegan', 'ketogenic', 'paleo', 'mediterranean', 'lowcarb'].map(d =>
            <label key={d} className="flex items-center gap-2 border rounded-lg p-3 cursor-pointer">
              <input type="radio" name="diet" value={d} checked={prefs.diet === d} onChange={e => setPrefs({ ...prefs, diet: e.target.value })} />{d}
            </label>)}
        </div>
        <button onClick={next} className="mt-6 w-full bg-orange-500 text-white py-2 rounded-lg">Next</button>
      </section>}

      {step === 2 && <section><h2 className="text-xl font-bold mb-4">Step 2 – Cuisines & Allergies</h2>
        <p className="mb-2 font-semibold">Cuisines you enjoy</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {['Italian', 'Asian', 'Mexican', 'Indian', 'Thai', 'Japanese', 'Quick meals', 'Comfort food', 'Healthy'].map(c =>
            <span key={c} onClick={() => chipToggle('cuisines', c)} className={`px-3 py-1 rounded-full cursor-pointer border ${prefs.cuisines.includes(c) ? 'bg-orange-500 text-white' : 'bg-white'}`}>{c}</span>)}
        </div>
        <p className="mb-2 font-semibold">Allergies</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {['Nuts', 'Dairy', 'Eggs', 'Shellfish', 'Soy', 'Gluten'].map(a =>
            <span key={a} onClick={() => chipToggle('allergies', a)} className={`px-3 py-1 rounded-full cursor-pointer border ${prefs.allergies.includes(a) ? 'bg-red-500 text-white' : 'bg-white'}`}>{a}</span>)}
        </div>
        <div className="flex gap-3"><button onClick={() => setStep(s => s - 1)} className="flex-1 border py-2 rounded-lg">Back</button><button onClick={next} className="flex-1 bg-orange-500 text-white py-2 rounded-lg">Next</button></div>
      </section>}

      {step === 3 && <section><h2 className="text-xl font-bold mb-4">Step 3 – Meal Times</h2>
        <label className="block mb-2">Breakfast <input type="time" value={prefs.breakfast} onChange={e => setPrefs({ ...prefs, breakfast: e.target.value })} className="ml-2 border rounded px-2 py-1" /></label>
        <label className="block mb-2">Lunch <input type="time" value={prefs.lunch} onChange={e => setPrefs({ ...prefs, lunch: e.target.value })} className="ml-2 border rounded px-2 py-1" /></label>
        <label className="block mb-4">Dinner <input type="time" value={prefs.dinner} onChange={e => setPrefs({ ...prefs, dinner: e.target.value })} className="ml-2 border rounded px-2 py-1" /></label>
        <div className="flex gap-3"><button onClick={() => setStep(s => s - 1)} className="flex-1 border py-2 rounded-lg">Back</button><button onClick={next} className="flex-1 bg-orange-500 text-white py-2 rounded-lg">Next</button></div>
      </section>}

      {step === 4 && <section><h2 className="text-xl font-bold mb-4">Step 4 – Pantry Scan (optional)</h2>
        <CameraScan onSnap={img => { localStorage.setItem('pantry', img); next(); }} />
        <button onClick={next} className="mt-4 w-full border py-2 rounded-lg">Skip for now</button>
        <div className="flex gap-3 mt-2"><button onClick={() => setStep(s => s - 1)} className="flex-1 border py-2 rounded-lg">Back</button></div>
      </section>}
    </main>
  );
}

function CameraScan({ onSnap }) {
  const [stream, setStream] = useState(null);
  const start = async () => {
    const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    setStream(s);
    document.getElementById('video').srcObject = s;
  };
  const snap = () => {
    const v = document.getElementById('video');
    const canvas = document.createElement('canvas');
    canvas.width = v.videoWidth;
    canvas.height = v.videoHeight;
    canvas.getContext('2d').drawImage(v, 0, 0);
    stream.getTracks().forEach(t => t.stop());
    onSnap(canvas.toDataURL('image/jpeg'));
  };
  return (
    <div>
      <video id="video" autoPlay playsInline className="w-full rounded-lg" />
      <div className="flex gap-3 mt-3">
        <button onClick={start} className="flex-1 border py-2 rounded-lg">Open Camera</button>
        <button onClick={snap} className="flex-1 bg-orange-500 text-white py-2 rounded-lg">Snap</button>
      </div>
    </div>
  );
}
