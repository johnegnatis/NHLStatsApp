import { useSortBy, useTable } from "react-table"
import React from "react"

 //@ts-ignore
 export default function SkaterTable({data }) {
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
                Cell: ((tableProps: { row: { original: { name: string; number: string } } }) => (
                  <div className="flex">
                    <div className="flex justify-left">
                    </div>
                    <h3 className="pl-2 text-right">{"#"+ (tableProps.row.original.number) + " " + tableProps.row.original.name}</h3>
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
  
    // let navigate = useNavigate(); 
    // const routeChange = (path:string) =>{ 
    //     navigate(path)
    // }
  
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
          <tr className=" hover:text-blue-500 border-gray-700 border-4" {...row.getRowProps({})}
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
  