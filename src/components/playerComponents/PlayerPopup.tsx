import React from "react";
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import "./animation.css"

interface SkaterPopup {
    src: string;
    name: string;
    age: number;
    height: string;
    weight: number;
}
export const PlayerPopup: React.FC<SkaterPopup> = (props): JSX.Element =>  {
    return (
        <div className=" shadow-2xl shadow-white">
            <Popup
                trigger={<button className="hover:text-blue-500">{props.name}</button>} position="right bottom"
                offsetX={10}
            >
                <div className="relative text-center bg-gray-400 border-white border-4 rounded-md">
                    <h3>{`${props.age} years old`}</h3>
                    <h3>{`${props.height} - ${props.weight} lbs`}</h3>
                    <div className="flex justify-center">
                        <img src={props.src}  alt={`Portrait of ${props.name}`} className="w-4/5 border-2 border-black rounded-2xl mb-1"/>
                    </div>
                </div>
            </Popup>
        </div>
    )
}

