import {v4 as uuidv4} from "uuid"

const apiBaseUrl = String(process.env.NEXT_PUBLIC_API_BASE_URL)

async function fileConverter (file) {
    if (Buffer.isBuffer(file)) {
        const reader = new FileReader
        reader.onloadend = () => {
            return reader.result
        }
        reader.readAsDataURL (file)
    } else {
        return undefined
    }
}

//GET Requests
export default function getData (dispatch) {
    const requestOptions = {
        method: "GET",
        headers: {"Content-type" : "application/json"},
      }

    fetch(`${apiBaseUrl}/`, requestOptions)     //try-catch
        .then((response) =>{
            if (!response.ok) {
                throw new Error ("Response status was not OK " + response.statusText)
            }
            return response.json()
        })
        .then ((data) => {
            if (data?.length > 0) {
                const preparedData = data.map( item => {
                    const {objectID, link, status, ...objectData} = item
                    const newItem = {
                        objectID: objectID,
                        status: status,
                        link: link,
                        gallery:[],
                        objectData: objectData
                    }
                    return newItem
                })
                dispatch ({type:"GET_DATA", payload: preparedData})
            } else {
                dispatch ({type:"GET_DATA", payload: []})
            }
        })
}

export async function updateObject (dispatch, objectID) {
    const requestOptions = {
        method: "GET",
        headers: {"Content-type" : "application/json"},
      }
    fetch(`${apiBaseUrl}/get-latest/${objectID}`, requestOptions)     //try-catch
        .then((response) =>{
          if (!response.ok) {
              throw new Error ("Response status was not OK " + response.statusText)
          }
          return response.json()
        })
        .then ((data) => {
            const {objectID, status, ...objectData} = data.property
            const updatedObject = {
                objectID: objectID,
                status: status,
                objectData: objectData,
                gallery: data.gallery
            }

            dispatch ({type:"UPDATE_OBJECT", payload: updatedObject})
        }).catch (err => {})    //make proper
}

//POST Requests
export function addToGallery (dispatch, data) {
    if (data.objectID) {
        const formData = new FormData ()
        formData.append("file", data.file)
        const requestOptions = {
            method: "POST",
            body: formData,                                       
        }
        fetch (`${apiBaseUrl}/upload-image/${data.objectID}`, requestOptions)     //try-catch
        .then ((response) => {
            if (!response.ok) {
                throw new Error ("Response status was not OK " + response.statusText)
            }        
            return response.json()
        }).then((responseData) => {
            if (responseData.imageID) {
                const reader = new FileReader
                reader.onloadend = () => {
                    dispatch ({
                        type: "ADD_TO_GALLERY", 
                        payload: {
                            objectID: data.objectID,
                            content: {
                                imageID: responseData.imageID,
                                file: reader.result
                            }
                        }
                    })
                }
                reader.readAsDataURL (data.file)  
            } else {
                throw new Error ("Problems with file uploading on server")
            }
        })

    } else {
        const reader = new FileReader
        reader.onloadend = () => {
            dispatch ({
                type: "ADD_TO_TEMP_GALLERY", 
                payload: {
                    imageID: uuidv4(),
                    originalFile: data.file,
                    file: reader.result
                }
            })
        }
        reader.readAsDataURL (data.file)
    }
}

export async function createObject (dispatch, data) {
    const originalFiles = data.gallery.map( item => item.originalFile)
    const formData = new FormData ()
    // formData.append("files", originalFiles)
    formData.append("objectData", JSON.stringify({...data.objectData, status: data.status}))
    const requestOptions = {
        method: "POST",
        body: formData,                                       
    }

    const newObjectID = await fetch (`${apiBaseUrl}/create-object`, requestOptions)     //try-catch
      .then ((response) => {
        if (!response.ok) {
            throw new Error ("Response status was not OK " + response.statusText)
        }
        return response.json()
    }).then ((data) => {
        const {objectID, status, ...objectData} = data
        const newObject = {
            gallery: [], 
            objectID: objectID, 
            status: status,
            objectData: objectData
        }
        dispatch ({type:"NEW_OBJECT", payload: newObject})
        dispatch ({type:"CLEAN_TEMP_GALLERY", payload:{ objectID: newObject.objectID}})
        return data.objectID
    })//catch error
    originalFiles.map( newFile => addToGallery(dispatch, {objectID: newObjectID, file: newFile}) )  //sequencial uploading images for fresh object
    return newObjectID
}

//DELETE Requests
export function removeFromGallery (dispatch, data) {  
    if (data.objectID) {
        const requestOptions = {
            method: "DELETE",
            headers: {"Content-type" : "application/json"}                                       
        }
        fetch (`${apiBaseUrl}/remove-image/${data.fileName}`, requestOptions)     //try-catch
        .then ((response) => {
            if (!response.ok) {
                throw new Error ("Response status was not OK " + response.statusText)
            }
            dispatch ({type: "REMOVE_FROM_GALLERY", payload: {
                                                        objectID: data.objectID,
                                                        fileName: data.fileName
                                                    }
            })
            return response.json()
        })  
    } else {
        console.log("Temp branch")
        dispatch ({type: "REMOVE_FROM_TEMP_GALLERY", payload: data.fileName})
    }
}

//PATCH Requests
export function changeData (dispatch, data) {
    const newData = {status: data.status, ...data?.objectData}
    const requestOptions = {
        method: "PATCH",
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify (newData)
      }
    fetch (`${apiBaseUrl}/update-property/${data.objectID}`, requestOptions)     //try-catch
        .then ((response) => {
            if (!response.ok) {
                throw new Error ("Response status was not OK " + response.statusText)
            }
            return response.json()
        })
        .then ((data) => {
            const {objectID, status, ...objectData} = data
            const updatedObject = {
                status: status,
                objectData: objectData
            }
            dispatch ({type: "CHANGE_DATA", payload: {id: objectID, data: updatedObject}})
        })
        .catch()    // make it
}

export function updateStatus (disabled, data) {
    const {objectID, status} = data
    const requestData = {newStatus: status}
    const requestOptions = {
        method: "PATCH",
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify (requestData)
      }
    
      fetch(`${apiBaseUrl}/update-status/${data.objectID}`, requestOptions)
      .then ((response) => {
        if (!response.ok) {
            throw new Error ("Response status was not OK " + response.statusText)
        }
        return response.json()
      }).then((responseData) => {
          if (responseData) {
              const {objectID, status, link, ...objectData} = responseData
              dispatch ({
                  type: "ADD_LINK", 
                  payload: {
                      objectID: objectID,
                      link: link,
                      status: status,
                      objectData: objectData
                  }})
          }
      }). catch (err => {}) //make proper
}

