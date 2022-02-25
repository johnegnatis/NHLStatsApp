
const website : string =  'https://statsapi.web.nhl.com';
const statModifier : string = '?expand=team.stats';
const rosterModifier : string  = '?expand=team.roster';
const singleSeasonModifier : string = '/stats?stats=statsSingleSeason'
const getPlayer: string = "/api/v1/people/"
const getPortrait: string = "https://nhl.bamcontent.com/images/headshots/current/168x168/"; //followed by {playerID}.jpg

export {
    website,
    statModifier,
    rosterModifier,
    singleSeasonModifier,
    getPlayer,
    getPortrait,
}