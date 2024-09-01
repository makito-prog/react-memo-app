import React, { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";
import "./App.css";

function App() {
  const [content, setContent] = useState("");
  const editorRef = useRef(null);

  useEffect(() => {
    const savedContent = localStorage.getItem("content");
    if (savedContent) {
      setContent(savedContent);
      if (editorRef.current) {
        editorRef.current.innerHTML = savedContent;
      }
    }
  }, []);

  const handleInput = debounce((e) => {
    const newContent = e.target.innerHTML;
    setContent(newContent);
    localStorage.setItem("content", newContent);
  }, 300);  // 300msの遅延で実行

  const applyCommand = (command) => {
    document.execCommand(command, false, null);
  };

  return (
    <div className="App">
      <h1>Word-like Editor</h1>
      <div className="toolbar">
        <button onClick={() => applyCommand("bold")}>Bold</button>
        <button onClick={() => applyCommand("italic")}>Italic</button>
        <button onClick={() => applyCommand("underline")}>Underline</button>
        <button onClick={() => applyCommand("strikethrough")}>Strikethrough</button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        className="editor"
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}

export default App;
