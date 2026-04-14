import { useMemo, useState } from "react";
import "./App.css";
import { Showcase } from "./Showcase";

function App() {
  const [source, setSource] = useState(
    "let rec pow x = fun n -> if n = 0 then 1 else x * pow x (n - 1) in pow 2 5",
  );
  const [result, setResult] = useState("Ready.");

  const isLoaded = useMemo(() => {
    return (
      typeof window !== "undefined" &&
      typeof window.OcamlInception?.run === "function"
    );
  }, []);

  function runInterpreter() {
    const runtime = window.OcamlInception;

    if (!isLoaded) {
      setResult("OCaml runtime is not loaded.");
      return;
    }

    try {
      if (!runtime) {
        setResult("OCaml runtime is unavailable.");
        return;
      }

      const output = runtime.run(source);
      setResult(output);
    } catch (error) {
      setResult("Execution crashed: " + String(error));
    }
  }

  return (
    <div className="app">
      <header>
        <h1>OCaml Inception Demo</h1>
        <p>OCaml... in OCaml ... in the web...</p>{" "}
      </header>
      <section className="playground">
        <div className="editor-panel">
        <label>OCaml</label>
        <textarea
          value={source}
          onChange={(e) => setSource(e.target.value)}
          spellCheck={false}
        />
        <button onClick={runInterpreter}>Run</button>
        </div>

        <aside className="showcase-panel" aria-label="Supported syntax">
          <Showcase />
        </aside>
      </section>

      <section>
        <h2>Output</h2>
        <pre>{result}</pre>
      </section>
    </div>
  );
}

export default App;
