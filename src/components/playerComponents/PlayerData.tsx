import React, { useEffect, useState } from "react";
import axios from 'axios';
import { website, singleSeasonModifier } from "../data/apiWebsite"
import PlayerTable from "./PlayerTable";
import GoalieTable from "./TableGoalie"

interface PlayerProps {
  link : string;
}

interface PlayerRow {
  name: string;
  goals: number;
  assists: number;
  hits: number;
}
interface GoalieRow {
  name: string;
  saves: number;
}

export const PlayerData: React.FC<PlayerProps> = (props): JSX.Element =>  {

  const [playerData, setPlayerData] = useState <PlayerRow[]> ([]);
  const [goalieData, setGoalieData] = useState <GoalieRow[]> ([]);
  const [loading, setLoading] = useState <boolean> (false);
  const [error, setError] = useState(null);

  useEffect(() => {
      setLoading(true);
      try {
        (async () => {
          const playerIDArray : any[] = [];
          let teamResponse: any = await axios.get(props.link);
          //@ts-ignore
          (teamResponse.data.roster).forEach((player) => {
            playerIDArray.push(axios.get(website + player.person.link + singleSeasonModifier))
          })
          let playerResponses: any[] = await axios.all(playerIDArray);
          let thePlayerData: PlayerRow[] = [];
          let theGoalieData: GoalieRow[] = [];
          for(let x = 0; x < playerResponses.length; x++){
            console.log(x);
            //@ts-ignore
            if(playerResponses[x].data.stats[0].splits.length > 0){

              if(teamResponse.data.roster[x].position.code !== 'G')
              {
                thePlayerData.push({
                name: teamResponse.data.roster[x].person.fullName,
                goals: playerResponses[x].data.stats[0].splits[0].stat.goals,
                assists: playerResponses[x].data.stats[0].splits[0].stat.assists,
                hits: playerResponses[x].data.stats[0].splits[0].stat.hits,
                })
              }
              else
              {
                theGoalieData.push({
                  name: teamResponse.data.roster[x].person.fullName,
                  saves: playerResponses[x].data.stats[0].splits[0].stat.saves,
                  })
              }
            }
          }
          setPlayerData(thePlayerData);
          setGoalieData(theGoalieData);
          setLoading(false);
        })();
      }
      catch(e:any) {
        console.error(e);
        setError(e);
      }
    }, [props.link])
    
    if(loading)
    {
      return (
        <div>Loading...</div>
      )
    }
    if(error)
    {
        return <pre>{JSON.stringify(error, null, 2)}</pre>
    }
    if(playerData && goalieData)
    {
      return (
        <div className=" max-w-screen-lg w-full">
          <div className="w-full">
            <PlayerTable data={playerData} />
          </div>
          <br></br>
          
          <GoalieTable data = {goalieData}/>
        
        </div>
      )
    }
    return <div> no data </div>
  }

 
