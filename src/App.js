
function App() {
  return (
    <section className="App h-screen w-full flex justify-center items-center bg-green-500">
    <div className="w-full max-w-md bg-gray-800" >
      <form action="" className=" bg-white shadow-md rounded px-8 py-8 pt-8">
        <div className="px-4 pb-4">
          <label htmlFor="email" className="text-sm block font-bold  pb-2">EMAIL ADDRESS</label>
          <input type="email" name="email" id="" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 " placeholder="Johnbull@example.com" />
        </div>
        <div className="px-4 pb-4">
          <label htmlFor="password" className="text-sm block font-bold pb-2">PASSWORD</label>
          <input type="password" name="email" id="" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300" placeholder="Enter your password" />
        </div>
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Sign In</button>
        </div>
        <input type="text" placeholder="Password" />
        <p>Customise your password</p>
        <hr />
        <input type="range" min="8" max="50" />
        <label for="huey">Password length</label>

        <input type="radio" />
          <label for="huey">Easy to say</label>
        <input type="radio" />
          <label for="huey">Easy to read</label>
          <input type="radio" />
          <label for="huey">All characters</label>
        <input type="checkbox" name="Numbers" id="" /> 
          <label for="Numbers">Numbers</label>
            <input type="checkbox" id="volume" name="volume"
         min="0" max="11"/>
            <label for="volume">Volume</label>
      </form>
    </div>
  </section>
  );
}

export default App;
