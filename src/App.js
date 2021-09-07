import { useState, useEffect } from 'react';
const generator = require('generate-password');

function App() {
  const [password, setPassword] = useState('');
  const [rangeval, setRangeval] = useState(10);

  const handleClick = () => {
    let result = generator.generate({
      length: rangeval,
    })
    setPassword(result) 
  }

  const generatePassword = (length=10) => {
    setRangeval(length)
    let result = generator.generate({
      length: length,
    })
    setPassword(result) 
  } 
  // On first render
  useEffect(()=>{
    generatePassword()
  },[])

  return (
    <div className="App h-screen w-full flex justify-center items-center bg-gray-500">
    <div className="w-full max-w-md bg-gray-800" >
      <form action="" className=" bg-white shadow-md rounded px-8 py-8 pt-8">
        <div className="px-4 pb-4">
          <label htmlFor="email" className="text-sm block font-bold  pb-2">Your Password</label>
          <input type="email" name="email" id="" value={password} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 " disabled />
        </div>
       
        <div>
          <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Generate</button>
        </div>
        <h5 className="text-sm block font-bold pb-2">Customise your password</h5>
        <div className="px-4 pb-4">
          <input type="range" name="length" min="6" max="50" step="1" defaultValue="10" onChange={(event) => generatePassword(event.target.value)}/>
          <label htmlFor="length">Password length: {rangeval}</label>
        </div>
        <div>
        <input type="radio" name="say" />
          <label htmlFor="say">Easy to say</label>
        <input type="radio" name="read" />
          <label htmlFor="read">Easy to read</label>
          <input type="radio" name="all" />
          <label htmlFor="all">All characters</label>
        </div>
        <input type="checkbox" name="Numbers" id="" /> 
          <label htmlFor="Numbers">Numbers</label>
      </form>
    </div>
  </div>
  );
}

export default App;
