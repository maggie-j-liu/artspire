/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="main">
          <h1 className="title text-3xl font-semibold">🎨 Artspire</h1>
          <h2>Unlimited Art With Limited Resources</h2>
          <p className="desc max-w-5xl">
            We believe that creativity should never be limited by the lack of
            resources at hand. This website not only caters towards that lack,
            but also addresses environmental issues. Reusing items that
            otherwise would have gone in the wastebin to create artOur curated
            collection of art ideas will help you unlock your artistic potential
            and create stunning masterpieces, regardless of what materials you
            have on hand. With Artspire, you'll never have to worry about not
            having the "right" materials again - all you need is a little
            inspiration(which this website will give) and a willingness to
            experiment!
          </p>
          <br></br>

          <div className="homeimg">
            <img src="painting.jpg" className="img3"></img>
            <img src="painting2.jpg" className="img3"></img>
            <img src="painting3.jpg" className="img3"></img>
          </div>
          <br></br>

          <Link
            href="http://localhost:3000/supplies"
            className={`rounded-lg bg-fuchsia-200 px-4 py-2.5 hover:bg-fuchsia-300`}
          >
            Get Started &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
