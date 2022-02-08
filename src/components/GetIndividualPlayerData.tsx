import React, { useEffect } from "react";
import { useState } from "react";
import {website, getPlayer, singleSeasonModifier} from "./apiWebsite"

interface PlayerID {
  id : number;
  name: string;
}

export const GetIndividualPlayerData: React.FC<PlayerID> = (props): JSX.Element =>  {

    const [data, setData] = useState <null | {roster: any}>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    useEffect(() => {
        setLoading(true);
        fetch(website + getPlayer + props.id + singleSeasonModifier)
            .then((response) => response.json())
            .then(setData)
            .then(() => setLoading(false))
            .catch(setError)
    }, []);

    if(loading) return <h1>Loading...</h1>;

    if(error) return <pre>{JSON.stringify(error, null, 2)}</pre>

    if(!data) return <> error</>;

      return (
        //return table item
        <></>
     )
    }

