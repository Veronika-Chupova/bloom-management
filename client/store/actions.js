import {v4 as uuidv4} from "uuid"

const apiBaseUrl = String(process.env.NEXT_PUBLIC_API_BASE_URL)


//WORK WITH TEMP GALLERY
export function addToTemp (dispatch, file) {
    dispatch ({
        type: "ADD_TO_TEMP",
        payload: file
    })
}
//AUTHENTICATION VALIDATION
export async function authCheck () {
    const requestOptions = {
        method: "GET",
        headers: {"Content-type":"application/json"},
        credentials: "include"
    }
    try {
        const response = await fetch(`${apiBaseUrl}/authCheck`, requestOptions)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data.user || undefined
    } catch (error) {
        console.error("Auth check error:", error)
        return undefined
    }
}

export function setUser (dispatch, name) {
    if (name) {
        dispatch ({
            type: "SET_USER",
            payload: name
        })
    }
}

//GET Requests
export default function getData (dispatch, status) {
    const requestOptions = {
        method: "GET",
        headers: {"Content-type" : "application/json"},
        credentials: "include"
      }
    const reqCURL = status 
                    ? `${apiBaseUrl}/get-data/${status}` 
                    : `${apiBaseUrl}/get-data`

    fetch(reqCURL, requestOptions)     //try-catch
        .then((response) =>{
            if (!response.ok) {
                throw new Error ("Response status was not OK " + response.statusText)
            }
            return response.json()
        })
        .then ((data) => {
            if (data?.length > 0) {
                const preparedData = data.map( item => {
                    const {objectID, link, status, creator, ...objectData} = item
                    const newItem = {
                        objectID: objectID,
                        status: status,
                        link: link,
                        creator: creator,
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

export async function getFullData (dispatch, status) {
    const requestOptions = {
        method: "GET",
        headers: {"Content-type" : "application/json"},
        credentials: "include"
      }
    const reqCURL = status ? `/${status}` : ""

    fetch(`${apiBaseUrl}/get-fulldata` + reqCURL, requestOptions)     //try-catch
        .then( response =>{
            if (!response.ok) {
                throw new Error ("Response status was not OK " + response.statusText)
            }
            return response.json()
        })
        .then ( data => {
            if (data?.length > 0) {
                const preparedData = data.map( item => {
                    const {objectID, status, creator, ...objectData} = item?.property
                    const newItem = {
                        objectID: objectID,
                        status: status,
                        creator: creator,
                        objectData: objectData,
                        gallery: item?.gallery
                    }
                    return newItem
                })
                dispatch ({type:"GET_DATA", payload: preparedData})
            } else {
                dispatch ({type:"GET_DATA", payload: []})
            }
        })
        .catch(error => {
            return null
        })

    const propNumber = await fetch(`${apiBaseUrl}/get-property-number` + reqCURL, requestOptions)
        .then( response => {
            if (!response.ok) {
                throw new Error ("Response status was not OK " + response.statusText)
            }
            return response.json()
        })
        .then( data => {
            return data?.propNumber || null
        })
        .catch (error => {
            console.error ("Problem occured when fetching data")
            return null
        })
    return propNumber
}

export async function updateObject (dispatch, objectID) {
    const requestOptions = {
        method: "GET",
        headers: {"Content-type" : "application/json"},
        credentials: "include"
      }
    fetch(`${apiBaseUrl}/get-latest/${objectID}`, requestOptions)     //try-catch
        .then((response) =>{
          if (!response.ok) {
              throw new Error ("Response status was not OK " + response.statusText)
          }
          return response.json()
        })
        .then ((data) => {
            const {objectID, status, creator, ...objectData} = data.property
            const updatedObject = {
                objectID: objectID,
                status: status,
                creator: creator,
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
            credentials: "include"                                       
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
    formData.append("objectData", JSON.stringify({...data.objectData, status: data.status, creator: data.creator}))
    const requestOptions = {
        method: "POST",
        body: formData,  
        credentials: "include"                                     
    }

    const newObjectID = await fetch (`${apiBaseUrl}/create-object`, requestOptions)     //try-catch
      .then ((response) => {
        if (!response.ok) {
            throw new Error ("Response status was not OK " + response.statusText)
        }
        return response.json()
    }).then ((data) => {
        const {objectID, status, creator, ...objectData} = data
        const newObject = {
            gallery: [], 
            objectID: objectID, 
            status: status,
            creator: creator,
            objectData: objectData
        }

        dispatch ({type:"NEW_OBJECT", payload: newObject})
        dispatch ({type:"CLEAN_TEMP_GALLERY", payload:{ objectID: newObject.objectID}})
        return data.objectID
    })//catch error
    originalFiles.map( newFile => addToGallery(dispatch, {objectID: newObjectID, file: newFile}) )  //sequencial uploading images for fresh object
    return newObjectID
}

export async function login (data) {
    const requestOptions = {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(data),
        credentials: "include"
    }

    const access = await fetch(`${apiBaseUrl}/login`, requestOptions)
        .then (response => {
            if (response.status === 403) {
                return {redirect: "/change-password"}
            }
            if ( response.status === 401 ) {
                return {message: "Wrong credentials"}
            }
            if ( response.status === 200 ) {
                return null
            }
            throw new Error ("Respone status was not OK " + response.statusText)
        })
        .catch (error => {})
    return access
}

export async function logout () {
    const requestOptions = {
        method: "POST",
        headers: {"Content-type": "application/json"},
        credentials: "include"
    }

    const result = await fetch(`${apiBaseUrl}/logout`, requestOptions)
        .then ( response => {
            if (!response.ok) {
                throw new Error ("Response from the server was not OK:", response.statusText)
            }
            return true
        })
        .catch (error => {})    //make it
    return result
}

export async function changePassword (data) {
    const requestOptions = {
        method: "POST",
        headers: {"Content-type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include"
    }

    const result = await fetch(`${apiBaseUrl}/change-password`, requestOptions)
        .then( response => {
            if (!response.ok) {
                throw new Error ("Respone status was not OK " + response.statusText)
            }
            if (response.status === 200) {
                return true
            } else {
                return false
            }
        })
        .catch (error => {})
    return result
}
//DELETE Requests
export function removeFromGallery (dispatch, data) {  
    if (data.objectID) {
        const requestOptions = {
            method: "DELETE",
            headers: {"Content-type" : "application/json"},
            credentials: "include"                                       
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
        dispatch ({type: "REMOVE_FROM_TEMP_GALLERY", payload: data.fileName})
    }
}

//PATCH Requests
export function changeData (dispatch, data) {

    const newData = {status: data.status, link: data.link, ...data?.objectData}
    const requestOptions = {
        method: "PATCH",
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify (newData),
        credentials: "include"
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
        body: JSON.stringify (requestData),
        credentials: "include"
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

