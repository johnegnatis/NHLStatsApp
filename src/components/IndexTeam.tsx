import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { thumbnails } from "./data/thumbnails";
import {website, statModifier} from "./data/apiWebsite"
import { PlayerData } from "./playerComponents/IndexTeam";
import { Link } from "react-router-dom";
import axios from "axios";
import Popup from "reactjs-popup";
import "./../index.css";
import 'reactjs-popup/dist/index.css';


export const TeamDisplay = (): JSX.Element => {
    let params = useParams();
    
    const [data, setData] = useState <null | {id: number; locationName: string; teamName: string;}>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [x, setX] = React.useState(0);

    useEffect(() => {
        setLoading(true);
        try {
            (async() => {
                let teamAPI: any = await axios.get(website + '/api/v1/teams' + statModifier)        
                let i: number = 0;
                for(i = 0; i < teamAPI.data.teams.length; i++)
                {
                    //find the api team
                    if(teamAPI.data.teams[i].teamName === params.teamName)
                    {
                        setX(i);
                        break;
                    }
                }
                setData(teamAPI.data.teams[i]);
                setLoading(false);
            })();
        }
        catch(e:any) {
            console.error(e);
            setError(e);
          }
    }, [params.teamName]);

    if(loading) return <h1>Loading...</h1>;

    if(error) return <pre>{JSON.stringify(error, null, 2)}</pre>
    
    if(data)
    {
        let api: string = `${website}/api/v1/teams/${data.id}/roster`;    
        return (
            <section className= "bg-gray-400 text-white text-center ">
                <div className="flex justify-start">
                    <Link
                        to="/NHLStatsApp/"
                        className="hover:bg-blue-500 p-1 m-1 lg:p-2 lg:m-2 border bg-black text-xs lg:text-lg 2xl:text-3xl"
                    >
                        Return to home
                    </Link>
                </div>
                <div className="flex justify-center object-scale-down">
                    <h1 className=" text-gray-900 text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-extrabold text-left pb-0 p-5">{data.locationName}</h1>
                </div>
                <div className="flex justify-center object-scale-down">
                    <h1 className=" text-gray-900 text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-extrabold text-left pt-0 p-5">{data.teamName}</h1>
                </div>

                <div className="flex justify-center object-scale-down">
                    <img alt ="teamlogo" src={thumbnails[x]} width="100"></img>
                </div>
                <br></br>
                <div className="flex justify-center">
                    <Popup trigger={<button className="text-blue-700 underline">About player photos</button>} position="bottom center">
                        <div className="bg-black text-white p-2">
                            <span>The website that fetches the player portraits is not secure in most browsers. If you wish to see the player portraits in your browser, click the link below and give your internet browser permission to bypass the warning.</span>
                            <br/>
                            <a href="https://nhl.bamcontent.com" target="_blank" className="text-blue-500">Click here to be redirected</a>
                        </div>
                    </Popup>
                </div>

                <div className="flex justify-center"> 
                    <PlayerData
                        link = {api}
                    />
                </div>    

            </section>
        )
    }
    return <></>
} 