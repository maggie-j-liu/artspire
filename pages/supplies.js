import { useState } from "react";
import Link from "next/link";
import { HiPlusCircle } from "react-icons/hi";
import { Alex_Brush } from "next/font/google";
export default function Home() {
  const defaultSupplies = [
    ["pencil", "pencil.png"],
    ["crayon", "crayon.png"],
    ["paint", "brush.png"],
    ["pen", "pen.png"],
    ["watercolor", "watercolor.png"],
    ["pastels", "pastels.png"],
    ["clay", "clay-crafting.png"],
  ];
  const [supplies, setSupplies] = useState(() =>
    defaultSupplies.map((sup) => ({
      name: sup[0],
      image: sup[1],
      chosen: false,
    }))
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
  let num = 0;

  const genQueryParam = () => {
    const chosenSupplies = supplies.reduce((acc, curr) => {
      if (curr.chosen) {
        acc.push(curr.name);
      }
      return acc;
    }, []);
    return JSON.stringify(chosenSupplies);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-3xl">
        <div className={`bg-gray-100 py-10`}>
          <h1 id="choose">Choose your supplies:</h1>
          <br></br>
          <div className="grid grid-cols-3 gap-4">
            {supplies.map((supply) => {
              return (
                <div key={supply.name}>
                  <button
                    type="button"
                    className={`h-full w-full rounded-lg border-2 px-4 py-4 ${
                      supply.chosen
                        ? "border-emerald-300 bg-emerald-50 hover:border-emerald-400"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    }`}
                    onClick={() => {
                      addsup(supply.name);
                    }}
                  >
                    <div className="flex items-center justify-center gap-4">
                      <div>{supply.name}</div>
                      {supply.image ? (
                        <img className="img2" src={`/${supply.image}`}></img>
                      ) : null}
                    </div>
                  </button>
                </div>
              );
            })}
            <div
              className={`rounded-lg border-2 border-gray-300 bg-white px-4 py-4 hover:border-gray-400`}
            >
              <p className="mb-1 text-xs font-semibold text-gray-500">
                custom supply:
              </p>
              <div className="flex items-center justify-between gap-4 ">
                <input
                  value={newSupplyName}
                  onChange={(e) => setNewSupplyName(e.target.value)}
                  type="text"
                  className="min-w-0 flex-shrink border-b-4"
                />
                <button
                  type="button"
                  className="addbut hover:text-[#b59b82]"
                  onClick={() => createSupply()}
                >
                  <HiPlusCircle className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
          <Link
            href={`/colors?supplies=${genQueryParam()}`}
            className="mt-6 ml-auto block w-max rounded-md bg-[#CCB197] px-4 py-2 hover:bg-[#b59b82]"
          >
            Continue &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
