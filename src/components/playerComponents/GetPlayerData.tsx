import React, { useEffect } from "react";
import { useState } from "react";
import {website, getPlayer, singleSeasonModifier} from "../data/apiWebsite"

interface PlayerId {
  id : number;
  name: string;
}

export const GetPlayerData: React.FC<PlayerId> = (props): JSX.Element =>  {

    const [data, setData] = useState <null | {stats: any[]}>(null);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    useEffect(() => {
        setLoading(true);
        fetch(website + getPlayer + props.id + singleSeasonModifier)
            .then((response) => response.json())
            .then(setData)
            .then(() => setLoading(false))
            .catch(setError)
    }, [props.id]);

    if(loading) return (
      <tr>
        <td>loading...</td>
        <td></td>
        <td></td>
        <td></td>

      </tr>
    ) 
    if(error) return <pre>{JSON.stringify(error, null, 2)}</pre>
        
    if(data)
      if(data.stats[0].splits.length > 0){
        return (
          <tr className="text-center">
            <td className="border-r-2 border-gray-500">{props.name}</td>
            <td className="border-r-2 border-gray-500">{data.stats[0].splits[0].stat.goals}</td>
            <td className="border-r-2 border-gray-500">{data.stats[0].splits[0].stat.assists}</td>
            <td >{data.stats[0].splits[0].stat.hits}</td>

          </tr>
       )
    }
    
    return ( <tr></tr> )

  }