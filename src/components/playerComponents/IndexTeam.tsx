import React, { useEffect, useState } from "react";
import axios from 'axios';
import { website, singleSeasonModifier } from "../data/apiWebsite"
import SkaterTable from "./TableSkater";
import GoalieTable from "./TableGoalie"

interface PlayerProps {
  link : string;
}

interface SkaterRow {
  playerID: number;
  name: string;
  goals: number;
  assists: number;
  hits: number;
  position: string;
  plusMinus: number;
  number: number;
  age: number;
  height: string;
  weight: number;
}
interface GoalieRow {
  playerID: number;
  name: string;
  saves: number;
  number: number;
  gaa: number;
  svPercent: number;
  shutouts: number;
  age: number;
  height: string;
  weight: number;
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
          const playerDataArray: any[] = [];
          let teamResponse: any = await axios.get(props.link);
          //@ts-ignore
          (teamResponse.data.roster).forEach((player) => {
            playerIDArray.push(axios.get(website + player.person.link + singleSeasonModifier))
            playerDataArray.push(axios.get(website + player.person.link))
          })
          let playerResponses: any[] = await axios.all(playerIDArray);
          let playerDataResponses: any[] = await axios.all(playerDataArray);
          let thePlayerData: SkaterRow[] = [];
          let theGoalieData: GoalieRow[] = [];
          console.log(teamResponse);
          for(let x = 0; x < playerResponses.length; x++){
            if(playerResponses[x].data.stats[0]){

              if(teamResponse.data.roster[x].position.code !== 'G')
              {
                //@ts-ignore
                thePlayerData.push({
                  playerID: teamResponse.data.roster[x].person.id || 0,
                  name: teamResponse.data.roster[x].person.fullName || 0,
                  age: playerDataResponses[x].data.people[0].currentAge || 0,
                  height: playerDataResponses[x].data.people[0].height || 0,
                  weight: playerDataResponses[x].data.people[0].weight || 0,
                  position: teamResponse.data.roster[x].position.code || 0,
                  number: teamResponse.data.roster[x].jerseyNumber || 0,
                  goals: playerResponses[x].data.stats[0].splits[0]?.stat?.goals || 0,
                  assists: playerResponses[x].data.stats[0].splits[0]?.stat?.assists || 0,
                  hits: playerResponses[x].data.stats[0].splits[0]?.stat?.hits || 0,
                  plusMinus: playerResponses[x].data.stats[0].splits[0]?.stat?.plusMinus || 0,
                })
              }
              else
              {
                //@ts-ignore
                theGoalieData.push({
                  playerID: teamResponse.data.roster[x].person.id || 0,
                  name: teamResponse.data.roster[x].person.fullName || 0,
                  age: playerDataResponses[x].data.people[0].currentAge || 0,
                  height: playerDataResponses[x].data.people[0].height || 0,
                  weight: playerDataResponses[x].data.people[0].weight || 0,
                  saves: playerResponses[x].data.stats[0].splits[0]?.stat?.saves || 0,
                  number: teamResponse.data.roster[x].jerseyNumber || 0,
                  gaa: playerResponses[x].data.stats[0].splits[0]?.stat.goalAgainstAverage.toFixed(3) || 0,
                  svPercent: playerResponses[x].data.stats[0].splits[0]?.stat.evenStrengthSavePercentage.toFixed(3) || 0,
                  shutouts: playerResponses[x].data.stats[0].splits[0]?.stat.shutouts || 0
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
        <h1 className="text-4xl pt-10">Loading...</h1>
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
          <div className="flex justify-center">
                <div className="w-full md:w-4/5">            
                  <SkaterTable data={playerData} />
            </div>
          </div>
          <div className="flex justify-center">
            <h2 className="font-bold text-2xl mt-10 mb-2 p-2 bg-black border-2 shadow-lg rounded-lg w-fit h-fit">Goalies</h2>
          </div>
          <div className="flex justify-center pb-10">
                <div className="w-full md:w-4/5">            
                  <GoalieTable data={goalieData} />
            </div>
          </div>
        
        </div>
      )
    }
    return <div> no data </div>
  }

 
