//React imports
import { useDebounce } from "react-use";
import { useState, useEffect } from "react";
import { RefreshIcon, ClipboardCopyIcon } from "@heroicons/react/outline";
// External packages
import zxcvbn from "zxcvbn";
import { SHA1 } from "crypto-es/lib/sha1";
import generator from "generate-password-browser";
// Niceware imported in index.html to use browser version
// import niceware from "niceware";
// Components
import IpData from "./components/IpData";
import Dividers from "./components/Dividers";
import Sequences from "./components/Sequences";
import GuessTimes from "./components/GuessTimes";
import StrengthMeter from "./components/StrengthMeter";

function App() {
  // App
  const [color, setColor] = useState("gray");
  const [password, setPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  // Customise password
  const [length, setLength] = useState(14);
  const [numbers, setNumbers] = useState(true);
  const [radio, setRadioval] = useState("read");
  const [symbols, setSymbols] = useState(false);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [excludeSimilarCharacters, setExcludeSimilarCharacters] =
    useState(false);
  // Word Password - Niceware
  const [passphrase, setPassphrase] = useState(false);
  const [join, setJoin] = useState("-");
  // API Data
  const [isPwned, setIsPwned] = useState(0);
  const [ipData, setIpData] = useState(null);
  const [feedback, setFeedback] = useState("");

  const generatePassword = (value) => {
    if (value === "passphrase") {
      setPassword(window.niceware.generatePassphrase(6).join(join));
    } else if (value === "random") {
      const config = {
        length: 14,
        numbers,
        symbols,
        lowercase,
        uppercase,
        excludeSimilarCharacters,
      };
      setPassword(generator.generate(config));
    } else if (passphrase) {
      setPassword(
        window.niceware
          .generatePassphrase(value ? value * 2 : length * 2)
          .join(join)
      );
    } else {
      const config = {
        length: value ? value : length,
        numbers,
        symbols,
        lowercase,
        uppercase,
        excludeSimilarCharacters,
      };
      setPassword(generator.generate(config));
    }
  };

  // Handle input changes
  const handleInput = (text) => {
    setPassword(text);
    setLength(text.length);
  };

  const handleClick = () => {
    generatePassword();
  };

  const handlePassphrase = (value) => {
    if (value) {
      setLength(3);
      generatePassword("passphrase");
    } else {
      setLength(14);
      generatePassword("random");
    }
    setPassphrase(value);
  };

  const handleLength = (value) => {
    setLength(value);
    generatePassword(value);
  };

  const handleRadio = (event) => {
    const value = event.target.value;
    setRadioval(value);
    if (value === "read") {
      setExcludeSimilarCharacters(true);
      setSymbols(false);
    } else if (value === "all") {
      setUppercase(true);
      setLowercase(true);
      setExcludeSimilarCharacters(false);
      setSymbols(true);
      setNumbers(true);
    } else if (value === "say") {
      setExcludeSimilarCharacters(false);
      setSymbols(false);
      setNumbers(false);
      setUppercase(true);
      setLowercase(true);
    }
  };

  const handleJoin = (value) => {
    let regex;
    if (join === ".") {
      regex = new RegExp(/\./, "g");
    } else {
      regex = new RegExp(join, "g");
    }
    if (value === join) {
      return;
    }
    setPassword(password.replace(regex, value));
    setJoin(value);
  };

  const handleCopyBtn = () => {
    navigator.clipboard.writeText(password);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  // API Calls
  const pwnedPwCheck = async (password) => {
    const hash = SHA1(password).toString().toUpperCase();
    const prefix = hash.substring(0, 5);
    const suffix = hash.substring(5);
    // console.log({hash, prefix, suffix})
    try {
      const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
      const results = await res.text();
      const split_array = results.split(/\r?\n/);
      const split_object = split_array.map((str) => {
        const temp = str.split(":");
        return { suffix: temp[0], count: Number(temp[1]) };
      });
      const match = split_object.find((el) => el.suffix === suffix);
      setIsPwned(match?.count ? match.count : 0);
    } catch (error) {
      console.log(error);
      setIsPwned(0);
    }
  };
  // Use effects
  // On first render
  useEffect(() => {
    // Generate a password
    generatePassword();
    // Console log a nice message
    let msg =
      "%c Hi 👋! If you're hiring 👨‍💻, I'm looking for a job 🚀 | 🤙 https://tini.to/matt/";
    let styles = [
      "font-size: 12px",
      "font-family: monospace",
      "background: white",
      "display: inline-block",
      "color: black",
      "padding: 8px 19px",
      "border: 1px dashed;",
    ].join(";");
    console.log(msg, styles);
    // Fetch ip and weather data from cloudflare worker
    fetch("https://passwrd.uv.workers.dev")
      .then((res) => res.json())
      .then(
        (result) => {
          result.platform = result.platform.replace(/"/g, "");
          // console.log(result)
          setIpData(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  // Generate a new password if customisation changes
  useEffect(() => {
    generatePassword();
  }, [uppercase, lowercase, symbols, numbers, radio]);

  // Generate a new word password if toggled
  // useEffect(()=>{
  //   setLength(3)
  //   // setPassword(niceware.generatePassphrase(length))
  //   console.log(niceware.generatePassphrase(length*2))
  //   setPassword(niceware.generatePassphrase(length*2).join('-'))
  // },[passphrase])

  // Check password strength
  useEffect(() => {
    const result = zxcvbn(password);
    setIsPwned(0);
    setFeedback(result);
    setIsCopied(false);
  }, [password]);

  // HaveIBeenPwned Lookup- Custom UseEffect
  const [, cancel] = useDebounce(
    () => {
      pwnedPwCheck(password);
    },
    500,
    [password]
  );
  // App color change if password strength changes
  useEffect(() => {
    let color = "";
    if (isPwned > 0) {
      color = "red";
    } else {
      switch (feedback.score) {
        case 0:
          color = "gray";
          break;
        case 1:
          color = "gray";
          break;
        case 2:
          color = "red";
          break;
        case 3:
          color = "yellow";
          break;
        case 4:
          color = "green";
          break;
      }
    }
    setColor(color);
  }, [feedback.score, isPwned]);

  // HTML
  return (
    <div
      className={`App w-full flex justify-center items-center	bg-gradient-to-r from-gray-300 via-${color}-400 to-gray-300`}
    >
      <div className="w-full max-w-2xl">
        <div className="bg-white sm:rounded-3xl sm:shadow-lg px-1 sm:px-4 md:px-8 sm:py-8">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-gray-900 text-center mb-1">
            Generate a secure password
            <span className={`text-6xl text-${color}-400`}>.</span>
          </h1>
          <h2 className="sm:text-lg text-gray-500 font-medium tracking-tight text-center mb-4">
            Or enter a{" "}
            <span
              className={`text-gray-900 cursor-pointer hover:text-${color}-400 transition duration-200 ease-in-out`}
              onClick={(event) => {
                handleInput("p@$$w0rd");
              }}
            >
              p@$$w0rd
            </span>{" "}
            to check its{" "}
            <span
              className={`text-gray-900 cursor-pointer hover:text-${color}-400 transition duration-200 ease-in-out`}
              onClick={(event) => {
                handleInput("strength");
              }}
            >
              strength
            </span>
            <span className={`text-${color}-400 text-3xl`}>.</span>
          </h2>
          <div className="relative mb-20">
            <input
              type="text"
              value={password}
              onChange={(event) => handleInput(event.target.value)}
              className="absolute tracking-wider border rounded w-full py-4 px-2 sm:px-5 text-gray-700 border-gray-300 focus:outline-none font-mono sm:text-xl"
            />
            <button
              onClick={handleCopyBtn}
              className="bg-white absolute top-2 right-11 p-2"
              type="button"
            >
              <ClipboardCopyIcon
                className={`h-7 w-7 text-blue-500 hover:text-${color}-400 transition duration-200 ease-in-out`}
              />
              {/* COPY TOOLTIP */}
              {isCopied && (
                <span
                  className={`absolute top-6 right-16 inline-flex items-center justify-center px-2 py-1 text-xs font-thin leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-${color}-400 rounded-full`}
                >
                  copied
                </span>
              )}
            </button>
            <button
              onClick={handleClick}
              className="bg-white absolute top-2 right-2 p-2"
              type="button"
            >
              <RefreshIcon
                className={`h-7 w-7 text-blue-500 hover:text-${color}-400 transition duration-200 ease-in-out`}
              />
            </button>
            {/* WARNING MESSAGE */}
            {feedback?.feedback?.warning && isPwned > 0 && (
              <p className="absolute top-11 left-1.5 font-light text-xs text-red-600 px-4">
                <span className="hidden sm:inline">
                  {feedback.feedback.warning}.
                </span>{" "}
                <span className="font-semibold">
                  {isPwned.toLocaleString()} data{" "}
                  {isPwned > 1 ? "breaches" : "breach"}.
                </span>{" "}
              </p>
            )}
            {feedback?.feedback?.warning && isPwned === 0 && (
              <p className="absolute top-11 left-1.5 font-light text-xs text-red-600 px-4">
                {feedback.feedback.warning}
              </p>
            )}
            {!feedback?.feedback?.warning && isPwned > 0 && (
              <p className="absolute top-11 left-1.5 font-light text-xs text-red-600 px-4">
                {isPwned.toLocaleString()} data{" "}
                {isPwned > 1 ? "breaches" : "breach"}.
              </p>
            )}
          </div>
          {/* STRENGTH METER */}
          <StrengthMeter score={feedback.score} color={color} />
          {/* <!-- Toggle A --> */}
          <div className="flex items-center justify-center w-full mt-4">
            <label
              htmlFor="toogleA"
              className="flex items-center cursor-pointer"
            >
              {/* <!-- label --> */}
              <div
                className={
                  passphrase
                    ? `text-gray-500 mr-3 font-medium text-sm`
                    : `text-gray-900 mr-3 font-medium text-sm`
                }
              >
                Tr0ub4dor&3
              </div>
              {/* <!-- toggle --> */}
              <div className="relative">
                {/* <!-- input --> */}
                <input
                  id="toogleA"
                  type="checkbox"
                  className="sr-only"
                  checked={passphrase}
                  onChange={(event) => handlePassphrase(event.target.checked)}
                />
                {/* <!-- line --> */}
                <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                {/* <!-- dot --> */}
                <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
              </div>
              {/* <!-- label --> */}
              <div
                className={
                  !passphrase
                    ? `text-gray-500 ml-3 font-medium text-sm`
                    : `text-gray-900 ml-3 font-medium text-sm`
                }
              >
                correct-horse-battery-staple
              </div>
            </label>
          </div>
          {/* CUSTOMISE PASSWORD COLUMNS */}
          <div className="flex flex-wrap mt-4">
            {/* LENGTH */}
            <div className="flex-2 flex-grow items-center p-4">
              <h6 className="text-md mb-1 font-semibold text-gray-900 tracking-tight">
                Password Length
              </h6>
              <input
                className="w-12 border rounded py-2 px-3 text-gray-700 border-gray-300 focus:outline-none"
                type="number"
                value={length}
                onChange={(event) => handleLength(event.target.value)}
              />
              <input
                className="ml-3 w-3/4"
                type="range"
                name="length"
                min="1"
                max="30"
                value={length}
                onChange={(event) => handleLength(event.target.value)}
              />
            </div>
            {/* RADIOS */}
            {/* JOIN */}
            {passphrase && (
              <div className="flex flex-col flex-1 p-4 min-w-max">
                <label
                  className="font-semibold text-gray-900 tracking-tight"
                  htmlFor="join"
                >
                  Join with
                </label>
                <select
                  name="join"
                  onChange={(event) => handleJoin(event.target.value)}
                  value={join}
                >
                  <option value="-">-</option>
                  <option value=".">.</option>
                  <option value=",">,</option>
                  <option value=";">;</option>
                </select>
              </div>
            )}
            {!passphrase && (
              <div className="flex flex-col flex-1 p-4 min-w-max">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="say"
                    checked={radio === "say"}
                    onChange={handleRadio}
                    disabled={passphrase}
                  />
                  <span className="ml-2 text-gray-800">Easy to say</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="read"
                    checked={radio === "read"}
                    onChange={handleRadio}
                    disabled={passphrase}
                  />
                  <span className="ml-2 text-gray-800">Easy to read</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="all"
                    checked={radio === "all"}
                    onChange={handleRadio}
                    disabled={passphrase}
                  />
                  <span className="ml-2 text-gray-800">All characters</span>
                </label>
              </div>
            )}
            {/* CHECKBOXES */}
            {!passphrase && (
              <div className="flex flex-col flex-1 p-4 min-w-max">
                <label className="">
                  <input
                    type="checkbox"
                    name="Uppercase"
                    checked={uppercase}
                    onChange={(event) => setUppercase(event.target.checked)}
                    disabled={passphrase}
                  />
                  <span className="ml-2 text-gray-800">Uppercase</span>
                </label>
                <label className="">
                  <input
                    type="checkbox"
                    name="Lowercase"
                    checked={lowercase}
                    onChange={(event) => setLowercase(event.target.checked)}
                    disabled={passphrase}
                  />
                  <span className="ml-2 text-gray-800">Lowercase</span>
                </label>
                <label className="">
                  <input
                    type="checkbox"
                    name="Numbers"
                    checked={numbers}
                    onChange={(event) => setNumbers(event.target.checked)}
                    disabled={radio === "say" || passphrase}
                  />
                  <span className="ml-2 text-gray-800">Numbers</span>
                </label>
                <label className="">
                  <input
                    type="checkbox"
                    name="Symbols"
                    checked={symbols}
                    onChange={(event) => setSymbols(event.target.checked)}
                    disabled={radio === "say" || passphrase}
                  />
                  <span className="ml-2 text-gray-800">Symbols</span>
                </label>
              </div>
            )}
          </div>

          {/* DIVIDERS */}
          <Dividers color={color} />
          {/* ZXCVBN RESULTS */}
          {feedback && (
            <div>
              {/* GUESS TIMES */}
              <h3 className="text-md font-semibold text-gray-900 tracking-tight">
                Guess Times
              </h3>
              <GuessTimes feedback={feedback} />
              {/* SEQUENCES */}
              <h3 className="text-md font-semibold text-gray-900 tracking-tight mt-4">
                Sequences
              </h3>
              <Sequences feedback={feedback} />
            </div>
          )}
        </div>
        {ipData && <IpData ipData={ipData} />}
      </div>
    </div>
  );
}

export default App;
