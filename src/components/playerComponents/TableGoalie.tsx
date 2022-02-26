import React from "react"
import { useSortBy, useTable } from "react-table"
import { getPortrait } from "../data/apiWebsite"
import { PlayerPopup } from "./PlayerInfo"

//@ts-ignore
export default function GoalieTable({data }) {
    // Use the state and functions returned from useTable to build your UI
    const columns = React.useMemo(
        () => [
          {
            Header: '\n',
            columns: [
              {
                Header: 'Name',
                accessor: 'name',
                Cell: ((tableProps: { row: { original: { name: string; number: string; playerID: number; age: number; height: string; weight: number} } }) => (
                  <div className="flex">
                    <div className="flex justify-left">
                    </div>
                    <h3 className="pl-2 text-right">
                      <PlayerPopup 
                        name = {"#"+ (tableProps.row.original.number) + " " + tableProps.row.original.name} 
                        src = {`${getPortrait}${tableProps.row.original.playerID}.jpg`}
                        age = {tableProps.row.original.age}
                        height = {tableProps.row.original.height}
                        weight = {tableProps.row.original.weight}

                      />
                    </h3>
                  </div>
                ))
              },
              {
                Header: 'Saves',
                accessor: 'saves',
              },
              {
                Header: 'GAA',
                accessor: 'gaa',
              },
              {
                Header: 'SV %',
                accessor: 'svPercent',
                Cell: ((tableProps: { row: { original: { svPercent:number } } }) => (
                  <h3>{tableProps.row.original.svPercent+"%"}</h3>
                ))
              },
              {
                Header: 'Shutouts',
                accessor: 'shutouts',
              },
            ],
          } 
        ],
        []
      )
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
              id: 'saves',
              desc: true,
            }
          ]
        }
      },
    useSortBy)
  
    return (
      <table {...getTableProps()} className=" bg-black border-4 border-gray-700 w-full">
      <thead>
      {headerGroups.map(headerGroup => (
          <tr className="bg-gray-700" {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column : (any)) => (
              <th className= "hover:text-blue-500 font-bold" {...column.getHeaderProps(column.getSortByToggleProps())}>
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
          <tr className="  h-10 hover:text-blue-500 border-gray-700 border-4" {...row.getRowProps({})}>
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
  