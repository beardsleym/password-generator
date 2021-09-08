import { useState, useEffect } from 'react';
import zxcvbn from 'zxcvbn';
import generator from 'generate-password';
import { RefreshIcon } from '@heroicons/react/outline'

function App() {
  const [password, setPassword] = useState('');
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [length, setLength] = useState(12);
  const [excludeSimilarCharacters, setExcludeSimilarCharacters] = useState(false);
  const [radio, setRadioval] = useState('all');

  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(null);
  const [color, setColor] = useState('');

  const generatePassword = () => {
    const config = {
      length,
      numbers,
      symbols,
      lowercase,
      uppercase,
      excludeSimilarCharacters
    }
    const result = generator.generate(config)
    // console.log(zxcvbn(result))
    setPassword(result) 
  }
  const handleClick = () => {
    generatePassword()
  }
  const handleRadio = (event) => {
    const value = event.target.value
    setRadioval(value)
    if (value === 'read') {
      setExcludeSimilarCharacters(true)
      setSymbols(false)
    } else if (value === 'all') {
      setUppercase(true)
      setLowercase(true)
      setExcludeSimilarCharacters(false)
      setSymbols(true)
      setNumbers(true)
    } else if (value === 'say') {
      setExcludeSimilarCharacters(false)
      setSymbols(false)
      setNumbers(false)
      setUppercase(true)
      setLowercase(true)
    } 
  }

  // On first render
  useEffect(()=>{
    generatePassword()
  },[])
   
   useEffect(()=>{
    generatePassword()
  },[length,uppercase,lowercase,symbols,numbers,radio])

  useEffect(()=>{
    const result = zxcvbn(password)
    setFeedback(result)
    console.log(result)
  },[password])

  useEffect(()=>{
    let color = ''
    switch (feedback.score) {
      case 0:
        color = ''
        break;
      case 1:
        color = 'gray'
        break;
      case 2:
        color = 'red'
        break;
      case 3:
        color = 'yellow'
        break;
      case 4:
        color = 'green'
        break;  
    }
    setColor(color)
  },[feedback.score])

  return (
    <div className="App h-screen w-full flex justify-center items-center bg-gray-500">
      <div className="w-full max-w-lg bg-gray-800" >
        <form action="" className=" bg-white shadow-md rounded px-8 py-8 pt-8">
          <div className="px-4">
            <label htmlFor="text" className="text-sm block font-bold  pb-2">Your Password</label>
            <input type="text" name="text" value={password} onChange={(event) => setPassword(event.target.value)} className="border rounded w-full py-5 px-5 text-gray-700 border-gray-300 focus:outline-none" />
          </div>
          <div className="grid grid-cols-4 gap-1 px-4">
            {feedback.score === 0 && <div className={`border-b-8 border-white`}></div>}
            {feedback.score > 0 && <div className={`border-b-8 border-${color}-300`}></div>}
            {feedback.score > 1 && <div className={`border-b-8 border-${color}-300`}></div>}
            {feedback.score > 2 && <div className={`border-b-8 border-${color}-300`}></div>}
            {feedback.score > 3 && <div className={`border-b-8 border-${color}-300`}></div>}
          </div>
          <div>
            <button onClick={handleClick} className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              <RefreshIcon className="h-5 w-5 text-gray-900"/>
            </button>
          </div>
          <h5 className="text-sm block font-bold pb-2">Customise your password</h5>

          {/* LENGTH */}
          <div className="px-4 pb-4">
            <input type="range" name="length" min="1" max="50" step="1" value={length} onChange={(event) => setLength(event.target.value)}/>
            <input className="border rounded py-2 px-3 text-gray-700 border-gray-300 focus:outline-none" type="number" value={length} onChange={(event) => setLength(event.target.value)}/>
          </div>

          {/* RADIOS */}
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input type="radio" value="say" checked={radio === "say"} onChange={handleRadio}/> 
              <span className="ml-2">Easy to say</span> 
            </label>
            <label className="inline-flex items-center ml-6">
              <input type="radio" value="read" checked={radio === "read"} onChange={handleRadio}/>
              <span className="ml-2">Easy to read</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input type="radio" value="all" checked={radio === "all"} onChange={handleRadio}/>
              <span className="ml-2">All characters</span>
            </label>
          </div>

          {/* CHECKBOXES */}
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input type="checkbox" name="Uppercase" checked={uppercase} onChange={(event) => setUppercase(event.target.checked)} /> 
              <span className="ml-2">Uppercase</span> 
            </label>
            <label className="inline-flex items-center ml-6">
              <input type="checkbox" name="Lowercase" checked={lowercase} onChange={(event) => setLowercase(event.target.checked)} /> 
              <span className="ml-2">Lowercase</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input type="checkbox" name="Numbers" checked={numbers} onChange={(event) => setNumbers(event.target.checked)} disabled={radio === 'say'}/> 
              <span className="ml-2">Numbers</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input type="checkbox" name="Symbols" checked={symbols} onChange={(event) => setSymbols(event.target.checked)} disabled={radio === 'say'}/> 
              <span className="ml-2">Symbols</span>
            </label>
          </div>
      </form>
    </div>
  </div>
  );
}

export default App;
