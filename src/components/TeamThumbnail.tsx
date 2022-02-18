import React from "react";
import { useNavigate } from "react-router-dom";

interface ThumbnailProps {
    logo : string;
    win : number;
    loss: number;
    locationName : string;
    teamName :string;
}

export const TeamThumbnail: React.FC<ThumbnailProps> = (props): JSX.Element => {

    const path : string = props.teamName;

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        navigate(path)
    }

    return(
        <div className="text-lg hover:bg-slate-400 bg-slate-500 text-white border-4 border-black rounded-lg m-5 py-2 px-3 min-w-[160px] w-1/6"
        onClick={routeChange}
        >
            <h1 className="text-center font-bold">{props.locationName}<br/>{props.teamName}</h1>
            <h2 className="text-center italic text-xs">w-l: {props.win} - {props.loss}</h2>
            <div className="relative flex justify-center">
                <img
                    src = {props.logo}
                    alt = ""
                    className="m-1 h-12"
                >
                </img>
            </div>
        </div>
    )
}