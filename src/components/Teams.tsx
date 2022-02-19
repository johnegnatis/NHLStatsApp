import React from "react";
import { useNavigate } from "react-router-dom";
import { useTable, useSortBy } from 'react-table';
import { thumbnails } from './data/thumbnails';

interface TeamTableProps {
    ranking: string[];
    wins : number[];
    losses: number[];
    ot: number[];
    teamName: string[];
    locationName: string[];
    ga: number[];
    gf: number[];
    conferences: string[];
}
interface TeamTableRow {
    ranking: string;
    wins : number;
    losses: number;
    ot: number;
    teamName: string;
    locationName: string;
    logo: string;
    gf: number;
    ga: number;
    conferences: string;
}

export const Teams: React.FC<TeamTableProps> = (props): JSX.Element => {
    const columns = React.useMemo(
        () => [
          {
            Header: '\t',
            columns: [
              {
                Header: "Conf",
                accessor: "conferences",
              },
              {
                Header: "Rank",
                accessor: "ranking",
              },
              {
                Header: 'Team Name',
                accessor: 'name',
                Cell: (tableProps: { row: { original: { logo: string | undefined; locationName: string; teamName: string; }; }; }) => (
                  <div className="">
                    <div className="flex">
                      <div className="flex justify-left">
                        <img
                          src = {tableProps.row.original.logo}
                          width= {25}
                          alt='logo'
                        />
                      </div>
                      <h3 className="pl-2">{tableProps.row.original.locationName + " " + tableProps.row.original.teamName}</h3>
                    </div>
                  </div>
                )
              },
              {
                Header: 'W',
                accessor: 'wins',
              },
              {
                Header: 'L',
                accessor: 'losses',
                // Cell: ( tableProps: {row: {original: {losses: number }; }; }) => (
                //   <p className="px-5">{tableProps.row.original.losses}</p>
                // )
              },
              {
                Header: 'OT',
                accessor: 'ot',
              },
              {
                Header: 'GF',
                accessor: 'gf',
                // Cell: ( tableProps: {row: {original: {gf: number }; }; }) => (
                //   <p className="px-5">{tableProps.row.original.gf}</p>
                // )
              },
              {
                Header: 'GA',
                accessor: 'ga',
                Cell: ( tableProps: {row: {original: {gf: number }; }; }) => (
                  <p className="pr-5">{tableProps.row.original.gf}</p>
                )
              },
            ],
          } 
        ],
        []
      )
      const data : TeamTableRow[] = [];
      for(let x = 0; x < props.teamName.length; x++){
        
        data.push({
            ranking: props.ranking[x],
            teamName: props.teamName[x],
            locationName: props.locationName[x],
            wins: props.wins[x],
            losses: props.losses[x],
            ot: props.ot[x],
            logo : thumbnails[x],
            gf: props.gf[x],
            ga: props.ga[x],
            conferences: props.conferences[x],
        })
      }
    
      return (
        <Table columns={columns} data={data} />
      )
    
}
//@ts-ignore
function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
      {
        columns,
        data,
        initialState: {
          //@ts-ignore
          sortBy: [
            {
              id: 'ranking',
              desc: false,
            }
          ]
        }
      },
    useSortBy)

    let navigate = useNavigate(); 
    const routeChange = (path:string) =>{ 
        navigate(path)
    }

    return (
        <table {...getTableProps()} 
        className="bg-black border-4 border-gray-700 overflow-x-hidden">
            <thead>
            {headerGroups.map(headerGroup => (
                <tr className="bg-gray-700" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column : (any)) => (
                    <th className= "hover:text-blue-500 p-1 text-xl font-bold" {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' ↓'
                          : ' ↑'
                        : ''}
                    </span>
                  </th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
                prepareRow(row)
                return (
                <tr className=" h-10 hover:text-blue-500 border-gray-700 border-4" {...row.getRowProps({})}
                  //@ts-ignore
                  onClick={() => routeChange(row.original.teamName)}
                >
                    {row.cells.map(cell => {
                    return <td className="pl-5" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                </tr>
                )
            })}
            </tbody>
        </table>
        )
}
