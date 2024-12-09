import { useState } from "react"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {v4 as uuidv4} from "uuid"
import PropertyActionBtn from "./PropertyActionBtn"
import ToggleBtn from "./ToggleBtn"
import Selector from "./Selector"
import Input from "./Input"
import InformPopup from "./InformPopup"
import { changeData, createObject, updateStatus } from "../../store/actions"


function ObjectDetails ({ isReadOnly, property }) {
    const popupDataObject = {
        title: null,
        message: null,
        type: null
    }
    const tempGallery = useSelector (state => state.temporaryGallery)
    const user = useSelector (state => state.user)
    const dispatch = useDispatch()
    const router = useRouter()
    const [readOnly, setReadOnly] = useState (isReadOnly)
    const propertyData = property?.objectData  
    const [popupIsOpen, setPopupOpen] = useState (false)  
    const [popupInfo, setPopupInfo] = useState (popupDataObject) 
    const [status, setStatus] = useState (property?.status ?? "Draft")
    const [formData, setFormData] = useState ({
        address: propertyData?.address ?? "",
        postcode: propertyData?.postcode ?? "",
        letType: propertyData?.letType ?? "",
        minimumTerm: propertyData?.minimumTerm ?? "",
        propertyType: propertyData?.propertyType ?? "",
        shared: propertyData?.shared ?? undefined,
        parking: propertyData?.parking ?? undefined,
        students: propertyData?.students ?? undefined,
        families: propertyData?.families ?? undefined,
        children: propertyData?.children ?? undefined,
        pets: propertyData?.pets ?? undefined,
        bedrooms: propertyData?.bedrooms ?? "",
        bathrooms: propertyData?.bathrooms ?? "",
        furnishing: propertyData?.furnishing ?? "",
        pricePPPW: propertyData?.pricePPPW ?? "",
        pricePCM: propertyData?.pricePCM ?? "",
        deposit: propertyData?.deposit ?? "",
        bills: propertyData?.bills ?? undefined,
        availableDate: propertyData?.availableDate ?? "",
        description: propertyData?.description ?? ""
    })

    function handleInput (event) {
        event.preventDefault()
        const {name, value} = event.target

        if (name==="status") {
            setStatus (value)
        } else {
            setFormData (prev => {
                return {...prev, [name]: value}
            })
        }
    }

    function handleToggleInput (name, value) {
        setFormData (prev => {
            return {...prev, [name]: value}
        })
    }

    function handleEditing () {
        setReadOnly (false)
    }

    async function handleSaving (event) {
        if ( !(formData.address && formData.postcode && (formData.pricePCM || formData.pricePPPW))
            || (event === "publish" && property?.gallery?.length < 1) ) {
                setPopupInfo (() => {
                    popupDataObject.title = event === "publish" ? "Publishing Error" : "Saving Error"
                    popupDataObject.message = event === "publish"
                                                ? "Before publishing, please make sure the fields Address, Postcode, Price, and at least one gallery photo are filled out"
                                                : "Before saving, please make sure the fields Address, Postcode, and Price are filled out"
                    popupDataObject.type = "error"
                    return popupDataObject
                })
                setPopupOpen (true)
                return null
        }
        if (property?.objectID) {
            const data = {
                objectID: property.objectID,
                status: event === "publish" ? "Active" : status,
                objectData: formData
            }
            if (event === "publish") {
                data.link = `/property/${property?.objectID}`
            }
            changeData(dispatch, data)
        } else {
            const data = {
                status: status,
                creator: user,
                objectData: formData,
                gallery: tempGallery
            }
            const newObjectID = await createObject(dispatch, data)
            router.push({
                pathname: "/property-details",
                query: {objectID: newObjectID}
            })
        }
    }

    function handlePublishing() {
        if ( status != "Active" ) {
            handleSaving("publish")
        }
    }

    function setDate (date) {
        setFormData(prev => {
            return {...prev, availableDate: date}
        })
    }

    return <div className="object-section">
        <h2 className="section-title">Object Details</h2>
        <div className="prop-attributes">
            <form className="prop-form">
                <div className="attributes-row">
                    <h3 className="subsection-title">Property Details</h3>
                    <div className="prop-inputs-row">
                        <Input 
                            key="address"
                            label="Address" 
                            name="address" 
                            value={formData.address} 
                            type="text" 
                            handleInput={handleInput} 
                            readOnly={readOnly} 
                        />
                        <Input 
                            key="postcode"
                            label="Postcode" 
                            name="postcode" 
                            value={formData.postcode} 
                            type="text" 
                            handleInput={handleInput} 
                            readOnly={readOnly} 
                        />
                        <Selector 
                            key={uuidv4()}
                            optionSet={status === "Active" ? ["Active","Draft","Closed"] : ["Draft","Closed"]}
                            label="Status"
                            name="status" 
                            value= {status}
                            handleInput={handleInput} 
                            readOnly = {readOnly}
                        />
                    </div>
                </div>

                <div className="attributes-row">
                    <h3 className="subsection-title">Features</h3>
                    <div className="prop-inputs-row">
                        <Selector 
                            key={uuidv4()}
                            optionSet={["Short Term","Long Term","Student","Commercial"]}
                            label="Let Type"
                            name="letType" 
                            value= {formData.letType}
                            handleInput={handleInput} 
                            readOnly = {readOnly}
                        />
                        <Selector 
                            key={uuidv4()}
                            optionSet={["6 months","12 months","48 weeks"]}
                            label="Minimum Term"
                            name="minimumTerm" 
                            value= {formData.minimumTerm}
                            handleInput={handleInput} 
                            readOnly = {readOnly}
                        />
                        <Selector 
                            key={uuidv4()}
                            optionSet={["Room","Studio","Flat","Apartment","House","Commercial"]}
                            label="Property Type"
                            name="propertyType" 
                            value= {formData.propertyType}
                            handleInput={handleInput} 
                            readOnly = {readOnly}
                        />
                    </div>
                    <div className="prop-inputs-row toggler-row">
                        <ToggleBtn 
                            key={uuidv4()} 
                            handleToggleInput={handleToggleInput}
                            value={formData.shared} 
                            title="shared" 
                            label="Shared" 
                            disabled={readOnly}
                        />
                        <ToggleBtn 
                            key={uuidv4()} 
                            handleToggleInput={handleToggleInput}
                            value={formData.parking} 
                            title="parking" 
                            label="Parking" 
                            disabled={readOnly}
                        />
                        <ToggleBtn 
                            key={uuidv4()} 
                            handleToggleInput={handleToggleInput}
                            value={formData.students} 
                            title="students" 
                            label="Students" 
                            disabled={readOnly}
                        />
                        <ToggleBtn 
                            key={uuidv4()} 
                            handleToggleInput={handleToggleInput}
                            value={formData.families} 
                            title="families" 
                            label="Families" 
                            disabled={readOnly}
                        />
                        <ToggleBtn 
                            key={uuidv4()} 
                            handleToggleInput={handleToggleInput}
                            value={formData.children} 
                            title="children" 
                            label="Children" 
                            disabled={readOnly}
                        />
                        <ToggleBtn 
                            key={uuidv4()} 
                            handleToggleInput={handleToggleInput}
                            value={formData.pets} 
                            title="pets" 
                            label="Pets" 
                            disabled={readOnly}
                        />
                    </div>
                    <div className="prop-inputs-row">
                        <Selector 
                            key={uuidv4()}
                            optionSet={["1","2","3","4","5","6","7","8","9","10","10+"]}
                            label="Bedrooms"
                            name="bedrooms" 
                            value= {formData.bedrooms}
                            handleInput={handleInput} 
                            readOnly = {readOnly}
                        />
                        <Selector 
                            key={uuidv4()}
                            optionSet={["1","2","3","4","5"]}
                            label="Bathrooms"
                            name="bathrooms" 
                            value= {formData.bathrooms}
                            handleInput={handleInput} 
                            readOnly = {readOnly}
                        />
                        <Selector 
                            key={uuidv4()}
                            optionSet={["Fully furnished","Unfurnished","Part-furnished"]}
                            label="Furnishing"
                            name="furnishing" 
                            value= {formData.furnishing}
                            handleInput={handleInput} 
                            readOnly = {readOnly}
                        />
                    </div>
                </div>

                <div className="attributes-row">
                    <h3 className="subsection-title">Contract Details</h3>
                    <div className="prop-inputs-row">
                        <Input 
                            key="pricePPPW"
                            label="PPPW Price, £" 
                            name="pricePPPW" 
                            value={formData.pricePPPW} 
                            type="number" 
                            handleInput={handleInput} 
                            readOnly={readOnly || formData.pricePCM} 
                        />
                        <Input 
                            key="pricePCM"
                            label="PCM Price, £" 
                            name="pricePCM" 
                            value={formData.pricePCM} 
                            type="number" 
                            handleInput={handleInput} 
                            readOnly={readOnly || formData.pricePPPW} 
                        />
                        <Input 
                            key="deposit"
                            label="Deposit, £" 
                            name="deposit" 
                            value={formData.deposit} 
                            type="number" 
                            handleInput={handleInput} 
                            readOnly={readOnly} 
                        />
                    </div>
                    <div className="mixed-row">
                        <span className="prop-input-container">
                            <label>Available</label>
                            <DatePicker 
                                key={uuidv4()} 
                                dateFormat="dd/MM/yyyy" 
                                selected={formData.availableDate}
                                onChange={(date) => setDate(date)} 
                            />
                        </span>
                        <span className="grid-item">
                            <ToggleBtn 
                                key={uuidv4()} 
                                handleToggleInput={handleToggleInput}
                                value={formData.bills} 
                                title="bills" 
                                label="Bills Included" 
                                disabled={readOnly}
                            />
                        </span>
                    </div>
                </div>

                <div className="attributes-row">
                    <h3 className="subsection-title">Description</h3>
                    <textarea 
                        name="description" 
                        value={formData.description} 
                        onChange={handleInput} 
                        className="description-text-field" 
                        rows="6" 
                        readOnly={readOnly}
                    />                  
                </div>
                <div className="btn-row">
                    {readOnly 
                    ? <PropertyActionBtn key={uuidv4()} title="Edit" onClick={handleEditing}/> 
                    : <PropertyActionBtn key={uuidv4()} title="Save" onClick={handleSaving}/>
                    }
                    {property?.objectID && <PropertyActionBtn key={uuidv4()} title="Publish" onClick={handlePublishing}/>}
                </div>
            </form>
        </div>
        <InformPopup 
            isOpen={popupIsOpen} 
            setOpen={setPopupOpen}
            info={popupInfo}
            />
    </div>
}

export default ObjectDetails