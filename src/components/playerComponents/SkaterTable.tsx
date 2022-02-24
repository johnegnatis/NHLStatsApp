import { useSortBy, useTable } from "react-table"
import React from "react"
import { PlayerPopup } from "./PlayerPopup";
import { getPortrait } from "../data/apiWebsite";

 //@ts-ignore
 export default function SkaterTable({ data }) {
    // Use the state and functions returned from useTable to build your UI
    const columns = React.useMemo(
        () => [
          {
            Header: '\n',
            columns: [
              {
                Header: 'POS',
                accessor: 'position',
              },
              {
                Header: 'Name',
                accessor: 'name',
                Cell: ((tableProps: { row: { original: { name: string; number: string; playerID: number; age: number; height: string; weight: number } } }) => (
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
                Header: '+/-',
                accessor: 'plusMinus',
                sortType: 'basic'
              },
              {
                Header: 'Goals',
                accessor: 'goals',
              },
              {
                Header: 'Assists',
                accessor: 'assists'
              },
              {
                Header: 'Hits',
                accessor: 'hits',
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
              id: 'plusMinus',
              desc: true,
            }
          ],
        },
      },
    useSortBy)

    return (
      <table {...getTableProps()} className="bg-black w-full max-w-3xl border-4 border-gray-700">
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
          <tr className="border-gray-700 border-4" {...row.getRowProps({})}          >
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
  