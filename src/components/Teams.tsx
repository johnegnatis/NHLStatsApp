import React from "react";
import { useNavigate } from "react-router-dom";
import { useTable, useSortBy } from 'react-table';
import { thumbnails } from './data/thumbnails';

interface TeamTableProps {
    wins : number[];
    losses: number[];
    teamName: string[];
    locationName: string[];
}
interface TeamTableRow {
    wins : number;
    losses: number;
    teamName: string;
    locationName: string;
    logo: string;
}

export const Teams: React.FC<TeamTableProps> = (props): JSX.Element => {
    const columns = React.useMemo(
        () => [
          {
            Header: 'NHL Teams',
            columns: [
              {
                Header: 'Team Name',
                accessor: 'name',
                Cell: (tableProps: { row: { original: { logo: string | undefined; locationName: string; teamName: string; }; }; }) => (
                  <div className="flex">
                    <div className="h-12">
                      <img
                        src = {tableProps.row.original.logo}
                        width= {35}
                        alt='logo'
                      />
                    </div>
                    <h3>{tableProps.row.original.locationName + " " + tableProps.row.original.teamName}</h3>
                  </div>
                )
              },
              {
                Header: 'Wins',
                accessor: 'wins',
              },
              {
                Header: 'Losses',
                accessor: 'losses'
              },
            ],
          } 
        ],
        []
      )
      const data : TeamTableRow[] = [];
      for(let x = 0; x < props.teamName.length; x++){
        data.push({
            teamName: props.teamName[x],
            locationName: props.locationName[x],
            wins: props.wins[x],
            losses: props.losses[x],
            logo : thumbnails[x],
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
      },
    useSortBy)

    let navigate = useNavigate(); 
    const routeChange = (path:string) =>{ 
        navigate(path)
    }

    return (
        <table {...getTableProps()} className="bg-black w-full">
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column : (any)) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
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
                <tr className=" hover:text-blue-500" {...row.getRowProps({})}
                  //@ts-ignore
                  onClick={() => routeChange(row.original.teamName)}
                >
                    {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                </tr>
                )
            })}
            </tbody>
        </table>
        )
}
