import './App.css';

import React from 'react';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p># sprint HomeLayout: 사원 리스트</p>
        <p>-> 사원 리스트 화면</p>
        <p>-> 출근 버튼</p>
        <p>-> 퇴근 버튼</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
