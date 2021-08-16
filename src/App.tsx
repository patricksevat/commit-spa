import React from 'react'
import logo from './logo.svg'
import './App.scss'
import { StateProvider } from './hooks/StateContext';

function App() {
  return (
    <StateProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
        </header>
      </div>
    </StateProvider>

  )
}

export default App
