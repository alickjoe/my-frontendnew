import React, { useState } from 'react';
import axios from 'axios';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './App.css'; // 假设您有一个CSS文件来进行样式设计

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://kafka.alickzhou.com:8080/chat', { message: input }, { headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      }});
      setResult(response.data.response);
    } catch (error) {
      console.error('API call failed:', error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="input-form">
        <label>
          输入内容:
          <textarea value={input} onChange={(e) => setInput(e.target.value)} className="input-field"></textarea>
        </label>
        <button type="submit" className="submit-button">提交</button>
      </form>
      <div className="result">
        结果:
        <SyntaxHighlighter language="javascript" style={docco}>
          {result}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default App;
