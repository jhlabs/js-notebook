import { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  return (
    <div>
      <textarea
        name="code"
        id="code"
        onChange={(event) => setInput(event.target.value)}
        value={input}
      >
        {input}
      </textarea>
      <div>
        <button type="submit">Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
