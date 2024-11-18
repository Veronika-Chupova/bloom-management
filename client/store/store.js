import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from "next-redux-wrapper"

const defaultState = {
    temporaryGallery:[],
    items: []
}        //fentched data as a default state. Separate reducers for fetched and new objects?

const reducer = (state = defaultState, action) => {

    switch (action.type) {
        case "GET_DATA":
            return {...state, items: [...action.payload]}

        case "NEW_OBJECT":
            return {...state, items: [...state.items, action.payload]}

        case "UPDATE_OBJECT":
            return {...state, items: state?.items?.length > 0 ?
                state.items.map ( element => { 
                    if ( String(element.objectID) === String(action.payload.objectID) ) {              
                        return {
                            ...element, 
                            status: action.payload.status, 
                            objectData: action.payload.objectData,
                            gallery: action.payload.gallery
                        }
                    } else {
                        return element
                    }
                }) :
                [...state.items, 
                    {objectID: action.payload.objectID, 
                    status: action.payload.status, 
                    objectData: action.payload.objectData,
                    gallery: action.payload.gallery}
                ]
        }

        case "ADD_TO_GALLERY":
            return {...state, items: state.items.map(element => {
                if ( String(element.objectID) === String(action.payload.objectID) ) {
                    return {...element, gallery: [...element.gallery, action.payload.content]}
                } else {
                    return element
                }
            })}
        
        case "ADD_TO_TEMP_GALLERY":
            return {...state, temporaryGallery: [...state.temporaryGallery, action.payload]}

        case "CLEAN_TEMP_GALLERY":
            return {
                ...state, 
                temporaryGallery: []
            }

        case "REMOVE_FROM_GALLERY":
            return {...state, items: state.items.map (element => {
                if ( String(element.objectID) === String(action.payload.objectID) ) {
                    return {...element, gallery: element.gallery.filter(item => item.imageID !== action.payload.fileName)}
                } else {
                    return element
                }
            })}
        case "REMOVE_FROM_TEMP_GALLERY":
            return {...state, temporaryGallery: state.temporaryGallery.filter(item => item.imageID !== action.payload)}

        case "CHANGE_DATA":
            return {...state, 
                items: state.items.map(element => {
                    if (String(element.objectID) === String(action.payload.id)) {
                        return {...element, ...action.payload.data}
                    } else {
                        return element
                    }
                })}
        
        case "ADD_LINK":
            return {...state, items: state.items.map( element => {
                if (String(element.objectID) === String(action.payload.objectID)) {
                    return {
                        ...element, 
                        link: action.payload.link, 
                        status: action.payload.status,
                        objectData: action.payload.objectData}
                } else {
                    return element
                }
            })}
        default:
            return state

    }
}

// const store = createStore (reducer)
const makeStore = () =>
  configureStore({
    reducer: reducer,
    devTools: process.env.NODE_ENV !== 'production',
  });

// export default store
export const wrapper = createWrapper(makeStore)
//action {type, objectID, newImage, deletedImage, formData}