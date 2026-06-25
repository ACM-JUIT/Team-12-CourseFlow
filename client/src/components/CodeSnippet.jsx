// import React, { useState } from "react";
// import "./CodeSnippet.css";

// function CodeSnippet({ code }) {
//   const [copied, setCopied] = useState(false);

//   const copyCode = () => {
//     navigator.clipboard.writeText(code).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     });
//   };

//   return (
//     <div className="code-container">
//       <div className="code-header">
//         <div className="dots">
//           <span className="dot dot-red"></span>
//           <span className="dot dot-yellow"></span>
//           <span className="dot dot-green"></span>
//         </div>
//         <button className={`copy-btn ${copied ? "copied" : ""}`} onClick={copyCode}>
//           {copied ? "Copied!" : "Copy"}
//         </button>
//       </div>
//       <pre>
//         <code>{code}</code>
//       </pre>
//     </div>
//   );
// }

// export default CodeSnippet;
import React, { useState } from "react";
import "./CodeSnippet.css";

function CodeSnippet({ code }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="code-container">
      <div className="code-header">
        <div className="dots">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
        </div>
        <button className={`copy-btn ${copied ? "copied" : ""}`} onClick={copyCode}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default CodeSnippet;
