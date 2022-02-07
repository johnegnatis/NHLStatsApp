import React from "react";
import { items } from "../App";

export function Teams() {
    
        var arrayItems : any[] = [];
        for(let x = 0; x < items.length/2; x+=1) //TODO FIND OUT WHY THIS IS RETURNING DUPLICATE
            arrayItems.push(items[x]);

        return (
            <section className="">
                <div
                    className="flex flex-wrap justify-center"
                >
                    {arrayItems}
                </div>
            </section>
        )
}
