
const website : string =  'https://statsapi.web.nhl.com';
const statModifier : string = '?expand=team.stats';
const rosterModifier : string  = '?expand=team.roster';
const singleSeasonModifier : string = '/stats?stats=statsSingleSeason'
const getPlayer: string = "/api/v1/people/"

export {
    website,
    statModifier,
    rosterModifier,
    singleSeasonModifier,
    getPlayer,
}