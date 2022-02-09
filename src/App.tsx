import React from 'react';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { TeamThumbnail } from './components/TeamThumbnail';
import { thumbnails } from './components/thumbnails';
import { website } from './components/apiWebsite';

export var items : JSX.Element[] = [];
export function App() {

    const [data, setData] = useState <null | {teams: any}>(null);
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

    if(data) {
        for(let i = 0; i < data.teams.length; i++) {
                let srcWin : number = data.teams[i].teamStats[0].splits[0].stat.wins;
                let srcLoss : number = (data.teams[i].teamStats[0].splits[0].stat.losses + data.teams[i].teamStats[0].splits[0].stat.ot);
                items.push(
                    <TeamThumbnail 
                        key = {i} 
                        logo = {thumbnails[i]}
                        win = {srcWin}
                        loss = {srcLoss}
                        locationName = {data.teams[i].locationName}
                        teamName = {data.teams[i].teamName}
                    />
                )
            }
    }
    if(!data) return null;

    return (
        <div className='relative min-h-screen font-mainfont'>

            {/* <h1 className='pt-5 text-center' >HEADER</h1> */}
            <Outlet/>  
            {/* <h1 className='pt-5 text-center'>FOOTER</h1> */}
        </div>
    );
}
