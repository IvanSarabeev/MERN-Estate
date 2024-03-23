import React from "react";
import viteLogo from '/vite.svg';
import reactLogo  from "./assets/react.svg";

function App() {

  return (
    <>
      <div className='flex items-center justify-evenly'>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    </>
  )
}

export default App
