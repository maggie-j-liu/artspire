import { useState } from "react"
import Link  from "next/link"
export default function Home() {
    return (
        <>
        <div className ="bg-gray-100">
            <div className = "main">
                <h1 className = "title">Artspire</h1>
                <h2>Unlimited Art With Limited Resources</h2>
                    <h2 className = "desc">We believe that creativity should 
                    never be limited by the resources at hand. 
                    That's why we offer a wide range of art inspiration 
                    that utilizes the materials you already have, whether
                     it's paint, colored pencils, or even something as unexpected
                      as straws. Our curated collection of art ideas will help 
                      you unlock your artistic potential and create stunning 
                      masterpieces, regardless of what materials you have on 
                      hand. With Artspire, you'll never have to worry about not 
                      having the "right" materials again - all you need is a 
                      little inspiration(which this website will give) and a willingness to experiment!</h2>
                    <br></br>

                    <div className = "homeimg">
                        <img src = "painting.jpg" className="img3"></img>
                        <img src = "painting2.jpg" className = "img3"></img>
                        <img src = "painting3.jpg" className = "img3"></img>
                    </div>
                    <br></br>

                    <Link href = "http://localhost:3000/supplies" className={`rounded-lg px-4 py-2.5 border-2 bg-white border-gray-300 hover:border-gray-400 w-32`}>
                    Continue &rarr;
                    </Link>
                </div>
            </div>
        </>
    );
}