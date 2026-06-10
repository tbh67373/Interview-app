import React from 'react';
import logo from './logo.svg';
import './App.css';
import './pages/CandidateRegister/style.less'
import Router from './router';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

function App() {
  return (
    <div className="App">
        <ConfigProvider
            locale={zhCN}
        >
            <Router/>
        </ConfigProvider>
    </div>
  );
}

export default App;
