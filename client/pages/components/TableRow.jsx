
function TableRow ({ handleRowClick, objectID, link, status, objectData }) {
    const date = objectData?.availableDate && new Date(objectData?.availableDate)
    const dateFormat = date instanceof Date ? 
    new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(date) :
    undefined
    return <tr className="table-row" onClick={()=>handleRowClick(objectID)}>
                            <td>{objectID}</td>
                            <td>{objectData?.address}</td>
                            <td className="availability">{objectData?.availableDate && dateFormat}</td>
                            <td>Agent Name</td>
                            <td>{objectData?.pricePPPW}</td>
                            <td data-name="link">
                                {link && <a href={link} target="_blank">
                                    <div>
                                        link
                                    </div>
                                </a>}
                            </td>
                            <td>{objectData?.propertyType}</td>
                            <td>{status}</td>
                        </tr> 
}

export default TableRow