import React from "react";
import { Teams } from "./Teams";

export function Body() {
    return(
        <section className=" bg-mainbg bg-fixed bg-auto md:bg-cover text-white lg:px-24 xl:px-52 text-center pt-10" >
            <h1 className="font-bold text-7xl">NHL Stat Tracker</h1>
            <h2 className="m-2 pb-10 text-xl">Click on your favorite team to learn more!</h2>
            <Teams />
            <div className="pt-10 lg:pt-72"></div>
        </section>
        
    )
}