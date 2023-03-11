import { useState } from "react";

const Generate = () => {
  const [idea, setIdea] = useState("");
  const getGeneration = async () => {
    const ai = await fetch("/api/ai", {
      method: "POST",
    }).then((res) => res.json());
    setIdea(ai.response);
  };
  return (
    <div>
      <h1>Generate ideas 💡</h1>
      <button
        className="bg-blue-400 py-1 px-2"
        onClick={() => {
          getGeneration();
        }}
      >
        Generate
      </button>
      <p>idea: {idea}</p>
    </div>
  );
};

export default Generate;
