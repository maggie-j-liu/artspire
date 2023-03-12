import Link from "next/link";
import { useState } from "react";
import { HiX } from "react-icons/hi";
import { useRouter } from "next/router";

export default function Home() {
  const [currentColor, setCurrentColor] = useState("#000000");
  const [colors, setColors] = useState([]);
  const router = useRouter();

  function saveColor() {
    if (colors.includes(currentColor)) return;
    setColors([...colors, currentColor]);
  }

  function removeColor(col) {
    setColors(colors.filter((color) => color !== col));
  }

  const genQueryParam = () => {
    const currentQuery = router.query;
    const params = new URLSearchParams({
      supplies: currentQuery.supplies,
      colors: JSON.stringify(colors),
    });
    return params.toString();
  };

  return (
    <div>
      <div className="px-8 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-center gap-4">
            <label
              className="flex w-max items-center gap-4 px-4 py-4"
              style={{ backgroundColor: currentColor }}
            >
              <input
                type="color"
                value={currentColor}
                className="w-12"
                onChange={(e) => {
                  setCurrentColor(e.target.value);
                }}
              />
              <div className="rounded bg-white px-1 font-semibold">
                chosen color: {currentColor}
              </div>
            </label>
            <button
              onClick={saveColor}
              className="rounded-md bg-[#CCB197] px-4 py-1 font-semibold text-white shadow duration-150 hover:bg-[#b59b82] hover:shadow-lg"
            >
              Add color
            </button>
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Your colors</h1>
            {colors.length === 0 ? (
              <p>
                no colors yet! use the color picker above to choose colors that
                you have or want to use in your art
              </p>
            ) : (
              <div className="mt-4 grid grid-cols-5 gap-y-8">
                {colors.map((color) => (
                  <div
                    key={color}
                    className="relative h-32 w-32 rounded-md border"
                    style={{ backgroundColor: color }}
                  >
                    <button
                      className="absolute -top-2.5 -right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-red-400 outline outline-red-400 hover:bg-red-400 hover:text-white"
                      type="button"
                      onClick={() => removeColor(color)}
                    >
                      <HiX className="w-3" />
                    </button>
                    <div className="group flex h-full w-full items-center justify-center">
                      <div className="rounded-md bg-white/60 px-2.5 py-1 font-medium group-hover:bg-white">
                        {color}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-6">
              {colors.length === 0 ? (
                <div className="ml-auto block w-max cursor-not-allowed rounded-md bg-[#CCB197] px-4 py-2 saturate-50">
                  Continue &rarr;
                </div>
              ) : (
                <Link
                  href={`/generate?${genQueryParam()}`}
                  className="ml-auto block w-max rounded-md bg-[#CCB197] px-4 py-2 hover:bg-[#b59b82]"
                >
                  Continue &rarr;
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
