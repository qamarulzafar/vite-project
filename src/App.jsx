import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  let [length, setlength] = useState(8);
  let [numberAllowed, setNumberAllowed] = useState(false);
  let [charAlloed, setcharAlloed] = useState(false);
  let [password, setpassword] = useState("");

  const passordRef = useRef(null);

  let passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAlloed) str += "!@#$%^&*(){}:>?<|[]_";

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setpassword(pass);
  }, [length, numberAllowed, charAlloed, setpassword]);

  const copyPasswordToClipborad = useCallback(() => {
    passordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAlloed, passwordGenerator]);

  return (
    <>
      <div className="bg-gray-900 w-screen h-screen flex justify-center items-center">
        <div className="w-full mx-10 lg:mx-0 lg:w-1/2 p-4 bg-gray-600 ">
          <div className="text-white text-center font-bold text-2xl mb-4">
            {" "}
            Pasword Generator
          </div>
          <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row ">
            <input
              type="text"
              value={password}
              placeholder="Password"
              className="p-2 w-full focus:outline-none text-orange-400 rounded-2xl sm:rounded-none"
              readOnly
              ref={passordRef}
            />
            <button
              onClick={copyPasswordToClipborad}
              className="bg-sky-400 p-3 hover:bg-sky-500 rounded-2xl sm:rounded-none"
            >
              Copy
            </button>
          </div>
          <div className="flex justify-between items-center flex-col md:flex-row ">
            <div className="my-3 flex items-center">
              <input
                type="range"
                min={8}
                max={50}
                value={length}
                id="range"
                className="cursor"
                onChange={(e) => {
                  setlength(e.target.value);
                }}
              />
              <label htmlFor="range" className="mx-3 text-orange-400">
                length {length}
              </label>
            </div>
            <div className="flex">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked={numberAllowed}
                  id="numberInput"
                  onChange={() => {
                    setNumberAllowed((prev) => !prev);
                  }}
                />
                <label htmlFor="numberInput" className="mx-3 text-orange-400">
                  Numbers
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked={charAlloed}
                  id="charInput"
                  onChange={() => {
                    setcharAlloed((prev) => !prev);
                  }}
                />
                <label htmlFor="charInput" className="mx-3 text-orange-400">
                  Characters
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
