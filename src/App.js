import { useState, useEffect } from 'react';
import zxcvbn from 'zxcvbn';
import generator from 'generate-password';
import { RefreshIcon, ClipboardCopyIcon } from '@heroicons/react/outline'
import StrengthMeter from './StrengthMeter';
import Sequences from './Sequences';
import GuessTimes from './GuessTimes';
import Dividers from './Dividers';

function App() {
  const [password, setPassword] = useState('');
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [length, setLength] = useState(14);
  const [excludeSimilarCharacters, setExcludeSimilarCharacters] = useState(false);
  const [radio, setRadioval] = useState('read');

  const [feedback, setFeedback] = useState('');
  const [color, setColor] = useState('gray');

  const [isCopied, setIsCopied] = useState(false);

  const generatePassword = () => {
    const config = {
      length,
      numbers,
      symbols,
      lowercase,
      uppercase,
      excludeSimilarCharacters
    }
    try {
      const result = generator.generate(config)
      setPassword(result) 
    } catch (error) {
      console.log(error)
    }
  }

  const handleInput = (text) => {
    setPassword(text)
    setLength(text.length)
  }

  const handleClick = () => {
    generatePassword()
  }

  const handleLength = (value) => {
    setLength(value)
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
  const handleCopyBtn = () => {
    navigator.clipboard.writeText(password)
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    },3000)
  }

  // On first render
  useEffect(()=>{
    generatePassword()
    let msg = "%c Hi 👋! If you're hiring 👨‍💻, I'm looking for a job 🚀! 🤙 https://tini.to/matt/" ; 
    let styles= [ 
        'font-size: 12px', 
        'font-family: monospace', 
        'background: white', 
        'display: inline-block', 
        'color: black', 
        'padding: 8px 19px', 
        'border: 1px dashed;' 
    ].join(';') 
    console.log(msg, styles);
  },[])
   
   useEffect(()=>{
    generatePassword()
  },[uppercase,lowercase,symbols,numbers,radio])

  useEffect(()=>{
    const result = zxcvbn(password)
    // console.log(result)
    // setLength(password.length)
    setFeedback(result)
    setIsCopied(false)
  },[password])

  useEffect(()=>{
    let color = ''
    switch (feedback.score) {
      case 0:
        color = 'gray'
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
    <div className={`App sm:h-screen w-full flex justify-center items-center bg-gradient-to-r from-gray-300 via-${color}-400 to-gray-300`}>
      <div className="w-full max-w-2xl" >
        <div className=" bg-white sm:rounded-3xl sm:shadow-lg px-1 sm:px-4 md:px-8 sm:py-8">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-gray-900 text-center mb-1">Generate a secure password<span className={`text-6xl text-${color}-400`}>.</span></h1>
            <h2 className="sm:text-lg text-gray-500 font-medium tracking-tight text-center mb-4">Or enter a <span className={`text-gray-900 cursor-pointer hover:text-${color}-400`} onClick={(event) => {handleInput('p@$$w0rd')}}>p@$$w0rd</span> to check its <span className={`text-gray-900 cursor-pointer hover:text-${color}-400`} onClick={(event) => {handleInput('strength')}}>strength</span><span className={`text-${color}-400 text-3xl`}>.</span></h2>
            <div className="relative mb-20">
              <input type="text"  value={password} onChange={(event) => handleInput(event.target.value)} className="absolute tracking-wider border rounded w-full py-4 px-2 sm:px-5 text-gray-700 border-gray-300 focus:outline-none font-mono text-xl" />
                <button onClick={handleCopyBtn} className="bg-white absolute top-2 right-11 p-2" type="button">
                  <ClipboardCopyIcon className={`h-7 w-7 text-blue-500 hover:text-${color}-400`}/>
                  {/* COPY TOOLTIP */}
                  {isCopied && <span className={`absolute top-6 right-16 inline-flex items-center justify-center px-2 py-1 text-xs font-thin leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-${color}-400 rounded-full`}>copied</span>}
                </button> 
                <button onClick={handleClick} className="bg-white absolute top-2 right-2 p-2" type="button">
                  <RefreshIcon className={`h-7 w-7 text-blue-500 hover:text-${color}-400`}/>
                </button>
                  {/* WARNING MESSAGE */}
                  {feedback?.feedback?.warning && <p className="absolute top-11 left-1.5 font-light text-xs text-red-600 px-4">{feedback.feedback.warning} </p>} 
            </div>
            
          {/* STRENGTH METER */}
          <StrengthMeter score={feedback.score} color={color}/>
          {/* CUSTOMISE PASSWORD COLUMNS */}
          <div className="flex flex-wrap mt-4">
            {/* LENGTH */}
            <div className="flex-2 flex-grow items-center p-4">
              <h6 className="text-md mb-1 font-semibold text-gray-900 tracking-tight">Password Length</h6>
              <input className="w-12 border rounded py-2 px-3 text-gray-700 border-gray-300 focus:outline-none" type="number" value={length} onChange={(event) => handleLength(event.target.value)}/>
              <input className="ml-3 w-3/4" type="range" name="length" min="1" max="30" value={length} onChange={(event) => handleLength(event.target.value)}/>
            </div>
            {/* RADIOS */}
            <div className="flex flex-col flex-1 p-4 min-w-max">
              <label className="inline-flex items-center">
                <input type="radio" value="say" checked={radio === "say"} onChange={handleRadio}/> 
                <span className="ml-2 text-gray-800">Easy to say</span> 
              </label>
              <label className="inline-flex items-center">
                <input type="radio" value="read" checked={radio === "read"} onChange={handleRadio}/>
                <span className="ml-2 text-gray-800">Easy to read</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" value="all" checked={radio === "all"} onChange={handleRadio}/>
                <span className="ml-2 text-gray-800">All characters</span>
              </label>
            </div>
            {/* CHECKBOXES */}
            <div className="flex flex-col flex-1 p-4 min-w-max">
              <label className="">
                <input type="checkbox" name="Uppercase" checked={uppercase} onChange={(event) => setUppercase(event.target.checked)} /> 
                <span className="ml-2 text-gray-800">Uppercase</span> 
              </label>
              <label className="">
                <input type="checkbox" name="Lowercase" checked={lowercase} onChange={(event) => setLowercase(event.target.checked)} /> 
                <span className="ml-2 text-gray-800">Lowercase</span>
              </label>
              <label className="">
                <input type="checkbox" name="Numbers" checked={numbers} onChange={(event) => setNumbers(event.target.checked)} disabled={radio === 'say'}/> 
                <span className="ml-2 text-gray-800">Numbers</span>
              </label>
              <label className="">
                <input type="checkbox" name="Symbols" checked={symbols} onChange={(event) => setSymbols(event.target.checked)} disabled={radio === 'say'}/> 
                <span className="ml-2 text-gray-800">Symbols</span>
              </label>
            </div>

          </div>

          {/* DIVIDERS */}
          <Dividers color={color} />

          {/* ZXCVBN RESULTS */}
          {feedback && <div>
            {/* GUESS TIMES */}
            <h3 className="text-md font-semibold text-gray-900 tracking-tight">Guess Times</h3>
              <GuessTimes feedback={feedback} />
            {/* SEQUENCES */}
            <h3 className="text-md font-semibold text-gray-900 tracking-tight mt-4">Sequences</h3>
              <Sequences feedback={feedback}/>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default App;
