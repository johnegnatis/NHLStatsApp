import React, { useEffect } from "react";
import { useState } from "react";
import {website, getPlayer, singleSeasonModifier} from "./apiWebsite"

interface PlayerID {
  id : number;
  name: string;
  isGoalie: boolean;
}

export const GetIndividualPlayerData: React.FC<PlayerID> = (props): JSX.Element =>  {

    const [data, setData] = useState <null | {stats: any[]}>(null);
    const [error, setError] = React.useState(null);
    useEffect(() => {
        fetch(website + getPlayer + props.id + singleSeasonModifier)
            .then((response) => response.json())
            .then(setData)
            .catch(setError)
    }, [props.id]);

    if(!data) return (
      <tr>
        <td>{props.name}</td>
        <td>no data</td>
        <td>no data</td>
        <td>no data</td>

      </tr>
    ) 
    if(error) return <pre>{JSON.stringify(error, null, 2)}</pre>
    
    if(props.isGoalie === false && data.stats[0].splits.length > 0){
      console.log(data.stats[0])
      return (
        <tr>
          <td>{props.name}</td>
          <td>{data.stats[0].splits[0].stat.goals}</td>
          <td>{data.stats[0].splits[0].stat.assists}</td>
          <td>{data.stats[0].splits[0].stat.hits}</td>

        </tr>
     )
      }
    else 
      return (<tr>
        <td>{props.name}</td>
        <td>goalie</td>
        <td>goalie</td>
        <td>goalie</td>

      </tr>)

      }