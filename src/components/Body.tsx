import React, {useState, useEffect} from "react";
import { Teams } from "./Teams";
import { website } from "./data/apiWebsite";
import { thumbnails } from "./data/thumbnails";

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

    var teamNamesArray : string[] = [];
    var locationNameArray : string[] = [];
    var winsArray : number[] = [];
    var lossArray : number[] = [];


    if(data) {
        for(let i = 0; i < data.teams.length; i++) {
                let srcWin : number = data.teams[i].teamStats[0].splits[0].stat.wins;
                let srcLoss : number = (data.teams[i].teamStats[0].splits[0].stat.losses + data.teams[i].teamStats[0].splits[0].stat.ot);
                teamNamesArray.push(data.teams[i].teamName);
                locationNameArray.push(data.teams[i].locationName);
                winsArray.push(srcWin);
                lossArray.push(srcLoss);
            }
    }

    if(!data) return null;
    
    return(

        <section className=" bg-mainbg bg-fixed bg-auto md:bg-cover text-white lg:px-24 xl:px-52 text-center pt-10" >
            <h1 className="font-bold text-7xl">NHL Stat Tracker</h1>
            <h2 className="m-2 pb-10 text-xl">Click on your favorite team to learn more!</h2>
            <div className="flex justify-center">
                <Teams
                    wins = {winsArray}
                    losses = {lossArray}
                    teamName = {teamNamesArray}
                    locationName = {locationNameArray}
                />
            </div>
            <div className="pt-10 lg:pt-10"></div>
        </section>
        
    )
}