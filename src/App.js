import { useState, useEffect } from 'react';
const generator = require('generate-password');

function App() {
  const [password, setPassword] = useState('');
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [length, setLength] = useState(12);
  const [excludeSimilarCharacters, setExcludeSimilarCharacters] = useState(false);
  const [radio, setRadioval] = useState('all');

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
    // console.log(config)
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

  return (
    <div className="App h-screen w-full flex justify-center items-center bg-gray-500">
      <div className="w-full max-w-lg bg-gray-800" >
        <form action="" className=" bg-white shadow-md rounded px-8 py-8 pt-8">
          <div className="px-4 pb-4">
            <label htmlFor="email" className="text-sm block font-bold  pb-2">Your Password</label>
            <input type="email" name="email" id="" value={password} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 " disabled />
          </div>
        
          <div>
            <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Generate</button>
          </div>
          <h5 className="text-sm block font-bold pb-2">Customise your password</h5>

          {/* LENGTH */}
          <div className="px-4 pb-4">
            <input type="range" name="length" min="1" max="50" step="1" value={length} onChange={(event) => setLength(event.target.value)}/>
            <input type="number" value={length} onChange={(event) => setLength(event.target.value)}/>
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
              <input type="checkbox" name="Numbers" checked={numbers} onChange={(event) => setNumbers(event.target.checked)} /> 
              <span className="ml-2">Numbers</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input type="checkbox" name="Numbers" checked={numbers} onChange={(event) => setNumbers(event.target.checked)} /> 
              <span className="ml-2">Symbols</span>
            </label>
          </div>
      </form>
    </div>
  </div>
  );
}

export default App;
