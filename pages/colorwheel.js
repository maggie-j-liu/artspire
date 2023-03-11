import { useState } from "react"



  // Usage

export default function Home() {


  const [currentColor, setCurrentColor] = useState("#000000")
  const [colors, setColors] = useState([])

  function saveColor() {
    setColors([...colors, currentColor])
  }

  return (
    <div>
      <div className="px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4">
            <div className="px-4 py-4 flex items-center w-max gap-4" style={{ backgroundColor: currentColor }}>
              <input type="color" value={currentColor} className="w-12" onChange={(e) => {
                setCurrentColor(e.target.value)
              }} />
              <div className="bg-white px-1 rounded font-semibold">
                chosen color: {currentColor}
              </div>
            </div>
            <button onClick={saveColor} className="bg-fuchsia-400 px-4 text-white py-1 rounded-md shadow font-semibold hover:shadow-lg hover:bg-fuchsia-500 duration-150">Save color</button>
            </div>
          <div>
          saved colors:
          <div className="grid grid-cols-5">
            {colors.map(color => (
              <div key={color} className="w-32 h-32" style={{ backgroundColor: color }}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
   </div>
  )
}