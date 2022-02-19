import React from "react"
import { useSortBy, useTable } from "react-table"

//@ts-ignore
export default function GoalieTable({data }) {
    // Use the state and functions returned from useTable to build your UI
    const columns = React.useMemo(
        () => [
          {
            Header: 'Goalies',
            columns: [
              {
                Header: 'Name',
                accessor: 'name',
              },
              {
                Header: 'Saves',
                accessor: 'saves',
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
      },
    useSortBy)
  
    // let navigate = useNavigate(); 
    // const routeChange = (path:string) =>{ 
    //     navigate(path)
    // }
  
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
                <tr className=" hover:text-blue-500" {...row.getRowProps({})}
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
  