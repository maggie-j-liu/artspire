import { useState } from "react"
import Link  from "next/link"
import { Alex_Brush } from "next/font/google"
export default function Home() {
    const defaultSupplies = [
        ["pencil","pencil.jpg"],["crayon","crayon.jpg"],["paint","paint.jpg"],["brush","brush.jpg"],["pen","pen.jpg"],["watercolor","watercolor.jpg"],["pastels", "pastels.jpg"],["clay","clay.jpg"]
    ]
    const [supplies, setSupplies] = useState(() => defaultSupplies.map(sup => ({name: sup, chosen: false})))
    const [newSupplyName, setNewSupplyName] = useState("")
    function addsup(supply) {
        const suppliesCopy = [...supplies]
        for (let sup of suppliesCopy) {
            if (sup.name == supply) {
                sup.chosen = !sup.chosen
            }
        }
        setSupplies(suppliesCopy)
    }

    function createSupply() {
        setSupplies([...supplies, { name: newSupplyName, chosen: true }])
        setNewSupplyName("")
    }
    let num = 0;

    
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-3xl mx-auto">
                <div className={`bg-gray-100 py-10`}>
                    <h1 id = "choose">Choose your supplies:</h1>
                    <br></br>
                    <div className="grid gap-4 grid-cols-3">
                        {supplies.map((supply) => {
                            num++
                            return (
                                <>
                                <button key={supply.name} type="button" className ={`rounded-lg px-4 py-4 border-2 ${supply.chosen ? "border-emerald-300 bg-emerald-50 hover:border-emerald-400" : "bg-white border-gray-300 hover:border-gray-400"}`} onClick={() => {addsup(supply.name)}}>{supply.name}
                                <img class = "img2" src = {defaultSupplies[num-1][1]}></img> </button>
                                </>
                                )
                            })}
                            <div
                            className ={`rounded-lg px-4 py-4 border-2 bg-white border-gray-300 hover:border-gray-400`}
                            >
                            <input value={newSupplyName} onChange={(e) => setNewSupplyName(e.target.value)} type="text" className="border-b-4" />
                            <button type="button" className="addbut" onClick={() => createSupply()}> &nbsp;&nbsp;&nbsp;<b>	&#10133;</b></button>
                        </div>
                    </div>
    
                </div>
            </div>
            <center>
                <div className = {`rounded-lg px-4 py-3 border-2 bg-white border-gray-300 hover:border-gray-400 w-32`}>
                    <Link href="/colors">
                        Continue &rarr;
                    </Link>
                </div>
            </center>
        </div>

    );
}