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
  // const [score, setScore] = useState(null);
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
    console.log(result)
    setFeedback(result)
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
      <div className="w-full max-w-2xl bg-gray-800" >
        <div className=" bg-white shadow-md rounded px-8 py-8 pt-8">
          
            <div className="relative">
              <input type="text"  value={password} onChange={(event) => setPassword(event.target.value)} className="absolute tracking-wider border rounded w-full py-5 px-5 text-gray-700 border-gray-300 focus:outline-none" />
                <button onClick={handleClick} className="absolute top-3 right-3 p-2" type="button">
                  <RefreshIcon className="h-7 w-7 text-blue-500 hover:text-green-500"/>
                </button> 
            </div>
            
          {/* STRENGTH METER */}
          <div className="grid grid-cols-4 gap-1 px-4 py-1 mt-16">
            {feedback.score === 0 && <div className={`rounded border-b-8 border-white`}></div>}
            {feedback.score > 0 && <div className={`rounded border-b-8 border-${color}-300`}></div>}
            {feedback.score > 1 && <div className={`rounded border-b-8 border-${color}-300`}></div>}
            {feedback.score > 2 && <div className={`rounded border-b-8 border-${color}-300`}></div>}
            {feedback.score > 3 && <div className={`rounded border-b-8 border-${color}-300`}></div>}
          </div>
          {/* WARNING MESSAGE */}
          {feedback?.feedback?.warning && <p className="font-light text-xs text-red-600 px-4">{feedback.feedback.warning} </p>}
          {/* LENGTH */}
          <div className="px-4 pb-4">
            <h6 className="text-md font-semibold text-gray-900 tracking-tight">Password Length</h6>
            <input className="w-16 border rounded py-2 px-3 text-gray-700 border-gray-300 focus:outline-none" type="number" value={length} onChange={(event) => setLength(event.target.value)}/>
            <input className="ml-2 w-1/2" type="range" name="length" min="1" max="50" step="1" value={length} onChange={(event) => setLength(event.target.value)}/>
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
          <hr className="my-4" />
          {/* ZXCVBN RESULTS */}
          {feedback && <div>
            <h3 className="text-md font-semibold text-gray-900 tracking-tight">Guess Times</h3>

            <table className="table-auto">
              {/* <thead>
                <tr>
                  <th className="z-20 sticky top-0 text-sm font-semibold text-gray-600 bg-white p-0">Title</th>
                  <th className="z-20 sticky top-0 text-sm font-semibold text-gray-600 bg-white p-0">Author</th>
                  <th className="z-20 sticky top-0 text-sm font-semibold text-gray-600 bg-white p-0">Views</th>
                </tr>
              </thead> */}
              <tbody className="">
                <tr>
                  <td className="py-2 pl-2 text-xs text-light-blue-600 whitespace-pre border border-gray-200  px-2">100 / hour:</td>
                  <td className="py-2 pl-2 text-xs text-light-blue-600 whitespace-pre border border-gray-200 px-2">{feedback.crack_times_display.online_throttling_100_per_hour}</td>
                  <td className="py-2 pl-2 text-xs text-light-blue-600 whitespace-pre border border-gray-200 px-2">(throttled online attack)</td>
                </tr>
                <tr className="">
                  <td className="py-2 pl-2 text-xs text-light-blue-600 whitespace-pre border border-gray-200 px-2">10 / second:</td>
                  <td className="py-2 pl-2 text-xs text-light-blue-600 whitespace-pre border border-gray-200 px-2">{feedback.crack_times_display.online_no_throttling_10_per_second}</td>
                  <td className="py-2 pl-2 text-xs text-light-blue-600 whitespace-pre border border-gray-200 px-2">(unthrottled online attack)</td>
                </tr>
                <tr>
                  <td className="py-2 pl-2 text-xs text-light-blue-600 whitespace-pre border border-gray-200 px-2">10k / second:</td>
                  <td className="py-2 pl-2 text-xs text-light-blue-600 whitespace-pre border border-gray-200 px-2">{feedback.crack_times_display.offline_slow_hashing_1e4_per_second}</td>
                  <td className="py-2 pl-2 text-xs text-light-blue-600 whitespace-pre border border-gray-200 px-2">(offline attack, slow hash, many cores)</td>
                </tr>
                <tr>
                  <td className="py-2 pl-2 text-xs text-light-blue-600 whitespace-pre border border-gray-200 px-2">10B / hour:</td>
                  <td className="py-2 pl-2 text-xs text-light-blue-600 whitespace-pre border border-gray-200 px-2">{feedback.crack_times_display.offline_fast_hashing_1e10_per_second}</td>
                  <td className="py-2 pl-2 text-xs text-light-blue-600 whitespace-pre border border-gray-200 px-2">(offline attack, fast hash, many cores)</td>
                </tr>
              </tbody>
            </table>

            {/* ZXCVBN SEQUENCES */}
            {/* {feedback.feedback.suggestions && <h5 className="text-lg font-semibold text-gray-900 tracking-tight">suggestions: <span className="text-sm">{feedback.feedback.suggestions.map(suggestion => suggestion)}</span></h5>} */}
            <h3 className="text-md font-semibold text-gray-900 tracking-tight mt-4">Sequences </h3>
            
              <div className="flex flex-row space-x-4 ">
              {feedback.sequence.map((item, index) => (
                <div className="bg-gray-100 p-1.5 border-gray-200 border" key={index}>
                  <h5 className="bg-gray-500 text-white font-light text-center">{item.token}</h5>
                  <p className="text-sm font-extralight">pattern: <span className="font-light">{item.pattern}</span></p>
                  {item.reversed && <p className="text-sm font-extralight">reversed: <span className="font-light">{item.reversed ? 'true' : 'false'}</span></p>}
                  {item.dictionary_name && <p className="text-sm font-extralight">dictionary_name: <span className="font-light">{item.dictionary_name}</span></p>}
                  {item.matched_word && <p className="text-sm font-extralight">matched_word: <span className="font-light">{item.matched_word}</span></p>}
                  {item.l33t && <p className="text-sm font-extralight">l33t: <span className="font-light">{item.l33t ? 'true' : 'false'}</span></p>}
                  {item.l33t_variations && <p className="text-sm font-extralight">l33t_variations: <span className="font-light">{item.l33t_variations}</span></p>}
                  {item.uppercase_variations && <p className="text-sm font-extralight">uppercase_variations: <span className="font-light">{item.uppercase_variations}</span></p>}
                  {item.sub_display && <p className="text-sm font-extralight">sub_display: <span className="font-light">{item.sub_display}</span></p>}
                  {item.day && <p className="text-sm font-extralight">day: <span className="font-light">{item.day}</span></p>}
                  {item.month && <p className="text-sm font-extralight">month: <span className="font-light">{item.month}</span></p>}
                  {item.year && <p className="text-sm font-extralight">year: <span className="font-light">{item.year}</span></p>}
                  {item.seperator && <p className="text-sm font-extralight">seperator: <span className="font-light">{item.seperator}</span></p>}
                  {/* {Object.keys(item).map((key, index) => (
                   <p key={index}>
                     <span className="text-sm font-extralight">{key}: <span className="font-light">{item[key]}</span></span>
                   </p>
                  )
                  )} */}
                </div>
              )
              )}
              </div>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default App;
