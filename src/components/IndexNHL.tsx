import React, {useState, useEffect} from "react";
import { Teams } from "./TableNHL";
import { website } from "./data/apiWebsite";

export function Body() {
    const [data, setData] = useState <null | {teams: any, copyright: any}>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(website + '/api/v1/teams?expand=team.stats')
            .then((response) => response.json())
            .then(setData)
            .then(() => setLoading(false))
            .catch(setError)
    }, []);

    if(loading) return <h1>Loading...</h1>;

    if(error) return <pre>{JSON.stringify(error, null, 2)}</pre>

    let teamNamesArray : string[] = [];
    let rankingArray : string[] = [];
    let locationNameArray : string[] = [];
    let winsArray : number[] = [];
    let lossArray : number[] = [];
    let otArray : number[] = [];
    let gfArray: number[] = [];
    let gaArray: number[] = [];
    let conferencesArray: string[] = [];
    if(data) {
        for(let i = 0; i < data.teams.length; i++) {
                winsArray.push(data.teams[i].teamStats[0].splits[0].stat.wins);
                lossArray.push(data.teams[i].teamStats[0].splits[0].stat.losses);
                otArray.push(data.teams[i].teamStats[0].splits[0].stat.ot);
                teamNamesArray.push(data.teams[i].teamName);
                locationNameArray.push(data.teams[i].locationName);
                rankingArray.push(data.teams[i].teamStats[0].splits[1].stat.pts)
                gfArray.push(data.teams[i].teamStats[0].splits[0].stat.goalsPerGame)
                gaArray.push(data.teams[i].teamStats[0].splits[0].stat.goalsAgainstPerGame)
                conferencesArray.push(data.teams[i].conference.name.substring(0,4))
            }
    }

    if(!data) return null;
    
    return(
        <section className="bg-gray-400 bg-fixed bg-auto md:bg-cover text-white lg:px-24 xl:px-52 text-center pt-10" >
            <div className="text-black font-extrabold">
                <h1 className="font-bold text-4xl xs:text-5xl sm:text-6xl md:text-7xl">NHL STATS APP</h1>
                <h2 className="m-2 pb-10 text-xl md:text-2xl">Click on your favorite team!</h2>
            </div>
            <div className="flex justify-center">
                <div className="w-full md:w-4/5">
                    <Teams
                        wins = {winsArray}
                        losses = {lossArray}
                        ranking = {rankingArray}
                        teamName = {teamNamesArray}
                        locationName = {locationNameArray}
                        ot = {otArray}
                        gf = {gfArray}
                        ga = {gaArray}
                        conferences = {conferencesArray}
                    />
                </div>
            </div>
            <div className="pt-10"></div>
        </section> 
    )
}