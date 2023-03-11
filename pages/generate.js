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
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-8 py-4">
        <h1 className="text-center text-4xl font-semibold">
          Generate ideas 💡
        </h1>
        <div className="flex w-full justify-center">
          <button
            className="rounded-md bg-fuchsia-500 py-1.5 px-8 text-xl font-semibold text-white shadow-md duration-150 hover:scale-105"
            onClick={() => {
              getGeneration();
            }}
          >
            Generate
          </button>
        </div>
        <p>idea: {idea}</p>

        <div className="h-4" />
        <hr />
        <div className="h-4" />
        <div>
          <h2 className="text-xl">Supplies</h2>
          <ul>
            <li>crayons</li>
            <li>pens</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl">Colors</h2>
          <ul>
            <li>blue</li>
            <li>white</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Generate;
