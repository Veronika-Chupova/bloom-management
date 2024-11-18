
function TableRow ({ handleRowClick, objectID, link, status, objectData }) {
    return <tr className="table-row" onClick={()=>handleRowClick(objectID)}>
                            <td>{objectID}</td>
                            <td>{objectData?.address}</td>
                            <td></td>
                            <td></td>
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