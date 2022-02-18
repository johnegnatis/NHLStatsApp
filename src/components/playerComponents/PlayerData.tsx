import React, { useEffect } from "react";
import { useState } from "react";
import { GetGoalieData } from "./GetGoalieData"
import {GetPlayerData} from "./GetPlayerData"
import axios from 'axios';

interface PlayerProps {
  link : string;
}

export const PlayerData: React.FC<PlayerProps> = (props): JSX.Element =>  {

    let playerList: JSX.Element[] = [];
    let goalieList: JSX.Element[] = []; 

    const [data, setData] = useState <null | {roster: any}>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(props.link)
            .then((response) => response.json())
            .then(setData)
            .then(() => setLoading(false))
            .catch(setError)
    }, [props.link]);

    if(loading) return <h1>Loading...</h1>;

    if(error) return <pre>{JSON.stringify(error, null, 2)}</pre>

    if(!data) return <> error</>;

    if(data) {
      for(let x = 0; x < data.roster.length; x++) {
        if(data.roster[x].position.code !== "G")
          playerList.push(<GetPlayerData 
              key = {x} 
              id = {data.roster[x].person.id} 
              name = {data.roster[x].person.fullName}
            />);
        else
          goalieList.push(<GetGoalieData 
            key = {x} 
            id = {data.roster[x].person.id} 
            name = {data.roster[x].person.fullName}
          />);
      }
    }
      return (
      <div>
        <table className="border-4 text-center m-5 bg-black">
          <thead>
            <tr className="border-2 border-gray-500 ">
              <td className="w-56 p-4">Player</td>
              <td className="w-24 p-4 border-x-2 border-gray-500">Goals</td>
              <td className="w-24 p-4">Assists</td>
              <td className="w-24 p-4 border-l-2 border-gray-500">Hits</td>
            </tr>
          </thead>
          <tbody>
            {playerList}
          </tbody>
        </table>
        <table className="border-4 text-center m-5 bg-black">
          <thead>
            <tr className="border-2 border-gray-500 ">
              <td className="w-56 p-4 border-r-2 border-gray-500">Goalie</td>
              <td className="w-24 p-4 border-r-2 border-gray-500">Saves</td>
              <td className="w-24 p-4 border-r-2 border-gray-500">GGA</td>
              <td className="w-24 p-4">Shutouts</td>
            </tr>
          </thead>
          <tbody>
            {goalieList}
          </tbody>
        </table>
      </div>
      )
    }



    