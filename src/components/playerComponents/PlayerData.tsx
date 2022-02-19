import React, { useEffect, useState } from "react";
import axios from 'axios';
import { website, singleSeasonModifier } from "../data/apiWebsite"
import SkaterTable from "./SkaterTable";
import GoalieTable from "./TableGoalie"

interface PlayerProps {
  link : string;
}

interface SkaterRow {
  name: string;
  goals: number;
  assists: number;
  hits: number;
  position: string;
  plusMinus: number;
  number: number;
}
interface GoalieRow {
  name: string;
  saves: number;
  number: number;
  gaa: number;
  svPercent: number;
  shutouts: number;
}

export const PlayerData: React.FC<PlayerProps> = (props): JSX.Element =>  {

  const [playerData, setPlayerData] = useState <SkaterRow[]> ([]);
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
          let thePlayerData: SkaterRow[] = [];
          let theGoalieData: GoalieRow[] = [];
          for(let x = 0; x < playerResponses.length; x++){
            //@ts-ignore
            if(playerResponses[x].data.stats[0].splits.length > 0){

              if(teamResponse.data.roster[x].position.code !== 'G')
              {
                thePlayerData.push({
                  name: teamResponse.data.roster[x].person.fullName,
                  position: teamResponse.data.roster[x].position.code,
                  number: teamResponse.data.roster[x].jerseyNumber,
                  goals: playerResponses[x].data.stats[0].splits[0].stat.goals,
                  assists: playerResponses[x].data.stats[0].splits[0].stat.assists,
                  hits: playerResponses[x].data.stats[0].splits[0].stat.hits,
                  plusMinus: playerResponses[x].data.stats[0].splits[0].stat.plusMinus,
                })
              }
              else
              {
                theGoalieData.push({
                  name: teamResponse.data.roster[x].person.fullName,
                  saves: playerResponses[x].data.stats[0].splits[0].stat.saves,
                  number: teamResponse.data.roster[x].jerseyNumber,
                  gaa: playerResponses[x].data.stats[0].splits[0].stat.goalAgainstAverage.toFixed(3),
                  svPercent: playerResponses[x].data.stats[0].splits[0].stat.evenStrengthSavePercentage.toFixed(3),
                  shutouts: playerResponses[x].data.stats[0].splits[0].stat.shutouts
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
        <div className=" max-w-screen-lg block w-full">
          <div className="flex justify-center">
            <h2 className="font-bold text-2xl mt-10 mb-2 p-2 bg-black border-2 shadow-lg rounded-lg w-fit h-fit">Skaters</h2>
          </div>
          <div className="min-w-table overflow-x-auto flex justify-center">
            <SkaterTable data={playerData} />
          </div>
          <br></br>
          <div className="flex justify-center">
            <h2 className="font-bold text-2xl mt-10 mb-2 p-2 bg-black border-2 shadow-lg rounded-lg w-fit h-fit">Goalies</h2>
          </div>
          <div className=" min-w-table overflow-x-auto flex justify-center">
            <GoalieTable data = {goalieData}/>
          </div>
        
        </div>
      )
    }
    return <div> no data </div>
  }

 
