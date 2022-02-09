import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { thumbnails } from "./thumbnails";
import { TeamData } from "./teamData";
import { GetPlayerData } from "./GetPlayerData";
import {website, statModifier} from "./apiWebsite"

export const TeamDisplay = (): JSX.Element => {
    let params = useParams();
    
    const [data, setData] = useState <null | {teams: any}>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(website + '/api/v1/teams' + statModifier)
            .then((response) => response.json())
            .then(setData)
            .then(() => setLoading(false))
            .catch(setError)
    }, []);

    if(loading) return <h1>Loading...</h1>;

    if(error) return <pre>{JSON.stringify(error, null, 2)}</pre>

    var x = 0
    if(data) {
        for(x = 0; x < data.teams.length; x++)
        {
            //find the api team
            if(data.teams[x].teamName === params.teamName)
            {
                break;
            }
        }
    }
    
    if(!data) return <>data error</>;
    return (
        //data.team[x] to get current team
        <section className= "bg-mainbg bg-fixed bg-auto md:bg-cover text-white lg:px-24 xl:px-52 text-center bottom-0">
            <div className="flex justify-between p-10">
                <h1 className="text-5xl text-left p-5">{data.teams[x].teamName}</h1>
                <img alt ="teamlogo" src={thumbnails[x]} width="100"></img>
            </div>
            <div> 
                <TeamData 
                    win = {data.teams[x].teamStats[0].splits[0].stat.wins}
                    loss = {data.teams[x].teamStats[0].splits[0].stat.losses}
                    ot = {data.teams[x].teamStats[0].splits[0].stat.ot}
                />
                <GetPlayerData
                    link = {`${website}/api/v1/teams/${data.teams[x].id}/roster`}
                />
            </div>
            <div className=" h-screen"/>
        
        </section>
        )
} 