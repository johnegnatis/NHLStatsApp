import React from 'react';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { website } from './components/data/apiWebsite';

export var items : JSX.Element[] = [];
export function App() {

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

    if(!data) return null;

    return (
        <div className='relative min-h-screen font-mainfont'>
            <Outlet/>  
            <footer className='text-white bg-black h-50 text-center px-10 xl:px-20 py-5'>
                <span
                    className=''
                >{data.copyright}</span>
            </footer>
        </div>
    );
}
