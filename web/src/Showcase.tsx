import { useState } from "react";
import { supportedForms } from "./forms";

function Showcase() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="showcase">
      <button
        type="button"
        className="showcase-toggle"
        onClick={() => setIsExpanded((current) => !current)}
      >
        <span className={`triangle ${isExpanded ? "triangle-expanded" : ""}`} />
        <span className="showcase-title">Supported OCaml Subset</span>
      </button>

      {isExpanded && (
        <ul className="showcase-content">
          {supportedForms.map((form) => (
            <li key={form}>{form}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export { Showcase };
