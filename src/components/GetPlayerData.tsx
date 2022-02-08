import React, { useEffect } from "react";
import { useState } from "react";
import {website, singleSeasonModifier} from "./apiWebsite"
import { useTable } from "react-table";
import {Column} from "react-table"

interface PlayerProps {
  link : string;
}

export const GetPlayerData: React.FC<PlayerProps> = (props): JSX.Element =>  {

    const [data, setData] = useState <null | {roster: any}>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [apiStats, setApiStats] = React.useState<null | {stats: any}>(null);

    useEffect(() => {
        setLoading(true);
        fetch(props.link)
            .then((response) => response.json())
            .then(setData)
            .then(() => setLoading(false))
            .catch(setError)
    }, []);

    if(loading) return <h1>Loading...</h1>;

    if(error) return <pre>{JSON.stringify(error, null, 2)}</pre>

    if(!data) return <> error</>;

    if(data) {
      var myRows : {}[] = [];
      for(let x = 0; x < data.roster.length; x++)
      {
        console.log(website + data.roster[x].people.link + singleSeasonModifier)
        fetch(website + data.roster[x].people.link + singleSeasonModifier)
            .then((response) => response.json())
            .then(setApiStats)
        
        if(apiStats)
          myRows.push({
            col1: data.roster[x].people.fullName,
            col2: apiStats.stats[1].splits[0].goals,
            col3: apiStats.stats[1].splits[0].assists,
            col4: apiStats.stats[1].splits[0].hits,
          })
      }
      
      
    }

    const columns : readonly Column<{}>[] = React.useMemo(
      () => [
        {
          Header: 'Name',
          accessor: 'col1', // accessor is the "key" in the data
        },
        {
          Header: 'Goals',
          accessor: 'col2',
        },
        {
          Header: 'Assists',
          accessor: 'col3',
        },
        {
          Header: 'Hits',
          accessor: 'col4',
        },
      ],
      []
    )
    const tableInstance = useTable({ columns, myRows })
    
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    
    } = tableInstance
    

    return (
      // apply the table props
      <table {...getTableProps()} className="bg-black border-2 border-solid border-gray-500">
          <thead className="">
          {// Loop over the header rows
          headerGroups.map(headerGroup => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()} >
              {// Loop over the headers in each row
              headerGroup.headers.map(column => (
                  // Apply the header cell props
                  <th className="m-0 p-2 border-b-2 border-r-2 border-r-gray-500 border-b-gray-500" {...column.getHeaderProps()}>
                  {// Render the header
                  column.render('Header')}
                  </th>
              ))}
              </tr>
          ))}
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
          {// Loop over the table rows
          rows.map(row => {
              // Prepare the row for display
              prepareRow(row)
              return (
              // Apply the row props
              <tr className="m-0 p-2 border-b-2 border-r-2 border-r-gray-500 border-b-gray-500" {...row.getRowProps()}>
                  {// Loop over the rows cells
                  row.cells.map(cell => {
                  // Apply the cell props
                  return (
                      <td className="m-0 p-2 border-b-2 border-r-2 border-r-gray-500 border-b-gray-500"  {...cell.getCellProps()}>
                      {// Render the cell contents
                      cell.render('Cell')}
                      </td>
                  )
                  })}
              </tr>
              )
          })}
          </tbody>
      </table>
       )
    }



