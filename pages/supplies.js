import { useState } from "react";
import Link from "next/link";
export default function Home() {
  const defaultSupplies = ["pencil", "crayon", "paint", "brush"];

  const [supplies, setSupplies] = useState(() =>
    defaultSupplies.map((sup) => ({ name: sup, chosen: false }))
  );
  const [newSupplyName, setNewSupplyName] = useState("");
  function addsup(supply) {
    const suppliesCopy = [...supplies];
    for (let sup of suppliesCopy) {
      if (sup.name == supply) {
        sup.chosen = !sup.chosen;
      }
    }
    setSupplies(suppliesCopy);
  }

  function createSupply() {
    setSupplies([...supplies, { name: newSupplyName, chosen: true }]);
    setNewSupplyName("");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-3xl">
        <div className={`bg-gray-100 py-10`}>
          <h1 id="choose">Choose your supplies:</h1>
          <br></br>
          <div className="grid grid-cols-3 gap-4">
            {supplies.map((supply) => {
              return (
                <button
                  key={supply.name}
                  type="button"
                  className={`rounded-lg border border-2 px-4 py-4 ${
                    supply.chosen
                      ? "border-emerald-300 bg-emerald-50 hover:border-emerald-400"
                      : "border-gray-300 bg-white hover:border-gray-400"
                  }`}
                  onClick={() => {
                    addsup(supply.name);
                  }}
                >
                  {supply.name}
                </button>
              );
            })}
            <div
              className={`rounded-lg border border-2 border-gray-300 bg-white px-4 py-4 hover:border-gray-400`}
            >
              <input
                value={newSupplyName}
                onChange={(e) => setNewSupplyName(e.target.value)}
                type="text"
                className="border-b-4"
              />
              <button
                type="button"
                className="addbut"
                onClick={() => createSupply()}
              >
                {" "}
                &nbsp;&nbsp;&nbsp;<b> &#10133;</b>
              </button>
            </div>
          </div>
        </div>
      </div>
      <center>
        <div
          className={`w-32 rounded-lg border-2 border-gray-300 bg-white px-4 py-3 hover:border-gray-400`}
        >
          <Link href="/colors">Continue &rarr;</Link>
        </div>
      </center>
    </div>
  );
}
